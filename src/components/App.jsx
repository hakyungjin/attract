import React, { useState, useEffect } from 'react';
import ProfilesView from './ProfilesView';
import ProfileDetailView from './ProfileDetailView';
import ChatListView from './ChatListView';
import ChatDetailView from './ChatDetailView';
import MyProfileView from './MyProfileView';
import MatchRequestsView from './MatchRequestsView';
import CommunityView from './CommunityView';
import PostDetailView from './PostDetailView';
import CreatePostView from './CreatePostView';
import BottomNav from './BottomNav';
import Toast from './Toast';
import LoginView from './LoginView';
import SignupView from './SignupView';
import { sampleProfiles } from '../data/profiles';
import { getCurrentUser, login, signup, logout, createDemoUser } from '../utils/auth';
import {
  sendMatchRequest,
  getReceivedMatchRequests,
  getSentMatchRequests,
  acceptMatchRequest,
  rejectMatchRequest,
  cancelMatchRequest
} from '../utils/matching';
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  createComment,
  getComments,
  deleteComment
} from '../utils/community';

// localStorage 헬퍼 함수
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

function App() {
  // 인증 상태
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  const [currentView, setCurrentView] = useState('profiles');
  const [currentProfileIndex, setCurrentProfileIndex] = useState(
    loadFromLocalStorage('currentProfileIndex', 0)
  );
  const [likedProfiles, setLikedProfiles] = useState(
    loadFromLocalStorage('likedProfiles', [])
  );
  const [passedProfiles, setPassedProfiles] = useState(
    loadFromLocalStorage('passedProfiles', [])
  );
  const [matches, setMatches] = useState(
    loadFromLocalStorage('matches', [])
  );
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState(
    loadFromLocalStorage('chatMessages', {})
  );
  const [toast, setToast] = useState(null);

  // 매칭 요청 상태
  const [receivedMatchRequests, setReceivedMatchRequests] = useState([]);
  const [sentMatchRequests, setSentMatchRequests] = useState([]);

  // 커뮤니티 상태
  const [communityPosts, setCommunityPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');

  // 앱 초기화 시 데모 사용자 생성
  useEffect(() => {
    createDemoUser();
  }, []);

  // 상태 변경 시 자동으로 localStorage에 저장
  useEffect(() => {
    saveToLocalStorage('currentProfileIndex', currentProfileIndex);
  }, [currentProfileIndex]);

  useEffect(() => {
    saveToLocalStorage('likedProfiles', likedProfiles);
  }, [likedProfiles]);

  useEffect(() => {
    saveToLocalStorage('passedProfiles', passedProfiles);
  }, [passedProfiles]);

  useEffect(() => {
    saveToLocalStorage('matches', matches);
  }, [matches]);

  useEffect(() => {
    saveToLocalStorage('chatMessages', chatMessages);
  }, [chatMessages]);

  // 매칭 요청 데이터 로드
  useEffect(() => {
    const loadMatchRequests = async () => {
      if (currentUser) {
        try {
          const received = await getReceivedMatchRequests(currentUser.id);
          const sent = await getSentMatchRequests(currentUser.id);
          setReceivedMatchRequests(received);
          setSentMatchRequests(sent);
        } catch (error) {
          console.error('Error loading match requests:', error);
        }
      }
    };
    loadMatchRequests();
  }, [currentUser]);

  // 커뮤니티 데이터 로드
  useEffect(() => {
    const loadCommunityPosts = async () => {
      if (currentUser) {
        try {
          const posts = await getPosts(currentCategory === 'all' ? null : currentCategory);
          setCommunityPosts(posts);
        } catch (error) {
          console.error('Error loading community posts:', error);
        }
      }
    };
    loadCommunityPosts();
  }, [currentUser, currentCategory]);

  // 이미 본 프로필(좋아요 + 패스) 필터링
  const getAvailableProfiles = () => {
    const seenIds = [...likedProfiles, ...passedProfiles];
    return sampleProfiles.filter(profile => !seenIds.includes(profile.id));
  };

  const availableProfiles = getAvailableProfiles();
  const currentProfile = availableProfiles.length > 0
    ? availableProfiles[currentProfileIndex % availableProfiles.length]
    : null;

  const handleLike = async () => {
    if (!currentProfile || !currentUser) return;

    setLikedProfiles([...likedProfiles, currentProfile.id]);

    // 매칭 요청 전송
    try {
      await sendMatchRequest(currentUser.id, currentProfile);
      setToast(`💌 ${currentProfile.name}님에게 매칭 요청을 보냈습니다!`);

      // 보낸 요청 목록 업데이트
      const sent = await getSentMatchRequests(currentUser.id);
      setSentMatchRequests(sent);
    } catch (error) {
      console.error('Error sending match request:', error);
      setToast('❌ 매칭 요청 전송에 실패했습니다');
    }

    nextProfile();
  };

  const handlePass = () => {
    if (!currentProfile) return;

    setPassedProfiles([...passedProfiles, currentProfile.id]);
    nextProfile();
  };

  const nextProfile = () => {
    const available = getAvailableProfiles();
    if (available.length > 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else if (available.length === 1) {
      // 마지막 프로필이면 리셋
      setCurrentProfileIndex(0);
    }
  };

  const handleSendMessage = (message) => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages({
      ...chatMessages,
      [selectedChat.id]: [...(chatMessages[selectedChat.id] || []), newMessage]
    });

    // 자동 응답
    setTimeout(() => {
      const replies = [
        "좋은 생각이네요! 😊",
        "저도 그렇게 생각해요",
        "언제 시간 되세요?",
        "그거 재밌을 것 같아요!",
        "어디가 좋을까요?"
      ];
      const autoReply = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'them',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), autoReply]
      }));
    }, 1000);
  };

  // 매칭 요청 수락
  const handleAcceptMatch = async (request) => {
    try {
      await acceptMatchRequest(request.id, currentUser.id);
      setToast(`🎉 ${request.fromUserName}님과 매칭되었습니다!`);

      // 매칭 목록에 추가
      const newMatch = {
        id: request.fromUserId,
        name: request.fromUserName,
        age: request.fromUserAge || 25,
        bio: request.fromUserBio || '',
        photo: request.fromUserPhoto || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        lastMessage: '매칭되었습니다!',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        unread: 0
      };
      setMatches([...matches, newMatch]);

      // 요청 목록 업데이트
      const received = await getReceivedMatchRequests(currentUser.id);
      setReceivedMatchRequests(received);
    } catch (error) {
      console.error('Error accepting match:', error);
      setToast('❌ 매칭 수락에 실패했습니다');
    }
  };

  // 매칭 요청 거절
  const handleRejectMatch = async (requestId) => {
    try {
      await rejectMatchRequest(requestId, currentUser.id);
      setToast('매칭 요청을 거절했습니다');

      // 요청 목록 업데이트
      const received = await getReceivedMatchRequests(currentUser.id);
      setReceivedMatchRequests(received);
    } catch (error) {
      console.error('Error rejecting match:', error);
      setToast('❌ 요청 거절에 실패했습니다');
    }
  };

  // 매칭 요청 취소
  const handleCancelRequest = async (requestId) => {
    try {
      await cancelMatchRequest(requestId);
      setToast('매칭 요청을 취소했습니다');

      // 보낸 요청 목록 업데이트
      const sent = await getSentMatchRequests(currentUser.id);
      setSentMatchRequests(sent);
    } catch (error) {
      console.error('Error canceling request:', error);
      setToast('❌ 요청 취소에 실패했습니다');
    }
  };

  // 게시글 작성
  const handleCreatePost = async (postData) => {
    try {
      await createPost(currentUser.id, currentUser.name, postData);
      setToast('✅ 게시글이 작성되었습니다!');

      // 게시글 목록 새로고침
      const posts = await getPosts(currentCategory === 'all' ? null : currentCategory);
      setCommunityPosts(posts);

      // 커뮤니티 뷰로 돌아가기
      setCurrentView('community');
    } catch (error) {
      console.error('Error creating post:', error);
      setToast('❌ 게시글 작성에 실패했습니다');
    }
  };

  // 게시글 삭제
  const handleDeletePost = async () => {
    if (!selectedPost) return;

    try {
      await deletePost(selectedPost.id, currentUser.id);
      setToast('게시글이 삭제되었습니다');

      // 게시글 목록 새로고침
      const posts = await getPosts(currentCategory === 'all' ? null : currentCategory);
      setCommunityPosts(posts);

      // 커뮤니티 뷰로 돌아가기
      setCurrentView('community');
    } catch (error) {
      console.error('Error deleting post:', error);
      setToast('❌ 게시글 삭제에 실패했습니다');
    }
  };

  // 게시글 좋아요
  const handleLikePost = async () => {
    if (!selectedPost) return;

    try {
      await likePost(selectedPost.id, currentUser.id);

      // 게시글 새로고침
      const updatedPost = await getPost(selectedPost.id);
      setSelectedPost(updatedPost);
    } catch (error) {
      console.error('Error liking post:', error);
      setToast('❌ 좋아요에 실패했습니다');
    }
  };

  // 댓글 작성
  const handleCreateComment = async (content) => {
    if (!selectedPost) return;

    try {
      await createComment(selectedPost.id, currentUser.id, currentUser.name, content);

      // 댓글 목록 새로고침
      const comments = await getComments(selectedPost.id);
      setPostComments(comments);

      // 게시글 댓글 수 업데이트
      const updatedPost = await getPost(selectedPost.id);
      setSelectedPost(updatedPost);
    } catch (error) {
      console.error('Error creating comment:', error);
      setToast('❌ 댓글 작성에 실패했습니다');
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    if (!selectedPost) return;

    try {
      await deleteComment(selectedPost.id, commentId, currentUser.id);
      setToast('댓글이 삭제되었습니다');

      // 댓글 목록 새로고침
      const comments = await getComments(selectedPost.id);
      setPostComments(comments);
    } catch (error) {
      console.error('Error deleting comment:', error);
      setToast('❌ 댓글 삭제에 실패했습니다');
    }
  };

  // 게시글 상세 보기
  const handleViewPost = async (post) => {
    setSelectedPost(post);

    // 댓글 불러오기
    try {
      const comments = await getComments(post.id);
      setPostComments(comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }

    setCurrentView('post-detail');
  };

  // 로그인 처리
  const handleLogin = (email, password) => {
    const result = login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      setToast(`환영합니다, ${result.user.name}님!`);
    }
    return result;
  };

  // 회원가입 처리
  const handleSignup = (userData) => {
    const result = signup(userData);
    if (result.success) {
      setCurrentUser(result.user);
      setToast(`가입을 환영합니다, ${result.user.name}님!`);
      setAuthView('login');
    }
    return result;
  };

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setToast('로그아웃되었습니다');
  };

  // 로그인하지 않은 경우 로그인/회원가입 화면 표시
  if (!currentUser) {
    return (
      <>
        {authView === 'login' ? (
          <LoginView
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView('signup')}
          />
        ) : (
          <SignupView
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
        {toast && (
          <Toast
            message={toast}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  // 로그인한 사용자 - 메인 앱 표시
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-hidden">
        {currentView === 'profiles' && (
          <ProfilesView
            currentProfile={currentProfile}
            currentProfileIndex={currentProfileIndex}
            totalProfiles={sampleProfiles.length}
            onLike={handleLike}
            onPass={handlePass}
            onViewDetail={() => setCurrentView('profile-detail')}
          />
        )}
        
        {currentView === 'profile-detail' && (
          <ProfileDetailView
            profile={currentProfile}
            onBack={() => setCurrentView('profiles')}
            onLike={handleLike}
            onPass={handlePass}
          />
        )}
        
        {currentView === 'chat' && (
          <ChatListView
            matches={matches}
            chatMessages={chatMessages}
            onSelectChat={(match) => {
              setSelectedChat(match);
              setCurrentView('chat-detail');
            }}
          />
        )}
        
        {currentView === 'chat-detail' && selectedChat && (
          <ChatDetailView
            chat={selectedChat}
            messages={chatMessages[selectedChat.id] || []}
            onBack={() => setCurrentView('chat')}
            onSendMessage={handleSendMessage}
          />
        )}

        {currentView === 'match-requests' && (
          <MatchRequestsView
            receivedRequests={receivedMatchRequests}
            sentRequests={sentMatchRequests}
            onAccept={handleAcceptMatch}
            onReject={handleRejectMatch}
            onCancel={handleCancelRequest}
          />
        )}

        {currentView === 'community' && (
          <CommunityView
            posts={communityPosts}
            currentCategory={currentCategory}
            onCategoryChange={setCurrentCategory}
            onViewPost={handleViewPost}
            onCreatePost={() => setCurrentView('create-post')}
          />
        )}

        {currentView === 'post-detail' && selectedPost && (
          <PostDetailView
            post={selectedPost}
            comments={postComments}
            currentUser={currentUser}
            onBack={() => setCurrentView('community')}
            onLike={handleLikePost}
            onDelete={handleDeletePost}
            onComment={handleCreateComment}
            onDeleteComment={handleDeleteComment}
          />
        )}

        {currentView === 'create-post' && (
          <CreatePostView
            onBack={() => setCurrentView('community')}
            onCreate={handleCreatePost}
          />
        )}

        {currentView === 'my-profile' && (
          <MyProfileView
            user={currentUser}
            onLogout={handleLogout}
          />
        )}
      </div>

      {currentView !== 'profile-detail' && currentView !== 'chat-detail' && currentView !== 'post-detail' && currentView !== 'create-post' && (
        <BottomNav
          currentView={currentView}
          matchCount={matches.length}
          requestCount={receivedMatchRequests.filter(r => r.status === 'pending').length}
          onNavigate={setCurrentView}
        />
      )}

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
