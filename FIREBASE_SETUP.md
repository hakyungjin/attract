# Firebase 설정 가이드

이 앱에 Firebase를 연동하여 실제 클라우드 데이터베이스를 사용하는 방법입니다.

## 📋 사전 요구사항

- Google 계정
- Node.js 설치
- 이 프로젝트를 로컬에 클론

## 🚀 Firebase 프로젝트 생성

### 1. Firebase Console 접속

https://console.firebase.google.com/ 에 접속하여 Google 계정으로 로그인합니다.

### 2. 새 프로젝트 생성

1. "프로젝트 추가" 버튼 클릭
2. 프로젝트 이름 입력 (예: `dating-app`)
3. Google 애널리틱스 설정 (선택사항)
4. "프로젝트 만들기" 클릭

### 3. 웹 앱 추가

1. 프로젝트 개요 페이지에서 **웹 아이콘(</>)** 클릭
2. 앱 닉네임 입력 (예: `Dating App Web`)
3. Firebase Hosting 체크박스는 선택하지 않아도 됩니다
4. "앱 등록" 클릭
5. **firebaseConfig 객체를 복사**해둡니다

## 🔧 프로젝트 설정

### 1. 환경 변수 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

### 2. Firebase Config 정보 입력

복사한 firebaseConfig 정보를 `.env` 파일에 입력합니다:

```env
VITE_FIREBASE_API_KEY=AIzaSyC...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## 🔐 Firebase Authentication 설정

### 1. Authentication 활성화

1. Firebase Console에서 **Authentication** 메뉴 클릭
2. "시작하기" 버튼 클릭
3. **로그인 방법** 탭 선택
4. **이메일/비밀번호** 클릭
5. 사용 설정 토글을 켭니다
6. "저장" 클릭

## 📦 Firestore 데이터베이스 설정

### 1. Firestore 생성

1. Firebase Console에서 **Firestore Database** 메뉴 클릭
2. "데이터베이스 만들기" 버튼 클릭
3. **프로덕션 모드**로 시작 (권장)
4. Cloud Firestore 위치 선택 (asia-northeast3 - 서울 권장)
5. "사용 설정" 클릭

### 2. 보안 규칙 설정

**규칙** 탭에서 다음과 같이 설정합니다:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 문서: 본인만 읽기/쓰기 가능
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 매칭 문서: 본인이 속한 매칭만 읽기/쓰기 가능
    match /matches/{matchId} {
      allow read, write: if request.auth != null &&
        (matchId.split('_')[0] == request.auth.uid);

      // 매칭 내 메시지
      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

## 📱 앱 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 확인

http://localhost:5173 에 접속하여 회원가입/로그인을 테스트합니다.

## ✅ 확인사항

Firebase가 제대로 동작하는지 확인:

1. **회원가입**: 새 계정을 만들어봅니다
2. **Firebase Console** → **Authentication** → **Users**에서 사용자가 추가되었는지 확인
3. **Firestore Database**에서 `users` 컬렉션에 데이터가 저장되었는지 확인
4. **로그인**: 생성한 계정으로 로그인해봅니다
5. **프로필 좋아요/패스**: Firestore에 데이터가 저장되는지 확인

## 🔥 Firebase 기능 활용

이 앱은 다음 Firebase 기능을 사용합니다:

- ✅ **Firebase Authentication**: 이메일/비밀번호 인증
- ✅ **Cloud Firestore**: 사용자 프로필, 매칭, 채팅 데이터 저장
- ⏳ **Firebase Storage** (추가 예정): 프로필 이미지 업로드
- ⏳ **Firebase Cloud Messaging** (추가 예정): 푸시 알림

## 🆘 문제 해결

### "Firebase: Error (auth/configuration-not-found)"
→ `.env` 파일이 제대로 설정되었는지 확인하세요.

### "Missing or insufficient permissions"
→ Firestore 보안 규칙이 제대로 설정되었는지 확인하세요.

### "Failed to get document because the client is offline"
→ 인터넷 연결을 확인하세요.

## 📚 참고 자료

- [Firebase 공식 문서](https://firebase.google.com/docs)
- [Firestore 보안 규칙](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
