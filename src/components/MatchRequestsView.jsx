import React, { useState, useEffect } from 'react';
import { Heart, X, UserCheck, Clock } from 'lucide-react';

function MatchRequestsView({ currentUser, onAccept, onReject, receivedRequests, sentRequests }) {
  const [activeTab, setActiveTab] = useState('received'); // received | sent

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #F0F8FF 0%, #E3F2FD 100%)' }}>
      <div className="p-6" style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}>
        <h1 className="text-2xl font-bold text-white">💙 매칭 요청</h1>
        <p className="text-sm text-white/90 mt-1">새로운 인연을 확인하세요</p>
      </div>

      {/* 탭 */}
      <div className="bg-white/50 backdrop-blur-sm flex p-2 gap-2">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex-1 py-3 rounded-full font-semibold transition-all ${
            activeTab === 'received'
              ? 'shadow-lg scale-105'
              : ''
          }`}
          style={{
            background: activeTab === 'received'
              ? 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)'
              : 'white',
            color: activeTab === 'received' ? 'white' : '#666'
          }}
        >
          받은 요청 ({receivedRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex-1 py-3 rounded-full font-semibold transition-all ${
            activeTab === 'sent'
              ? 'shadow-lg scale-105'
              : ''
          }`}
          style={{
            background: activeTab === 'sent'
              ? 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)'
              : 'white',
            color: activeTab === 'sent' ? 'white' : '#666'
          }}
        >
          보낸 요청 ({sentRequests.length})
        </button>
      </div>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'received' ? (
          // 받은 요청
          receivedRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: '#90CAF9' }} />
                <p className="text-lg font-semibold text-gray-700">받은 매칭 요청이 없습니다</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {receivedRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-3xl overflow-hidden"
                  style={{ boxShadow: '0 8px 30px rgba(100, 181, 246, 0.15)' }}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                        style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}
                      >
                        {request.toProfile?.name?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-1" style={{ color: '#2D2D2D' }}>
                          {request.toProfile?.name || '알 수 없음'}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: '#8E8E93' }}>
                          {request.toProfile?.age}세 • {request.toProfile?.location}
                        </p>
                        <p className="text-sm font-medium" style={{ color: '#8E8E93' }}>
                          {request.toProfile?.job}
                        </p>
                      </div>
                    </div>

                    {request.toProfile?.bio && (
                      <div className="mb-4 p-3 rounded-2xl" style={{ background: '#E3F2FD' }}>
                        <p className="text-sm leading-relaxed" style={{ color: '#2D2D2D' }}>
                          {request.toProfile.bio}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => onReject(request.id)}
                        className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
                        style={{ color: '#666' }}
                      >
                        <X className="w-5 h-5" />
                        거절
                      </button>
                      <button
                        onClick={() => onAccept(request)}
                        className="flex-1 py-3.5 text-white rounded-2xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}
                      >
                        <Heart className="w-5 h-5 fill-current" />
                        수락
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          // 보낸 요청
          sentRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <Clock className="w-16 h-16 mx-auto mb-4" style={{ color: '#90CAF9' }} />
                <p className="text-lg font-semibold text-gray-700">보낸 매칭 요청이 없습니다</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {sentRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl p-4"
                  style={{ boxShadow: '0 4px 15px rgba(100, 181, 246, 0.1)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                      style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}
                    >
                      {request.toProfile?.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" style={{ color: '#2D2D2D' }}>
                        {request.toProfile?.name || '알 수 없음'}
                      </h3>
                      <p className="text-sm font-medium" style={{
                        color: request.status === 'pending' ? '#FF8C42' :
                               request.status === 'accepted' ? '#4CAF50' : '#F44336'
                      }}>
                        {request.status === 'pending' && '⏱️ 대기 중'}
                        {request.status === 'accepted' && '✅ 수락됨'}
                        {request.status === 'rejected' && '❌ 거절됨'}
                      </p>
                    </div>
                    <div>
                      {request.status === 'pending' && (
                        <Clock className="w-6 h-6" style={{ color: '#FF8C42' }} />
                      )}
                      {request.status === 'accepted' && (
                        <UserCheck className="w-6 h-6" style={{ color: '#4CAF50' }} />
                      )}
                      {request.status === 'rejected' && (
                        <X className="w-6 h-6" style={{ color: '#F44336' }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MatchRequestsView;
