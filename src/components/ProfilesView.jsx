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
      <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #FFF5F8 0%, #F0E6FF 100%)' }}>
        <div className="p-6" style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)' }}>
          <h1 className="text-2xl font-bold text-white">💕 오늘의 만남</h1>
          <p className="text-sm text-white/90 mt-1">새로운 인연을 찾아보세요</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#2D2D2D' }}>모든 프로필을 확인했어요!</h2>
            <p className="text-gray-500">새로운 프로필이 곧 추가될 예정이에요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #FFF5F8 0%, #F0E6FF 100%)' }}>
      <div className="p-6" style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)' }}>
        <h1 className="text-2xl font-bold text-white">💕 오늘의 만남</h1>
        <p className="text-sm text-white/90 mt-1">새로운 인연을 찾아보세요</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div
            className="bg-white rounded-3xl overflow-hidden transition-transform"
            style={{
              transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
              opacity: 1 - Math.abs(dragOffset) / 400,
              boxShadow: '0 10px 40px rgba(255, 107, 157, 0.2)'
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
              className="h-96 bg-cover bg-center cursor-pointer relative"
              style={{ backgroundImage: `url(${currentProfile.image})` }}
              onClick={onViewDetail}
            >
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-semibold" style={{ color: '#FF6B9D' }}>
                  {currentProfileIndex + 1} / {totalProfiles}
                </span>
              </div>
              <div className="h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {currentProfile.name} <span className="font-normal">{currentProfile.age}</span>
                  </h2>
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="text-base">{currentProfile.job}</span>
                    <span>•</span>
                    <span className="text-base">{currentProfile.location}</span>
                  </div>
                  <p className="text-sm text-white/80 mt-3 leading-relaxed">{currentProfile.bio}</p>
                </div>
              </div>
            </div>

            <div className="p-8 flex justify-center gap-8">
              <button
                onClick={onPass}
                className="w-16 h-16 bg-white border-3 hover:scale-110 rounded-full flex items-center justify-center transition-all shadow-lg"
                style={{ borderWidth: '3px', borderColor: '#E5E7EB' }}
              >
                <X className="w-8 h-8" style={{ color: '#9CA3AF' }} />
              </button>
              <button
                onClick={onLike}
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)' }}
              >
                <Heart className="w-10 h-10 text-white fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilesView;
