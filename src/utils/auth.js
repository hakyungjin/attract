// 간단한 프론트엔드 인증 시스템
// 주의: 실제 프로덕션에서는 백엔드 API를 사용해야 합니다!

const USERS_KEY = 'dating_app_users';
const CURRENT_USER_KEY = 'dating_app_current_user';

// 사용자 목록 가져오기
export const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

// 사용자 목록 저장
const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// 현재 로그인한 사용자 가져오기
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading current user:', error);
    return null;
  }
};

// 현재 사용자 저장
const setCurrentUser = (user) => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving current user:', error);
  }
};

// 회원가입
export const signup = (userData) => {
  const users = getUsers();

  // 이메일 중복 체크
  const existingUser = users.find(u => u.email === userData.email);
  if (existingUser) {
    return { success: false, message: '이미 가입된 이메일입니다' };
  }

  // 새 사용자 생성
  const newUser = {
    id: Date.now(),
    email: userData.email,
    password: userData.password, // 실제로는 암호화해야 함!
    name: userData.name,
    age: userData.age || null,
    location: userData.location || '',
    job: userData.job || '',
    bio: userData.bio || '',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  // 자동 로그인
  const { password, ...userWithoutPassword } = newUser;
  setCurrentUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
};

// 로그인
export const login = (email, password) => {
  const users = getUsers();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: '이메일 또는 비밀번호가 일치하지 않습니다' };
  }

  const { password: _, ...userWithoutPassword } = user;
  setCurrentUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
};

// 로그아웃
export const logout = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false };
  }
};

// 데모 사용자 생성
export const createDemoUser = () => {
  const users = getUsers();
  const demoEmail = 'demo@example.com';

  // 이미 데모 사용자가 있는지 체크
  const existingDemo = users.find(u => u.email === demoEmail);
  if (existingDemo) {
    return;
  }

  const demoUser = {
    id: 1,
    email: demoEmail,
    password: 'password',
    name: '데모',
    age: 25,
    location: '서울 강남구',
    job: '개발자',
    bio: '안녕하세요! 데모 계정입니다.',
    createdAt: new Date().toISOString()
  };

  users.push(demoUser);
  saveUsers(users);
};

// 사용자 프로필 업데이트
export const updateUserProfile = (updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, message: '로그인이 필요합니다' };
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);

  if (userIndex === -1) {
    return { success: false, message: '사용자를 찾을 수 없습니다' };
  }

  // 사용자 정보 업데이트
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);

  // 현재 사용자 정보도 업데이트
  const { password: _, ...userWithoutPassword } = users[userIndex];
  setCurrentUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
};
