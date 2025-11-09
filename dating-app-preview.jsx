import React, { useState } from 'react';
import { Heart, MessageCircle, X, ChevronLeft, Send, User, Edit2, ThumbsUp, MessageSquare, Compass, Users, MapPin, Briefcase, Sparkles, Filter, ChevronRight, Camera } from 'lucide-react';

const DatingApp = () => {
  const sampleProfiles = [
    {
      id: 0,
      name: "나",
      age: 28,
      location: "서울",
      job: "개발자",
      bio: "새로운 만남을 기대합니다 ✨",
      images: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
      ],
      interests: ["코딩", "음악", "영화"]
    },
    {
      id: 1,
      name: "지수",
      age: 26,
      location: "서울 강남구",
      job: "디자이너",
      bio: "맛집 탐방과 여행을 좋아해요",
      images: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop"
      ],
      interests: ["여행", "카페", "영화"]
    },
    {
      id: 2,
      name: "민준",
      age: 28,
      location: "서울 서초구",
      job: "개발자",
      bio: "운동과 독서를 즐기는 개발자입니다",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop"
      ],
      interests: ["운동", "독서", "음악"]
    },
    {
      id: 3,
      name: "서연",
      age: 25,
      location: "서울 마포구",
      job: "마케터",
      bio: "새로운 사람들과의 만남을 좋아해요",
      images: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop"
      ],
      interests: ["맛집", "전시회", "요가"]
    },
    {
      id: 4,
      name: "준호",
      age: 29,
      location: "서울 용산구",
      job: "사진작가",
      bio: "순간을 기록하는 것을 좋아합니다",
      images: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
      ],
      interests: ["사진", "여행", "커피"]
    },
    {
      id: 5,
      name: "유진",
      age: 27,
      location: "서울 송파구",
      job: "교사",
      bio: "아이들과 함께하는 시간이 행복해요",
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
      ],
      interests: ["독서", "요리", "음악"]
    },
    {
      id: 6,
      name: "태양",
      age: 30,
      location: "서울 중구",
      job: "셰프",
      bio: "요리로 사람들을 행복하게 만듭니다",
      images: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
      ],
      interests: ["요리", "맛집", "와인"]
    },
    {
      id: 7,
      name: "하늘",
      age: 24,
      location: "서울 강동구",
      job: "간호사",
      bio: "따뜻한 마음으로 사람들을 돌봅니다",
      images: [
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop"
      ],
      interests: ["운동", "영화", "여행"]
    }
  ];

  const [currentView, setCurrentView] = useState('discover');
  const [detailView, setDetailView] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [myProfile, setMyProfile] = useState({ ...sampleProfiles[0] });
  const [editForm, setEditForm] = useState({ ...sampleProfiles[0] });
  
  // 필터 상태
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    minAge: 20,
    maxAge: 40,
    location: 'all',
    job: 'all',
    interests: []
  });

  // 커뮤니티 댓글 상태
  const [postComments, setPostComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      author: sampleProfiles[1],
      content: "오늘 날씨가 정말 좋네요! 한강 산책하기 딱 좋은 날씨 ☀️",
      likes: 24,
      comments: 5,
      timestamp: "2시간 전",
      liked: false
    },
    {
      id: 2,
      author: sampleProfiles[2],
      content: "강남에 새로 생긴 카페 가봤는데 완전 강추! 분위기도 좋고 커피도 맛있어요 ☕",
      likes: 18,
      comments: 8,
      timestamp: "5시간 전",
      liked: false
    },
    {
      id: 3,
      author: sampleProfiles[3],
      content: "주말에 전시회 보러 가실 분 계신가요? 🎨",
      likes: 12,
      comments: 3,
      timestamp: "1일 전",
      liked: false
    }
  ]);

  // 초기 댓글 데이터
  const initialComments = {
    1: [
      { id: 1, author: myProfile, text: "저도 가고 싶어요!", timestamp: "1시간 전" },
      { id: 2, author: sampleProfiles[2], text: "같이 가실래요?", timestamp: "50분 전" }
    ],
    2: [
      { id: 3, author: sampleProfiles[3], text: "어디에요?", timestamp: "4시간 전" },
      { id: 4, author: sampleProfiles[2], text: "청담동이에요!", timestamp: "3시간 전" }
    ],
    3: [
      { id: 5, author: myProfile, text: "어떤 전시회인가요?", timestamp: "20시간 전" }
    ]
  };

  // 컴포넌트 마운트 시 초기 댓글 설정
  React.useEffect(() => {
    setPostComments(initialComments);
  }, []);

  // 필터링된 프로필
  const getFilteredProfiles = () => {
    return sampleProfiles.filter(profile => {
      if (profile.id === 0) return false;
      
      if (profile.age < filters.minAge || profile.age > filters.maxAge) return false;
      if (filters.location !== 'all' && !profile.location.includes(filters.location)) return false;
      if (filters.job !== 'all' && profile.job !== filters.job) return false;
      
      if (filters.interests.length > 0) {
        const hasCommonInterest = profile.interests.some(interest => 
          filters.interests.includes(interest)
        );
        if (!hasCommonInterest) return false;
      }
      
      return true;
    });
  };

  const handleLike = (profile) => {
    setLikedProfiles([...likedProfiles, profile.id]);
    
    if (Math.random() > 0.5) {
      setMatches([...matches, profile]);
      alert(`🎉 ${profile.name}님과 매칭되었습니다!`);
    } else {
      alert(`❤️ ${profile.name}님에게 좋아요를 보냈습니다!`);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages({
      ...chatMessages,
      [selectedChat.id]: [...(chatMessages[selectedChat.id] || []), newMessage]
    });

    setMessageInput('');

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

  const handleSaveProfile = () => {
    setMyProfile({ ...editForm });
    setIsEditingProfile(false);
    alert('프로필이 저장되었습니다! ✅');
  };

  const togglePostLike = (postId) => {
    setCommunityPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  // 댓글 추가
  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: myProfile,
      text: commentText,
      timestamp: "방금 전"
    };

    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    // 게시글의 댓글 수 증가
    setCommunityPosts(posts =>
      posts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments + 1 }
          : post
      )
    );

    // 입력창 초기화
    setCommentInputs(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  // 댓글 토글
  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // 프로필로 이동
  const navigateToProfile = (profile) => {
    if (profile.id === 0) {
      // 내 프로필
      setCurrentView('profile');
      setDetailView(null);
    } else {
      // 다른 사람 프로필
      setSelectedProfile(profile);
      setCurrentImageIndex(0);
      setDetailView('profile-detail');
    }
  };

  const resetFilters = () => {
    setFilters({
      minAge: 20,
      maxAge: 40,
      location: 'all',
      job: 'all',
      interests: []
    });
  };

  const toggleInterest = (interest) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  // 필터 모달
  const FilterModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Filter className="w-6 h-6" />
            필터
          </h2>
          <button
            onClick={() => setShowFilter(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">나이</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={filters.minAge}
                onChange={(e) => setFilters({...filters, minAge: parseInt(e.target.value)})}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                min="18"
                max="100"
              />
              <span className="text-gray-500">~</span>
              <input
                type="number"
                value={filters.maxAge}
                onChange={(e) => setFilters({...filters, maxAge: parseInt(e.target.value)})}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                min="18"
                max="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">지역</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="all">전체</option>
              <option value="강남구">강남구</option>
              <option value="서초구">서초구</option>
              <option value="마포구">마포구</option>
              <option value="용산구">용산구</option>
              <option value="송파구">송파구</option>
              <option value="강동구">강동구</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">직업</label>
            <select
              value={filters.job}
              onChange={(e) => setFilters({...filters, job: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="all">전체</option>
              <option value="개발자">개발자</option>
              <option value="디자이너">디자이너</option>
              <option value="마케터">마케터</option>
              <option value="사진작가">사진작가</option>
              <option value="교사">교사</option>
              <option value="셰프">셰프</option>
              <option value="간호사">간호사</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">관심사</label>
            <div className="flex flex-wrap gap-2">
              {['여행', '카페', '영화', '운동', '독서', '음악', '맛집', '전시회', '요가', '사진', '커피', '요리', '와인', '코딩'].map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filters.interests.includes(interest)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={resetFilters}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-all"
            >
              초기화
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg"
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 그리드 형태 탐색 탭
  const DiscoverView = () => {
    const displayProfiles = getFilteredProfiles();
    
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl">
          <div className="p-5 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-7 h-7" />
                탐색
              </h1>
              <button 
                onClick={() => setShowFilter(true)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full flex items-center gap-2 transition-all relative"
              >
                <Filter className="w-4 h-4" />
                필터
                {(filters.minAge !== 20 || filters.maxAge !== 40 || filters.location !== 'all' || filters.job !== 'all' || filters.interests.length > 0) && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {[
                      filters.minAge !== 20 || filters.maxAge !== 40,
                      filters.location !== 'all',
                      filters.job !== 'all',
                      filters.interests.length > 0
                    ].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
            <p className="text-blue-100 text-sm">
              {displayProfiles.length}명의 새로운 인연
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {displayProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
                <Filter className="w-20 h-20 mb-4 mx-auto text-gray-300" />
                <p className="text-lg font-semibold text-gray-600">필터 조건에 맞는 프로필이 없습니다</p>
                <p className="text-sm mt-2">필터를 조정해보세요</p>
                <button
                  onClick={() => {
                    resetFilters();
                    setShowFilter(true);
                  }}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold"
                >
                  필터 초기화
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayProfiles.map(profile => (
                <div
                  key={profile.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
                  onClick={() => {
                    setSelectedProfile(profile);
                    setCurrentImageIndex(0);
                    setDetailView('profile-detail');
                  }}
                >
                  <div className="relative">
                    <div 
                      className="h-56 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${profile.images[0]})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                        {profile.age}세
                      </div>
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {profile.images.length}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-lg font-bold mb-1 truncate">{profile.name}</h3>
                        <div className="flex items-center gap-1 text-xs opacity-90 mb-1">
                          <Briefcase className="w-3 h-3" />
                          <span className="truncate">{profile.job}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{profile.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-b from-white to-gray-50">
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">{profile.bio}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(profile);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm shadow-md hover:shadow-lg active:scale-95"
                    >
                      <Heart className="w-4 h-4" />
                      좋아요
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 프로필 상세 보기
  const ProfileDetailView = () => {
    const nextImage = () => {
      setCurrentImageIndex((prev) => 
        prev < selectedProfile.images.length - 1 ? prev + 1 : 0
      );
    };

    const prevImage = () => {
      setCurrentImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedProfile.images.length - 1
      );
    };

    return (
      <div className="h-full flex flex-col bg-white">
        <div className="relative h-[500px] bg-cover bg-center group" style={{ backgroundImage: `url(${selectedProfile.images[currentImageIndex]})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          
          <button
            onClick={() => setDetailView(null)}
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all active:scale-95 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {selectedProfile.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all opacity-0 group-hover:opacity-100 active:scale-95"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedProfile.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1 rounded-full transition-all ${
                      idx === currentImageIndex 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 w-6'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-8 left-6 right-6 text-white">
            <h2 className="text-4xl font-bold mb-3">{selectedProfile.name}, {selectedProfile.age}</h2>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5" />
              <p className="text-lg">{selectedProfile.job}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <p className="text-base">{selectedProfile.location}</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                소개
              </h3>
              <p className="text-gray-700 leading-relaxed">{selectedProfile.bio}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-500" />
                관심사
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProfile.interests.map((interest, idx) => (
                  <span key={idx} className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t bg-white flex gap-3 shadow-lg">
          <button
            onClick={() => setDetailView(null)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            뒤로
          </button>
          <button
            onClick={() => {
              handleLike(selectedProfile);
              setDetailView(null);
            }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Heart className="w-6 h-6 fill-current" />
            좋아요
          </button>
        </div>
      </div>
    );
  };

  // 내 프로필 탭
  const MyProfileView = () => (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-5 shadow-xl">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-7 h-7" />
            내 프로필
          </h1>
          {!isEditingProfile && (
            <button
              onClick={() => {
                setEditForm({ ...myProfile });
                setIsEditingProfile(true);
              }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full flex items-center gap-2 transition-all font-medium"
            >
              <Edit2 className="w-4 h-4" />
              편집
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!isEditingProfile ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto">
            <div className="relative h-80 bg-cover bg-center group" style={{ backgroundImage: `url(${myProfile.images[0]})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                <Camera className="w-3 h-3" />
                {myProfile.images.length}
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-4xl font-bold mb-2">{myProfile.name}, {myProfile.age}</h2>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <p className="text-lg">{myProfile.job}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">{myProfile.location}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 bg-gradient-to-b from-white to-gray-50">
              <div>
                <h3 className="text-base font-bold mb-2 text-gray-600 uppercase tracking-wide text-xs">소개</h3>
                <p className="text-gray-800 leading-relaxed">{myProfile.bio}</p>
              </div>

              <div>
                <h3 className="text-base font-bold mb-3 text-gray-600 uppercase tracking-wide text-xs">관심사</h3>
                <div className="flex flex-wrap gap-2">
                  {myProfile.interests.map((interest, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto space-y-5">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">프로필 편집</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">나이</label>
              <input
                type="number"
                value={editForm.age}
                onChange={(e) => setEditForm({ ...editForm, age: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">직업</label>
              <input
                type="text"
                value={editForm.job}
                onChange={(e) => setEditForm({ ...editForm, job: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">위치</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">소개</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-all active:scale-95"
              >
                취소
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
              >
                저장
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 메시지 탭
  const MessagesView = () => (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-5 shadow-xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="w-7 h-7" />
            메시지
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="bg-white rounded-3xl p-12 shadow-xl">
              <MessageCircle className="w-20 h-20 mb-4 mx-auto text-gray-300" />
              <p className="text-lg font-semibold text-gray-600">아직 매칭된 사람이 없습니다</p>
              <p className="text-sm mt-2">탐색에서 하트를 보내보세요!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-w-md mx-auto">
            {matches.map(match => (
              <div
                key={match.id}
                onClick={() => {
                  setSelectedChat(match);
                  setDetailView('chat-detail');
                }}
                className="bg-white p-4 rounded-2xl hover:shadow-xl cursor-pointer flex items-center gap-4 transition-all active:scale-98 shadow-md"
              >
                <div
                  className="w-16 h-16 rounded-2xl bg-cover bg-center shadow-md flex-shrink-0"
                  style={{ backgroundImage: `url(${match.images[0]})` }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-800">{match.name}</h3>
                  <p className="text-gray-500 text-sm truncate">
                    {chatMessages[match.id]?.slice(-1)[0]?.text || "매칭되었습니다! 인사해보세요 👋"}
                  </p>
                </div>
                <Heart className="w-5 h-5 text-blue-500 fill-current flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 채팅 상세
  const ChatDetailView = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-4 shadow-xl flex items-center gap-3">
        <button
          onClick={() => setDetailView(null)}
          className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div
          className="w-11 h-11 rounded-xl bg-cover bg-center shadow-lg"
          style={{ backgroundImage: `url(${selectedChat.images[0]})` }}
        />
        <h2 className="text-xl font-bold">{selectedChat.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(!chatMessages[selectedChat.id] || chatMessages[selectedChat.id].length === 0) && (
          <div className="text-center text-gray-400 mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-md inline-block">
              <p className="text-lg">대화를 시작해보세요! 👋</p>
            </div>
          </div>
        )}
        {chatMessages[selectedChat.id]?.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col max-w-xs">
              <div
                className={`rounded-2xl px-5 py-3 shadow-md ${
                  message.sender === 'me'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md'
                }`}
              >
                {message.text}
              </div>
              <span className="text-xs text-gray-400 mt-1 px-2">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white shadow-lg">
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-3 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center w-12 h-12"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // 커뮤니티 탭
  const CommunityView = () => (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-5 shadow-xl">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-7 h-7" />
            커뮤니티
          </h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          {communityPosts.map(post => (
            <div key={post.id} className="bg-white rounded-3xl shadow-lg p-5 hover:shadow-xl transition-all">
              <div 
                className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigateToProfile(post.author)}
              >
                <div
                  className="w-12 h-12 rounded-2xl bg-cover bg-center shadow-md"
                  style={{ backgroundImage: `url(${post.author.images[0]})` }}
                />
                <div>
                  <h3 className="font-bold text-gray-800">{post.author.name}, {post.author.age}</h3>
                  <p className="text-xs text-gray-400">{post.timestamp}</p>
                </div>
              </div>

              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              <div className="flex items-center gap-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => togglePostLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    post.liked 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-bold">{post.likes}</span>
                </button>
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-bold">{post.comments}</span>
                </button>
              </div>

              {/* 댓글 섹션 */}
              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  {/* 댓글 목록 */}
                  {postComments[post.id]?.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-xl bg-cover bg-center shadow-sm flex-shrink-0 cursor-pointer"
                        style={{ backgroundImage: `url(${comment.author.images[0]})` }}
                        onClick={() => navigateToProfile(comment.author)}
                      />
                      <div className="flex-1 bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 
                            className="font-bold text-sm text-gray-800 cursor-pointer hover:text-blue-600"
                            onClick={() => navigateToProfile(comment.author)}
                          >
                            {comment.author.name}
                          </h4>
                          <span className="text-xs text-gray-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* 댓글 입력 */}
                  <div className="flex gap-2 mt-3">
                    <div
                      className="w-8 h-8 rounded-xl bg-cover bg-center shadow-sm flex-shrink-0"
                      style={{ backgroundImage: `url(${myProfile.images[0]})` }}
                    />
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      placeholder="댓글을 입력하세요..."
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 하단 네비게이션
  const BottomNav = () => (
    <div className="border-t bg-white/80 backdrop-blur-lg shadow-2xl">
      <div className="flex max-w-md mx-auto">
        <button
          onClick={() => {
            setCurrentView('discover');
            setDetailView(null);
          }}
          className={`flex-1 py-3.5 flex flex-col items-center gap-1 transition-all ${
            currentView === 'discover' 
              ? 'text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Compass className={`w-6 h-6 ${currentView === 'discover' ? 'fill-current' : ''}`} />
          <span className="text-xs font-bold">탐색</span>
        </button>
        <button
          onClick={() => {
            setCurrentView('profile');
            setDetailView(null);
          }}
          className={`flex-1 py-3.5 flex flex-col items-center gap-1 transition-all ${
            currentView === 'profile' 
              ? 'text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-bold">프로필</span>
        </button>
        <button
          onClick={() => {
            setCurrentView('messages');
            setDetailView(null);
          }}
          className={`flex-1 py-3.5 flex flex-col items-center gap-1 transition-all relative ${
            currentView === 'messages' 
              ? 'text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-bold">메시지</span>
          {matches.length > 0 && (
            <span className="absolute top-1 right-1/3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
              {matches.length}
            </span>
          )}
        </button>
        <button
          onClick={() => {
            setCurrentView('community');
            setDetailView(null);
          }}
          className={`flex-1 py-3.5 flex flex-col items-center gap-1 transition-all ${
            currentView === 'community' 
              ? 'text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs font-bold">커뮤니티</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-hidden">
        {detailView === 'profile-detail' && <ProfileDetailView />}
        {detailView === 'chat-detail' && <ChatDetailView />}
        {!detailView && currentView === 'discover' && <DiscoverView />}
        {!detailView && currentView === 'profile' && <MyProfileView />}
        {!detailView && currentView === 'messages' && <MessagesView />}
        {!detailView && currentView === 'community' && <CommunityView />}
      </div>

      {!detailView && <BottomNav />}
      {showFilter && <FilterModal />}
    </div>
  );
};

export default DatingApp;