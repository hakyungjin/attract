import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

function ChatListView({ matches, chatMessages, onSelectChat }) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">💬 메시지</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageCircle className="w-20 h-20 mb-4" />
            <p className="text-lg">아직 매칭된 사람이 없습니다</p>
            <p className="text-sm mt-2">프로필에 하트를 보내보세요!</p>
          </div>
        ) : (
          <div className="divide-y">
            {matches.map(match => (
              <div
                key={match.id}
                onClick={() => onSelectChat(match)}
                className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-4 transition"
              >
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${match.image})` }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{match.name}</h3>
                  <p className="text-gray-500 text-sm truncate">
                    {chatMessages[match.id]?.slice(-1)[0]?.text || "매칭되었습니다! 인사해보세요 👋"}
                  </p>
                </div>
                <Heart className="w-5 h-5 text-pink-500 fill-current flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatListView;
