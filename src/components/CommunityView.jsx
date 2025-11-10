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
    <div className="h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #F0F8FF 0%, #E3F2FD 100%)' }}>
      <div className="p-6" style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}>
        <h1 className="text-2xl font-bold text-white">💬 커뮤니티</h1>
        <p className="text-sm text-white/90 mt-1">자유롭게 이야기를 나눠요</p>
      </div>

      {/* 카테고리 탭 */}
      <div className="bg-white/50 backdrop-blur-sm overflow-x-auto">
        <div className="flex px-4 py-4 gap-2 min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive ? 'shadow-lg scale-105' : 'hover:scale-105'
                }`}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)'
                    : 'white',
                  color: isActive ? 'white' : '#666'
                }}
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
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: '#90CAF9' }} />
              <p className="text-lg font-semibold text-gray-700">게시글이 없습니다</p>
              <p className="text-sm text-gray-500 mt-2">첫 번째 게시글을 작성해보세요!</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {posts.map((post, index) => {
              const colors = [
                { bg: '#E3F2FD', border: '#90CAF9' },
                { bg: '#E0F7FA', border: '#4DD0E1' },
                { bg: '#E1F5FE', border: '#64B5F6' },
                { bg: '#F1F8E9', border: '#AED581' }
              ];
              const color = colors[index % colors.length];

              return (
                <div
                  key={post.id}
                  onClick={() => onPostClick(post)}
                  className="rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: color.bg,
                    borderLeft: `4px solid ${color.border}`
                  }}
                >
                  {/* 카테고리 배지 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{
                        background: post.category === 'dating' ? '#64B5F6' :
                                   post.category === 'tips' ? '#4DD0E1' :
                                   post.category === 'chat' ? '#42A5F5' : '#9E9E9E',
                        color: 'white'
                      }}>
                      {post.category === 'dating' ? '💙 소개팅' :
                       post.category === 'tips' ? '💡 팁' :
                       post.category === 'chat' ? '☕ 잡담' : '📝 일반'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="font-bold text-lg mb-2 line-clamp-1" style={{ color: '#2D2D2D' }}>
                    {post.title}
                  </h3>

                  {/* 내용 미리보기 */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
                    {post.content}
                  </p>

                  {/* 작성자 및 통계 */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold" style={{ color: '#666' }}>{post.userName}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4" style={{ color: '#64B5F6' }} />
                        <span className="font-medium" style={{ color: '#666' }}>{post.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" style={{ color: '#9E9E9E' }} />
                        <span className="font-medium" style={{ color: '#666' }}>{post.commentCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 글쓰기 버튼 */}
      <button
        onClick={onCreatePost}
        className="fixed bottom-20 right-6 w-16 h-16 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)' }}
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}

export default CommunityView;
