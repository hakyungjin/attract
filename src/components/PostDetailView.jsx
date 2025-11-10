import React, { useState } from 'react';
import { ChevronLeft, Heart, MessageCircle, Trash2, Send } from 'lucide-react';

function PostDetailView({ post, comments, currentUser, onBack, onLike, onDelete, onComment, onDeleteComment }) {
  const [commentInput, setCommentInput] = useState('');

  const handleSubmitComment = () => {
    if (commentInput.trim()) {
      onComment(commentInput);
      setCommentInput('');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg flex items-center gap-3">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">게시글</h2>
      </div>

      {/* 게시글 내용 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b">
          {/* 카테고리 */}
          <div className="mb-3">
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
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1>

          {/* 작성자 및 날짜 */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span className="font-medium">{post.userName}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          {/* 내용 */}
          <p className="text-gray-800 whitespace-pre-wrap mb-4">
            {post.content}
          </p>

          {/* 좋아요 및 삭제 */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLike}
              className="flex items-center gap-2 px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-lg transition"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">{post.likes || 0}</span>
            </button>

            {post.userId === currentUser?.id && (
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
                <span className="font-medium">삭제</span>
              </button>
            )}
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            댓글 {comments.length}
          </h3>

          {comments.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>첫 댓글을 작성해보세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                      {comment.userId === currentUser?.id && (
                        <button
                          onClick={() => onDeleteComment(comment.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 댓글 입력 */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSubmitComment}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetailView;
