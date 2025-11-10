import React, { useState, useEffect } from 'react';
import { Heart, X, UserCheck, Clock } from 'lucide-react';

function MatchRequestsView({ currentUser, onAccept, onReject, receivedRequests, sentRequests }) {
  const [activeTab, setActiveTab] = useState('received'); // received | sent

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">💌 매칭 요청</h1>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b flex">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex-1 py-3 font-medium transition ${
            activeTab === 'received'
              ? 'text-pink-500 border-b-2 border-pink-500'
              : 'text-gray-500'
          }`}
        >
          받은 요청 ({receivedRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`flex-1 py-3 font-medium transition ${
            activeTab === 'sent'
              ? 'text-pink-500 border-b-2 border-pink-500'
              : 'text-gray-500'
          }`}
        >
          보낸 요청 ({sentRequests.length})
        </button>
      </div>

      {/* 내용 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'received' ? (
          // 받은 요청
          receivedRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Heart className="w-20 h-20 mb-4" />
              <p className="text-lg">받은 매칭 요청이 없습니다</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {receivedRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {request.toProfile?.name?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          {request.toProfile?.name || '알 수 없음'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {request.toProfile?.age}세 • {request.toProfile?.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          {request.toProfile?.job}
                        </p>
                      </div>
                    </div>

                    {request.toProfile?.bio && (
                      <p className="text-gray-700 mb-4 text-sm">
                        {request.toProfile.bio}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => onReject(request.id)}
                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        거절
                      </button>
                      <button
                        onClick={() => onAccept(request)}
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
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
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Clock className="w-20 h-20 mb-4" />
              <p className="text-lg">보낸 매칭 요청이 없습니다</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {sentRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                      {request.toProfile?.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {request.toProfile?.name || '알 수 없음'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {request.status === 'pending' && '대기 중'}
                        {request.status === 'accepted' && '수락됨'}
                        {request.status === 'rejected' && '거절됨'}
                      </p>
                    </div>
                    <div>
                      {request.status === 'pending' && (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      {request.status === 'accepted' && (
                        <UserCheck className="w-5 h-5 text-green-500" />
                      )}
                      {request.status === 'rejected' && (
                        <X className="w-5 h-5 text-red-500" />
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
