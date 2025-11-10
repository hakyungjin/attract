import React from 'react';
import { Heart, MessageCircle, User, Users, MessageSquare } from 'lucide-react';

function BottomNav({ currentView, matchCount, requestCount, onNavigate }) {
  const navItems = [
    { id: 'profiles', icon: Heart, label: '탐색', badge: null },
    { id: 'match-requests', icon: Users, label: '매칭', badge: requestCount },
    { id: 'chat', icon: MessageCircle, label: '채팅', badge: matchCount },
    { id: 'community', icon: MessageSquare, label: '커뮤니티', badge: null },
    { id: 'my-profile', icon: User, label: 'MY', badge: null }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-lg border-t" style={{ borderColor: '#FFE0EC' }}>
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 py-2 flex flex-col items-center gap-1.5 transition-all relative"
              style={{
                color: isActive ? '#FF6B9D' : '#9E9E9E'
              }}
            >
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon
                  className="w-6 h-6"
                  style={item.id === 'profiles' && isActive ? { fill: '#FF6B9D' } : {}}
                />
                {item.badge > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)',
                      boxShadow: '0 2px 8px rgba(255, 107, 157, 0.4)'
                    }}
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: isActive ? '#FF6B9D' : '#9E9E9E' }}
              >
                {item.label}
              </span>
              {isActive && (
                <div
                  className="absolute bottom-0 h-1 rounded-t-full transition-all"
                  style={{
                    width: '50%',
                    background: 'linear-gradient(135deg, #FF6B9D 0%, #C239C2 100%)'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;
