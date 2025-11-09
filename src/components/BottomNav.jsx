import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

function BottomNav({ currentView, matchCount, onNavigate }) {
  return (
    <div className="border-t bg-white">
      <div className="flex">
        <button
          onClick={() => onNavigate('profiles')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition ${
            currentView === 'profiles'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Heart className={`w-6 h-6 ${currentView === 'profiles' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">프로필</span>
        </button>
        <button
          onClick={() => onNavigate('chat')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 transition relative ${
            currentView === 'chat'
              ? 'text-pink-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">메시지</span>
          {matchCount > 0 && (
            <span className="absolute top-2 right-1/3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {matchCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
