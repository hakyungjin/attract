import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Calendar, MapPin, Briefcase } from 'lucide-react';

function SignupView({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    location: '',
    job: '',
    bio: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!formData.email || !formData.password || !formData.name) {
      setError('이메일, 비밀번호, 이름은 필수 항목입니다');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    if (formData.age && (formData.age < 19 || formData.age > 100)) {
      setError('나이는 19세 이상 100세 이하여야 합니다');
      return;
    }

    const result = onSignup(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: 'linear-gradient(135deg, #FFF5F8 0%, #F0E6FF 100%)' }}>
      <div className="min-h-full flex items-center justify-center p-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)',
                boxShadow: '0 8px 30px rgba(255, 107, 157, 0.3)'
              }}
            >
              <Heart className="w-12 h-12 text-white fill-current" />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#2D2D2D' }}>💕 하루야</h1>
            <p className="text-lg" style={{ color: '#8E8E93' }}>새로운 시작을 환영합니다</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8" style={{ boxShadow: '0 10px 40px rgba(255, 107, 157, 0.2)' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#2D2D2D' }}>회원가입</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="6자 이상"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 확인 *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                </div>
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="홍길동"
                    required
                  />
                </div>
              </div>

              {/* 나이 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  나이
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="25"
                    min="19"
                    max="100"
                  />
                </div>
              </div>

              {/* 지역 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지역
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="서울 강남구"
                  />
                </div>
              </div>

              {/* 직업 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  직업
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="개발자"
                  />
                </div>
              </div>

              {/* 소개 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  자기소개
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="자신을 소개해주세요..."
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white py-4 rounded-2xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)',
                  boxShadow: '0 8px 25px rgba(255, 107, 157, 0.3)'
                }}
              >
                가입하기
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-pink-500 font-semibold hover:text-pink-600"
                >
                  로그인
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupView;
