import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Calendar, MapPin } from 'lucide-react';

function LoginView({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }

    const result = onLogin(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-4">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💕 만남</h1>
            <p className="text-gray-600">특별한 인연을 만나보세요</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">로그인</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-lg font-semibold transition shadow-lg"
              >
                로그인
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                계정이 없으신가요?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-pink-500 font-semibold hover:text-pink-600"
                >
                  회원가입
                </button>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>데모 계정: demo@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
