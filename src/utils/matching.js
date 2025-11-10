import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// 매칭 요청 전송
export const sendMatchRequest = async (fromUserId, toProfile) => {
  try {
    const requestId = `${fromUserId}_${toProfile.id}`;
    await setDoc(doc(db, 'matchRequests', requestId), {
      fromUserId,
      toUserId: toProfile.id,
      toProfile,
      status: 'pending', // pending, accepted, rejected
      createdAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Send match request error:', error);
    return { success: false, message: '매칭 요청 전송 중 오류가 발생했습니다' };
  }
};

// 받은 매칭 요청 목록 가져오기
export const getReceivedMatchRequests = async (userId) => {
  try {
    const q = query(
      collection(db, 'matchRequests'),
      where('toUserId', '==', userId),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, requests };
  } catch (error) {
    console.error('Get match requests error:', error);
    return { success: false, message: '매칭 요청을 가져오는 중 오류가 발생했습니다', requests: [] };
  }
};

// 보낸 매칭 요청 목록 가져오기
export const getSentMatchRequests = async (userId) => {
  try {
    const q = query(
      collection(db, 'matchRequests'),
      where('fromUserId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const requests = [];
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, requests };
  } catch (error) {
    console.error('Get sent requests error:', error);
    return { success: false, message: '보낸 요청을 가져오는 중 오류가 발생했습니다', requests: [] };
  }
};

// 매칭 요청 수락
export const acceptMatchRequest = async (requestId, fromUser, toUserId) => {
  try {
    // 요청 상태를 accepted로 변경
    await updateDoc(doc(db, 'matchRequests', requestId), {
      status: 'accepted',
      acceptedAt: serverTimestamp()
    });

    // 양방향 매칭 생성
    const match1Id = `${fromUser.id}_${toUserId}`;
    const match2Id = `${toUserId}_${fromUser.id}`;

    await setDoc(doc(db, 'matches', match1Id), {
      userId: fromUser.id,
      matchedUserId: toUserId,
      matchedProfile: fromUser,
      createdAt: serverTimestamp()
    });

    await setDoc(doc(db, 'matches', match2Id), {
      userId: toUserId,
      matchedUserId: fromUser.id,
      matchedProfile: fromUser,
      createdAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Accept match request error:', error);
    return { success: false, message: '매칭 수락 중 오류가 발생했습니다' };
  }
};

// 매칭 요청 거절
export const rejectMatchRequest = async (requestId) => {
  try {
    await updateDoc(doc(db, 'matchRequests', requestId), {
      status: 'rejected',
      rejectedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Reject match request error:', error);
    return { success: false, message: '매칭 거절 중 오류가 발생했습니다' };
  }
};

// 매칭 취소 (보낸 요청 취소)
export const cancelMatchRequest = async (requestId) => {
  try {
    await deleteDoc(doc(db, 'matchRequests', requestId));
    return { success: true };
  } catch (error) {
    console.error('Cancel match request error:', error);
    return { success: false, message: '요청 취소 중 오류가 발생했습니다' };
  }
};

// 매칭 상태 확인
export const checkMatchStatus = async (userId, targetUserId) => {
  try {
    const requestId = `${userId}_${targetUserId}`;
    const requestDoc = await getDoc(doc(db, 'matchRequests', requestId));

    if (requestDoc.exists()) {
      return { exists: true, status: requestDoc.data().status };
    }
    return { exists: false, status: null };
  } catch (error) {
    console.error('Check match status error:', error);
    return { exists: false, status: null };
  }
};
