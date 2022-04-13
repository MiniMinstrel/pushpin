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

const createBoard = async (ownerName, ownerId, name) => {
  const board = await addDoc(boardsCollectionRef, {
    ownerName: ownerName,
    ownerId: ownerId,
    name: name,
  });

  return board.id;
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
  let boardsList = [];
  const q = query(boardsCollectionRef, where('ownerId', '==', ownerId));
  const boardsRes = await getDocs(q);

  // extracting posts
  boardsRes.forEach(async (board) => {
    let boardObj = {
      boardId: board.id,
      ...board.data(),
      posts: [],
    };

    const postsRef = collection(db, `boards/${board.id}/posts`);
    const postsRes = await getDocs(postsRef);

    postsRes.forEach((post) => {
      boardObj.posts.push({ postId: post.id, ...post.data() });
    });

    boardsList.push(boardObj);
  });

  return boardsList;
};

const deleteAllBoards = async () => {
  const boardsRes = await getDocs(boardsCollectionRef);

  console.log(boardsRes);

  boardsRes.forEach((board) => {
    deleteBoard(board.id);
  })
}

export { createBoard, createPost, deletePost, deleteBoard, getBoardsByOwnerId, deleteAllBoards };
