# 💕 소개팅 앱

React와 Tailwind CSS로 만든 모던한 소개팅 애플리케이션입니다.

## ✨ 주요 기능

### 🔐 인증 시스템
- **회원가입/로그인**: 이메일 기반 사용자 계정 시스템
- **사용자 프로필**: 이름, 나이, 지역, 직업, 자기소개 관리
- **세션 유지**: 로그인 상태 자동 저장
- **데모 계정**: `demo@example.com` / `password`

### 💕 매칭 기능
- 📱 **프로필 탐색**: 스와이프 제스처로 다른 사용자의 프로필 확인
- 💝 **좋아요/패스**: 하트를 보내거나 패스하기 (드래그로도 가능!)
- 🎯 **매칭 시스템**: 좋아요를 보내면 랜덤으로 매칭
- 💬 **실시간 채팅**: 매칭된 사람과 메시지 주고받기

### 🎨 사용자 경험
- 📦 **상태 저장**: 앱 재시작 시에도 데이터 유지 (localStorage)
- 🔔 **토스트 알림**: 매칭 시 세련된 알림 표시
- 🚀 **자동 스크롤**: 채팅 메시지 전송 시 자동 스크롤
- 👆 **터치 제스처**: 좌우로 드래그하여 좋아요/패스
- 🎨 **반응형 디자인**: 모바일 친화적인 UI/UX

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 데모 계정

앱에 접속하면 자동으로 데모 계정이 생성됩니다:
- **이메일**: demo@example.com
- **비밀번호**: password

또는 새로운 계정을 회원가입할 수 있습니다.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 📁 프로젝트 구조

```
dating-app/
├── src/
│   ├── components/               # React 컴포넌트
│   │   ├── App.jsx              # 메인 앱 컴포넌트
│   │   ├── ProfilesView.jsx     # 프로필 카드 뷰 (스와이프 제스처)
│   │   ├── ProfileDetailView.jsx # 프로필 상세 뷰
│   │   ├── ChatListView.jsx     # 채팅 목록 뷰
│   │   ├── ChatDetailView.jsx   # 채팅 상세 뷰 (자동 스크롤)
│   │   ├── BottomNav.jsx        # 하단 네비게이션
│   │   └── Toast.jsx            # 토스트 알림 컴포넌트
│   ├── data/                    # 데이터
│   │   └── profiles.js          # 샘플 프로필 데이터
│   ├── main.jsx                 # 앱 엔트리 포인트
│   └── index.css                # 전역 스타일 + 애니메이션
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 기술 스택

- **React 18** - UI 프레임워크 (Hooks: useState, useEffect, useRef)
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Lucide React** - 아이콘
- **localStorage** - 클라이언트 사이드 데이터 저장

## 📝 사용법

### 1. **회원가입 / 로그인**
   - 앱 실행 시 로그인 화면이 표시됩니다
   - 데모 계정으로 로그인하거나 새로운 계정을 생성하세요
   - 회원가입 시 이름, 나이, 지역, 직업, 자기소개를 입력할 수 있습니다

### 2. **프로필 탐색**
   - 하단 네비게이션에서 '프로필' 탭 선택
   - 프로필 카드를 클릭하면 상세 정보 확인
   - X 버튼으로 패스, 하트 버튼으로 좋아요
   - **터치 제스처**: 카드를 좌우로 드래그하여 좋아요/패스 (오른쪽: 좋아요, 왼쪽: 패스)

### 3. **채팅**
   - 매칭되면 토스트 알림과 함께 '메시지' 탭에 알림 표시
   - 매칭된 사람을 클릭하여 대화 시작
   - 메시지를 입력하고 전송 (Enter 키 또는 전송 버튼)
   - 메시지는 자동으로 스크롤되어 최신 메시지가 표시됩니다

### 4. **내 정보**
   - 하단 네비게이션에서 '내정보' 탭 선택
   - 가입한 프로필 정보 확인
   - 로그아웃 버튼으로 로그아웃

### 5. **데이터 저장**
   - 모든 좋아요, 패스, 매칭, 채팅, 사용자 정보가 자동으로 저장됩니다
   - 브라우저를 닫았다 열어도 데이터가 유지됩니다

## 🔧 커스터마이징

### 프로필 데이터 추가

`src/data/profiles.js` 파일을 수정하여 프로필을 추가하거나 변경할 수 있습니다:

```javascript
{
  id: 7,
  name: "이름",
  age: 나이,
  location: "위치",
  job: "직업",
  bio: "소개글",
  image: "이미지 URL",
  interests: ["관심사1", "관심사2"]
}
```

### 스타일 변경

`tailwind.config.js`에서 테마를 수정하거나 `src/index.css`에서 전역 스타일을 변경할 수 있습니다.

## 📄 라이선스

MIT

## 👨‍💻 개발자

React + Vite + Tailwind CSS로 제작되었습니다.


## ⚠️ 보안 주의사항

**이 앱은 데모/학습용으로 제작되었습니다. 실제 프로덕션 환경에서는 사용하지 마세요!**

현재 구현의 제한사항:
- ❌ 비밀번호가 **평문**으로 localStorage에 저장됨
- ❌ 백엔드 서버 없이 클라이언트만으로 인증 처리
- ❌ HTTPS 암호화 없음
- ❌ SQL Injection, XSS 등 보안 취약점 방어 부족

### 실제 프로덕션 환경을 위한 권장사항:

1. **백엔드 API 구축**
   - Node.js + Express, Django, Spring Boot 등
   - 데이터베이스: PostgreSQL, MongoDB 등

2. **인증 시스템 강화**
   - bcrypt, argon2 등으로 비밀번호 해싱
   - JWT 또는 세션 기반 인증
   - OAuth 2.0 / Social Login (Google, Kakao 등)

3. **보안 강화**
   - HTTPS 필수
   - CSRF 토큰
   - Rate Limiting
   - Input Validation & Sanitization

4. **인프라**
   - CDN 사용
   - 로드 밸런싱
   - 데이터베이스 백업

## 🎓 학습 목적

이 프로젝트는 다음을 배우기 위한 데모 앱입니다:
- React Hooks (useState, useEffect, useRef)
- 컴포넌트 기반 아키텍처
- localStorage를 활용한 상태 관리
- 사용자 인증 플로우 (프론트엔드)
- 반응형 디자인 & UI/UX
