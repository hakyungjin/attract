import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';

function CreatePostView({ onBack, onCreate }) {
  const [formData, setFormData] = useState({
    category: 'general',
    title: '',
    content: ''
  });

  const [error, setError] = useState('');

  const categories = [
    { id: 'general', name: '일반' },
    { id: 'dating', name: '소개팅' },
    { id: 'tips', name: '팁' },
    { id: 'chat', name: '잡담' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('제목을 입력해주세요');
      return;
    }

    if (!formData.content.trim()) {
      setError('내용을 입력해주세요');
      return;
    }

    onCreate(formData);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">게시글 작성</h2>
      </div>

      {/* 작성 폼 */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 카테고리 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    formData.category === category.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/100
            </p>
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내용 *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="내용을 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-64 resize-none"
              maxLength={2000}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.content.length}/2000
            </p>
          </div>

          {/* 작성 버튼 */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            게시하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostView;
