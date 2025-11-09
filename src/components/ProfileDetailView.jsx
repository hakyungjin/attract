import React from 'react';
import { Heart, X, ChevronLeft } from 'lucide-react';

function ProfileDetailView({ profile, onBack, onLike, onPass }) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${profile.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
          <p className="text-lg mt-1">{profile.job}</p>
          <p className="text-sm mt-1">{profile.location}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">소개</h3>
          <p className="text-gray-700">{profile.bio}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">관심사</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, idx) => (
              <span key={idx} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t flex gap-4">
        <button
          onClick={onPass}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-full font-semibold transition flex items-center justify-center gap-2"
        >
          <X className="w-6 h-6" />
          패스
        </button>
        <button
          onClick={onLike}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-semibold transition flex items-center justify-center gap-2"
        >
          <Heart className="w-6 h-6 fill-current" />
          좋아요
        </button>
      </div>
    </div>
  );
}

export default ProfileDetailView;
