import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// 사용자의 좋아요한 프로필 저장
export const saveLikedProfile = async (userId, profileId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      likedProfiles: arrayUnion(profileId)
    });
    return { success: true };
  } catch (error) {
    console.error('Save liked profile error:', error);
    return { success: false, message: '좋아요 저장 중 오류가 발생했습니다' };
  }
};

// 사용자의 패스한 프로필 저장
export const savePassedProfile = async (userId, profileId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      passedProfiles: arrayUnion(profileId)
    });
    return { success: true };
  } catch (error) {
    console.error('Save passed profile error:', error);
    return { success: false, message: '패스 저장 중 오류가 발생했습니다' };
  }
};

// 매칭 생성
export const createMatch = async (userId, matchedProfile) => {
  try {
    const matchId = `${userId}_${matchedProfile.id}`;
    await setDoc(doc(db, 'matches', matchId), {
      userId,
      matchedProfileId: matchedProfile.id,
      matchedProfile,
      createdAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Create match error:', error);
    return { success: false, message: '매칭 저장 중 오류가 발생했습니다' };
  }
};

// 사용자의 매칭 목록 가져오기
export const getMatches = async (userId) => {
  try {
    const q = query(
      collection(db, 'matches'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const matches = [];
    querySnapshot.forEach((doc) => {
      matches.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, matches };
  } catch (error) {
    console.error('Get matches error:', error);
    return { success: false, message: '매칭 목록을 가져오는 중 오류가 발생했습니다', matches: [] };
  }
};

// 채팅 메시지 저장
export const saveMessage = async (userId, matchId, message) => {
  try {
    const messagesRef = collection(db, 'matches', matchId, 'messages');
    await setDoc(doc(messagesRef), {
      ...message,
      createdAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Save message error:', error);
    return { success: false, message: '메시지 저장 중 오류가 발생했습니다' };
  }
};

// 채팅 메시지 가져오기
export const getMessages = async (matchId) => {
  try {
    const q = query(
      collection(db, 'matches', matchId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, messages };
  } catch (error) {
    console.error('Get messages error:', error);
    return { success: false, message: '메시지를 가져오는 중 오류가 발생했습니다', messages: [] };
  }
};

// 사용자 데이터 초기화 (좋아요/패스 목록 추가)
export const initializeUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (!data.likedProfiles || !data.passedProfiles) {
        await updateDoc(userRef, {
          likedProfiles: data.likedProfiles || [],
          passedProfiles: data.passedProfiles || []
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error('Initialize user data error:', error);
    return { success: false };
  }
};

// 사용자의 액션 데이터 가져오기
export const getUserActions = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        success: true,
        likedProfiles: data.likedProfiles || [],
        passedProfiles: data.passedProfiles || []
      };
    }
    return {
      success: false,
      likedProfiles: [],
      passedProfiles: []
    };
  } catch (error) {
    console.error('Get user actions error:', error);
    return {
      success: false,
      likedProfiles: [],
      passedProfiles: []
    };
  }
};
