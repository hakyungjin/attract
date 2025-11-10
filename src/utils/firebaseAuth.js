import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// 현재 로그인한 사용자 가져오기
export const getCurrentUser = () => {
  return auth.currentUser;
};

// 인증 상태 변경 감지
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// 회원가입
export const signup = async (userData) => {
  try {
    // Firebase Authentication으로 사용자 생성
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;

    // 사용자 프로필 업데이트
    await updateProfile(user, {
      displayName: userData.name
    });

    // Firestore에 추가 사용자 정보 저장
    await setDoc(doc(db, 'users', user.uid), {
      email: userData.email,
      name: userData.name,
      age: userData.age || null,
      location: userData.location || '',
      job: userData.job || '',
      bio: userData.bio || '',
      createdAt: new Date().toISOString()
    });

    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        name: userData.name,
        age: userData.age,
        location: userData.location,
        job: userData.job,
        bio: userData.bio
      }
    };
  } catch (error) {
    console.error('Signup error:', error);

    let message = '회원가입 중 오류가 발생했습니다';
    if (error.code === 'auth/email-already-in-use') {
      message = '이미 가입된 이메일입니다';
    } else if (error.code === 'auth/weak-password') {
      message = '비밀번호는 6자 이상이어야 합니다';
    } else if (error.code === 'auth/invalid-email') {
      message = '유효하지 않은 이메일 형식입니다';
    }

    return { success: false, message };
  }
};

// 로그인
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Firestore에서 추가 사용자 정보 가져오기
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        name: userData?.name || user.displayName,
        age: userData?.age,
        location: userData?.location,
        job: userData?.job,
        bio: userData?.bio,
        createdAt: userData?.createdAt
      }
    };
  } catch (error) {
    console.error('Login error:', error);

    let message = '로그인 중 오류가 발생했습니다';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      message = '이메일 또는 비밀번호가 일치하지 않습니다';
    } else if (error.code === 'auth/invalid-email') {
      message = '유효하지 않은 이메일 형식입니다';
    } else if (error.code === 'auth/too-many-requests') {
      message = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요';
    }

    return { success: false, message };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: '로그아웃 중 오류가 발생했습니다' };
  }
};

// 사용자 프로필 업데이트
export const updateUserProfile = async (updates) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, message: '로그인이 필요합니다' };
    }

    // Firestore 업데이트
    await setDoc(doc(db, 'users', user.uid), updates, { merge: true });

    // displayName 업데이트
    if (updates.name) {
      await updateProfile(user, {
        displayName: updates.name
      });
    }

    // 업데이트된 사용자 정보 가져오기
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    return {
      success: true,
      user: {
        id: user.uid,
        email: user.email,
        ...userData
      }
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, message: '프로필 업데이트 중 오류가 발생했습니다' };
  }
};

// 사용자 데이터 가져오기
export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    }
    return { success: false, message: '사용자를 찾을 수 없습니다' };
  } catch (error) {
    console.error('Get user data error:', error);
    return { success: false, message: '사용자 정보를 가져오는 중 오류가 발생했습니다' };
  }
};
