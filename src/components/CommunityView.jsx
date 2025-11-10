import React, { useState } from 'react';
import { Plus, Heart, MessageCircle, Flame, Coffee, Lightbulb, MessageSquare } from 'lucide-react';

function CommunityView({ posts, onPostClick, onCreatePost, currentCategory, onCategoryChange }) {
  const categories = [
    { id: 'all', name: '전체', icon: Flame },
    { id: 'dating', name: '소개팅', icon: Heart },
    { id: 'tips', name: '팁', icon: Lightbulb },
    { id: 'chat', name: '잡담', icon: Coffee }
  ];

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">🌟 커뮤니티</h1>
      </div>

      {/* 카테고리 탭 */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex px-2 py-3 gap-2 min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-2 whitespace-nowrap ${
                  currentCategory === category.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="flex-1 overflow-y-auto">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageSquare className="w-20 h-20 mb-4" />
            <p className="text-lg">게시글이 없습니다</p>
            <p className="text-sm mt-2">첫 번째 게시글을 작성해보세요!</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => onPostClick(post)}
                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
              >
                {/* 카테고리 배지 */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.category === 'dating' ? 'bg-pink-100 text-pink-600' :
                    post.category === 'tips' ? 'bg-yellow-100 text-yellow-600' :
                    post.category === 'chat' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {post.category === 'dating' ? '소개팅' :
                     post.category === 'tips' ? '팁' :
                     post.category === 'chat' ? '잡담' : '일반'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="font-bold text-lg mb-2 line-clamp-1">
                  {post.title}
                </h3>

                {/* 내용 미리보기 */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {post.content}
                </p>

                {/* 작성자 및 통계 */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">{post.userName}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentCount || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 글쓰기 버튼 */}
      <button
        onClick={onCreatePost}
        className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full shadow-lg flex items-center justify-center transition"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CommunityView;
