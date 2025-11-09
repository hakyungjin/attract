import React, { useState } from 'react';
import ProfilesView from './components/ProfilesView';
import ProfileDetailView from './components/ProfileDetailView';
import ChatListView from './components/ChatListView';
import ChatDetailView from './components/ChatDetailView';
import BottomNav from './components/BottomNav';
import { sampleProfiles } from './data/profiles';

function App() {
  const [currentView, setCurrentView] = useState('profiles');
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});

  const currentProfile = sampleProfiles[currentProfileIndex];

  const handleLike = () => {
    const profile = sampleProfiles[currentProfileIndex];
    setLikedProfiles([...likedProfiles, profile.id]);
    
    // 50% 확률로 매칭
    if (Math.random() > 0.5) {
      setMatches([...matches, profile]);
      alert(`🎉 ${profile.name}님과 매칭되었습니다!`);
    }
    
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentProfileIndex < sampleProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
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
    </div>
  );
}

export default App;
