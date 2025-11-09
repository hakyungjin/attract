import React from 'react';
import { Heart, X } from 'lucide-react';

function ProfilesView({ currentProfile, currentProfileIndex, totalProfiles, onLike, onPass, onViewDetail }) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">💕 만남</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
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
