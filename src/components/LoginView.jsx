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
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #F0F8FF 0%, #E3F2FD 100%)' }}>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)',
                boxShadow: '0 8px 30px rgba(100, 181, 246, 0.3)'
              }}
            >
              <Heart className="w-12 h-12 text-white fill-current" />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#2D2D2D' }}>💙 하루야</h1>
            <p className="text-lg" style={{ color: '#8E8E93' }}>특별한 인연을 만나보세요</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8" style={{ boxShadow: '0 10px 40px rgba(100, 181, 246, 0.2)' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#2D2D2D' }}>로그인</h2>

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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white py-4 rounded-2xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)',
                  boxShadow: '0 8px 25px rgba(100, 181, 246, 0.3)'
                }}
              >
                로그인
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                계정이 없으신가요?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="font-semibold hover:text-blue-600"
                  style={{ color: '#64B5F6' }}
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
