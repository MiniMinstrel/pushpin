import { firebaseApp } from './firebase-config';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const db = getFirestore(firebaseApp);
const boardsCollectionRef = collection(db, 'boards');

const createBoard = (owner, name) => {
  addDoc(boardsCollectionRef, {
    name: name,
    ownerName: owner.displayName,
    ownerId: owner.uid,
  });
};

const createPost = (boardId, name, description) => {
  const postsCollectionRef = collection(db, `boards/${boardId}/posts`);
  addDoc(postsCollectionRef, {
    name: name,
    description: description,
  });
};

const deletePost = (boardId, postId) => {
  const docRef = doc(db, `boards/${boardId}/posts/${postId}`);
  deleteDoc(docRef);
};

const deleteBoard = async (boardId) => {
  try {
    // deleting all posts
    const postsRef = collection(db, `boards/${boardId}/posts`);
    const postsRes = await getDocs(postsRef);
    postsRes.forEach((post) => {
      deletePost(boardId, post.id);
    });

    // deleting board
    const boardRef = doc(db, `boards/${boardId}`);
    deleteDoc(boardRef);
  } catch (err) {
    console.error(err.message);
  }
};

const getBoardsByOwnerId = async (ownerId) => {
  const query = query(boardsCollectionRef, where('ownerId', '===', ownerId));
  const boardsRes = await getDocs(query);
  boardsRes.forEach((board) => {
    console.log(board.data());
  });
};

export { createBoard, createPost, deletePost, deleteBoard, getBoardsByOwnerId };
