import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

function ChatListView({ matches, chatMessages, onSelectChat }) {
  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #F0F8FF 0%, #E3F2FD 100%)' }}>
      <div className="p-6" style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}>
        <h1 className="text-2xl font-bold text-white">💬 채팅</h1>
        <p className="text-sm text-white/90 mt-1">매칭된 사람들과 대화하세요</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <MessageCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#90CAF9' }} />
              <p className="text-lg font-semibold text-gray-700">아직 매칭된 사람이 없습니다</p>
              <p className="text-sm text-gray-500 mt-2">프로필에 하트를 보내보세요!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map(match => (
              <div
                key={match.id}
                onClick={() => onSelectChat(match)}
                className="bg-white rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all flex items-center gap-4"
                style={{ boxShadow: '0 4px 15px rgba(100, 181, 246, 0.1)' }}
              >
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage: `url(${match.image})`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#2D2D2D' }}>{match.name}</h3>
                  <p className="text-sm truncate" style={{ color: '#8E8E93' }}>
                    {chatMessages[match.id]?.slice(-1)[0]?.text || "매칭되었습니다! 인사해보세요 👋"}
                  </p>
                </div>
                <Heart className="w-6 h-6 fill-current flex-shrink-0" style={{ color: '#64B5F6' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListView;
