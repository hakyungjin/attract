import React, { useState } from 'react';
import { Heart, MessageCircle, X, ChevronLeft, Send, User } from 'lucide-react';

const DatingApp = () => {
  // 샘플 사용자 데이터
  const sampleProfiles = [
    {
      id: 1,
      name: "지수",
      age: 26,
      location: "서울 강남구",
      job: "디자이너",
      bio: "맛집 탐방과 여행을 좋아해요 ☕️",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      interests: ["여행", "카페", "영화"]
    },
    {
      id: 2,
      name: "민준",
      age: 28,
      location: "서울 서초구",
      job: "개발자",
      bio: "운동과 독서를 즐기는 개발자입니다 💪",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      interests: ["운동", "독서", "음악"]
    },
    {
      id: 3,
      name: "서연",
      age: 25,
      location: "서울 마포구",
      job: "마케터",
      bio: "새로운 사람들과의 만남을 좋아해요 🌟",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      interests: ["맛집", "전시회", "요가"]
    },
    {
      id: 4,
      name: "준호",
      age: 29,
      location: "서울 용산구",
      job: "사진작가",
      bio: "순간을 기록하는 것을 좋아합니다 📸",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      interests: ["사진", "여행", "커피"]
    }
  ];

  const [currentView, setCurrentView] = useState('profiles'); // profiles, chat, profile-detail
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');

  const currentProfile = sampleProfiles[currentProfileIndex];

  // 하트 보내기
  const handleLike = () => {
    const profile = sampleProfiles[currentProfileIndex];
    setLikedProfiles([...likedProfiles, profile.id]);
    
    // 50% 확률로 매칭 성공
    if (Math.random() > 0.5) {
      setMatches([...matches, profile]);
      alert(`🎉 ${profile.name}님과 매칭되었습니다!`);
    }
    
    nextProfile();
  };

  // 패스
  const handlePass = () => {
    nextProfile();
  };

  // 다음 프로필
  const nextProfile = () => {
    if (currentProfileIndex < sampleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  // 채팅 메시지 전송
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

    // 자동 응답 시뮬레이션
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: getAutoReply(),
        sender: 'them',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), autoReply]
      }));
    }, 1000);
  };

  const getAutoReply = () => {
    const replies = [
      "좋은 생각이네요! 😊",
      "저도 그렇게 생각해요",
      "언제 시간 되세요?",
      "그거 재밌을 것 같아요!",
      "어디가 좋을까요?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  // 프로필 상세 보기
  const ProfileDetailView = () => (
    <div className="h-full flex flex-col bg-white">
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${currentProfile.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={() => setCurrentView('profiles')}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
          <p className="text-lg mt-1">{currentProfile.job}</p>
          <p className="text-sm mt-1">{currentProfile.location}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">소개</h3>
          <p className="text-gray-700">{currentProfile.bio}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">관심사</h3>
          <div className="flex flex-wrap gap-2">
            {currentProfile.interests.map((interest, idx) => (
              <span key={idx} className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t flex gap-4">
        <button
          onClick={handlePass}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-full font-semibold transition flex items-center justify-center gap-2"
        >
          <X className="w-6 h-6" />
          패스
        </button>
        <button
          onClick={handleLike}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-full font-semibold transition flex items-center justify-center gap-2"
        >
          <Heart className="w-6 h-6 fill-current" />
          좋아요
        </button>
      </div>
    </div>
  );

  // 프로필 카드 뷰
  const ProfilesView = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">💕 만남</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div
              className="h-96 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${currentProfile.image})` }}
              onClick={() => setCurrentView('profile-detail')}
            >
              <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h2 className="text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                <p className="text-lg mt-1">{currentProfile.job}</p>
                <p className="text-sm mt-1 opacity-90">{currentProfile.location}</p>
                <p className="text-sm mt-3">{currentProfile.bio}</p>
              </div>
            </div>

            <div className="p-6 flex justify-center gap-6">
              <button
                onClick={handlePass}
                className="w-16 h-16 bg-white border-4 border-gray-300 hover:border-gray-400 rounded-full flex items-center justify-center transition shadow-lg"
              >
                <X className="w-8 h-8 text-gray-600" />
              </button>
              <button
                onClick={handleLike}
                className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full flex items-center justify-center transition shadow-xl"
              >
                <Heart className="w-10 h-10 text-white fill-current" />
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-4">
            {currentProfileIndex + 1} / {sampleProfiles.length}
          </p>
        </div>
      </div>
    </div>
  );

  // 채팅 리스트 뷰
  const ChatListView = () => (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">💬 메시지</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageCircle className="w-20 h-20 mb-4" />
            <p className="text-lg">아직 매칭된 사람이 없습니다</p>
            <p className="text-sm mt-2">프로필에 하트를 보내보세요!</p>
          </div>
        ) : (
          <div className="divide-y">
            {matches.map(match => (
              <div
                key={match.id}
                onClick={() => {
                  setSelectedChat(match);
                  setCurrentView('chat-detail');
                }}
                className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-4 transition"
              >
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${match.image})` }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{match.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {chatMessages[match.id]?.slice(-1)[0]?.text || "매칭되었습니다! 인사해보세요 👋"}
                  </p>
                </div>
                <Heart className="w-5 h-5 text-pink-500 fill-current" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 채팅 상세 뷰
  const ChatDetailView = () => (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 shadow-lg flex items-center gap-3">
        <button
          onClick={() => setCurrentView('chat')}
          className="p-1"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div
          className="w-10 h-10 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedChat.image})` }}
        />
        <h2 className="text-xl font-bold">{selectedChat.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {(!chatMessages[selectedChat.id] || chatMessages[selectedChat.id].length === 0) && (
          <div className="text-center text-gray-400 mt-8">
            <p>대화를 시작해보세요! 👋</p>
          </div>
        )}
        {chatMessages[selectedChat.id]?.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col max-w-xs">
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender === 'me'
                    ? 'bg-pink-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
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

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'profiles' && <ProfilesView />}
        {currentView === 'profile-detail' && <ProfileDetailView />}
        {currentView === 'chat' && <ChatListView />}
        {currentView === 'chat-detail' && <ChatDetailView />}
      </div>

      {/* 하단 네비게이션 */}
      {currentView !== 'profile-detail' && currentView !== 'chat-detail' && (
        <div className="border-t bg-white">
          <div className="flex">
            <button
              onClick={() => setCurrentView('profiles')}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition ${
                currentView === 'profiles'
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Heart className={`w-6 h-6 ${currentView === 'profiles' ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">프로필</span>
            </button>
            <button
              onClick={() => setCurrentView('chat')}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition relative ${
                currentView === 'chat'
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs font-medium">메시지</span>
              {matches.length > 0 && (
                <span className="absolute top-2 right-1/3 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {matches.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatingApp;