import React, { useState, useEffect } from 'react';
import ProfilesView from './ProfilesView';
import ProfileDetailView from './ProfileDetailView';
import ChatListView from './ChatListView';
import ChatDetailView from './ChatDetailView';
import BottomNav from './BottomNav';
import Toast from './Toast';
import { sampleProfiles } from '../data/profiles';

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

  // 이미 본 프로필(좋아요 + 패스) 필터링
  const getAvailableProfiles = () => {
    const seenIds = [...likedProfiles, ...passedProfiles];
    return sampleProfiles.filter(profile => !seenIds.includes(profile.id));
  };

  const availableProfiles = getAvailableProfiles();
  const currentProfile = availableProfiles.length > 0
    ? availableProfiles[currentProfileIndex % availableProfiles.length]
    : null;

  const handleLike = () => {
    if (!currentProfile) return;

    setLikedProfiles([...likedProfiles, currentProfile.id]);

    // 50% 확률로 매칭
    if (Math.random() > 0.5) {
      setMatches([...matches, currentProfile]);
      setToast(`🎉 ${currentProfile.name}님과 매칭되었습니다!`);
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
      </div>

      {currentView !== 'profile-detail' && currentView !== 'chat-detail' && (
        <BottomNav
          currentView={currentView}
          matchCount={matches.length}
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
