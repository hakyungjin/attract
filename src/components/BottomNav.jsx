import React from 'react';
import { Heart, MessageCircle, User, Users, MessageSquare } from 'lucide-react';

function BottomNav({ currentView, matchCount, requestCount, onNavigate }) {
  return (
    <div className="border-t bg-white">
      <div className="flex">
        <button
          onClick={() => onNavigate('profiles')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition ${
            currentView === 'profiles'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Heart className={`w-5 h-5 ${currentView === 'profiles' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">탐색</span>
        </button>
        <button
          onClick={() => onNavigate('match-requests')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition relative ${
            currentView === 'match-requests'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs font-medium">매칭</span>
          {requestCount > 0 && (
            <span className="absolute top-1 right-1/4 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {requestCount > 9 ? '9+' : requestCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('chat')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition relative ${
            currentView === 'chat'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-medium">채팅</span>
          {matchCount > 0 && (
            <span className="absolute top-1 right-1/4 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {matchCount > 9 ? '9+' : matchCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('community')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition ${
            currentView === 'community'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-medium">커뮤니티</span>
        </button>
        <button
          onClick={() => onNavigate('my-profile')}
          className={`flex-1 py-3 flex flex-col items-center gap-1 transition ${
            currentView === 'my-profile'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs font-medium">MY</span>
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
