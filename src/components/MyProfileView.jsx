import React from 'react';
import { User, Mail, Calendar, MapPin, Briefcase, LogOut } from 'lucide-react';

function MyProfileView({ user, onLogout }) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">👤 내 프로필</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto">
          {/* 프로필 카드 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {user.name}
            </h2>

            <div className="space-y-4">
              {/* 이메일 */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">이메일</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>

              {/* 나이 */}
              {user.age && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">나이</p>
                    <p className="text-gray-800">{user.age}세</p>
                  </div>
                </div>
              )}

              {/* 지역 */}
              {user.location && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">지역</p>
                    <p className="text-gray-800">{user.location}</p>
                  </div>
                </div>
              )}

              {/* 직업 */}
              {user.job && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">직업</p>
                    <p className="text-gray-800">{user.job}</p>
                  </div>
                </div>
              )}

              {/* 자기소개 */}
              {user.bio && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">자기소개</p>
                  <p className="text-gray-800">{user.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          <button
            onClick={onLogout}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow"
          >
            <LogOut className="w-5 h-5" />
            로그아웃
          </button>

          {/* 가입 정보 */}
          {user.createdAt && (
            <p className="text-center text-sm text-gray-500 mt-4">
              가입일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfileView;
