import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

function ProfilesView({ currentProfile, currentProfileIndex, totalProfiles, onLike, onPass, onViewDetail }) {
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragStart = (clientX) => {
    setDragStart(clientX);
  };

  const handleDragMove = (clientX) => {
    if (dragStart === null) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      // 100px 이상 드래그하면 액션 실행
      if (dragOffset > 0) {
        onLike();
      } else {
        onPass();
      }
    }
    setDragStart(null);
    setDragOffset(0);
  };
  // 모든 프로필을 다 본 경우
  if (!currentProfile) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold">💕 만남</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">😊</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">모든 프로필을 확인했어요!</h2>
            <p className="text-gray-500">새로운 프로필이 곧 추가될 예정이에요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">💕 만남</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform"
            style={{
              transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
              opacity: 1 - Math.abs(dragOffset) / 400
            }}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div
              className="h-96 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${currentProfile.image})` }}
              onClick={onViewDetail}
            >
              <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                <p className="text-lg mt-1">{currentProfile.job}</p>
                <p className="text-sm mt-1 opacity-90">{currentProfile.location}</p>
                <p className="text-sm mt-3">{currentProfile.bio}</p>
              </div>
            </div>

            <div className="p-6 flex justify-center gap-6">
              <button
                onClick={onPass}
                className="w-16 h-16 bg-white border-4 border-gray-300 hover:border-gray-400 rounded-full flex items-center justify-center transition shadow-lg"
              >
                <X className="w-8 h-8 text-gray-600" />
              </button>
              <button
                onClick={onLike}
                className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full flex items-center justify-center transition shadow-xl"
              >
                <Heart className="w-10 h-10 text-white fill-current" />
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-4">
            {currentProfileIndex + 1} / {totalProfiles}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilesView;
