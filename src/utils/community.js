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
  limit,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ===== 게시글 함수 =====

// 게시글 작성
export const createPost = async (userId, userName, postData) => {
  try {
    const postRef = doc(collection(db, 'posts'));
    await setDoc(postRef, {
      id: postRef.id,
      userId,
      userName,
      title: postData.title,
      content: postData.content,
      category: postData.category || 'general', // general, dating, tips, chat
      likes: 0,
      commentCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, postId: postRef.id };
  } catch (error) {
    console.error('Create post error:', error);
    return { success: false, message: '게시글 작성 중 오류가 발생했습니다' };
  }
};

// 게시글 목록 가져오기
export const getPosts = async (category = null, limitCount = 20) => {
  try {
    let q;
    if (category && category !== 'all') {
      q = query(
        collection(db, 'posts'),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, posts };
  } catch (error) {
    console.error('Get posts error:', error);
    return { success: false, message: '게시글을 가져오는 중 오류가 발생했습니다', posts: [] };
  }
};

// 게시글 상세 가져오기
export const getPost = async (postId) => {
  try {
    const postDoc = await getDoc(doc(db, 'posts', postId));
    if (postDoc.exists()) {
      return { success: true, post: { id: postDoc.id, ...postDoc.data() } };
    }
    return { success: false, message: '게시글을 찾을 수 없습니다' };
  } catch (error) {
    console.error('Get post error:', error);
    return { success: false, message: '게시글을 가져오는 중 오류가 발생했습니다' };
  }
};

// 게시글 수정
export const updatePost = async (postId, userId, postData) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return { success: false, message: '게시글을 찾을 수 없습니다' };
    }

    if (postDoc.data().userId !== userId) {
      return { success: false, message: '수정 권한이 없습니다' };
    }

    await updateDoc(postRef, {
      title: postData.title,
      content: postData.content,
      category: postData.category,
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Update post error:', error);
    return { success: false, message: '게시글 수정 중 오류가 발생했습니다' };
  }
};

// 게시글 삭제
export const deletePost = async (postId, userId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return { success: false, message: '게시글을 찾을 수 없습니다' };
    }

    if (postDoc.data().userId !== userId) {
      return { success: false, message: '삭제 권한이 없습니다' };
    }

    // 게시글의 모든 댓글도 삭제
    const commentsQuery = query(collection(db, 'posts', postId, 'comments'));
    const commentsSnapshot = await getDocs(commentsQuery);
    const deletePromises = commentsSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // 게시글 삭제
    await deleteDoc(postRef);

    return { success: true };
  } catch (error) {
    console.error('Delete post error:', error);
    return { success: false, message: '게시글 삭제 중 오류가 발생했습니다' };
  }
};

// 게시글 좋아요
export const likePost = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: increment(1)
    });
    return { success: true };
  } catch (error) {
    console.error('Like post error:', error);
    return { success: false, message: '좋아요 중 오류가 발생했습니다' };
  }
};

// ===== 댓글 함수 =====

// 댓글 작성
export const createComment = async (postId, userId, userName, content) => {
  try {
    const commentRef = doc(collection(db, 'posts', postId, 'comments'));
    await setDoc(commentRef, {
      id: commentRef.id,
      userId,
      userName,
      content,
      createdAt: serverTimestamp()
    });

    // 게시글의 댓글 수 증가
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentCount: increment(1)
    });

    return { success: true, commentId: commentRef.id };
  } catch (error) {
    console.error('Create comment error:', error);
    return { success: false, message: '댓글 작성 중 오류가 발생했습니다' };
  }
};

// 댓글 목록 가져오기
export const getComments = async (postId) => {
  try {
    const q = query(
      collection(db, 'posts', postId, 'comments'),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, comments };
  } catch (error) {
    console.error('Get comments error:', error);
    return { success: false, message: '댓글을 가져오는 중 오류가 발생했습니다', comments: [] };
  }
};

// 댓글 삭제
export const deleteComment = async (postId, commentId, userId) => {
  try {
    const commentRef = doc(db, 'posts', postId, 'comments', commentId);
    const commentDoc = await getDoc(commentRef);

    if (!commentDoc.exists()) {
      return { success: false, message: '댓글을 찾을 수 없습니다' };
    }

    if (commentDoc.data().userId !== userId) {
      return { success: false, message: '삭제 권한이 없습니다' };
    }

    await deleteDoc(commentRef);

    // 게시글의 댓글 수 감소
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentCount: increment(-1)
    });

    return { success: true };
  } catch (error) {
    console.error('Delete comment error:', error);
    return { success: false, message: '댓글 삭제 중 오류가 발생했습니다' };
  }
};

// 내가 작성한 게시글 가져오기
export const getMyPosts = async (userId) => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, posts };
  } catch (error) {
    console.error('Get my posts error:', error);
    return { success: false, message: '내 게시글을 가져오는 중 오류가 발생했습니다', posts: [] };
  }
};
