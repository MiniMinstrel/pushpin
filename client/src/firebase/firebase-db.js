import { firebaseApp } from './firebase-config';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

const db = getFirestore(firebaseApp);
const boardsCollectionRef = collection(db, 'boards');

// ==============================================
// creates a board in Firebase with input 
// parameters representing the name of the board 
// owner, the id number of the owner, and the
// name of the board respectively
// ==============================================
const createBoard = async (ownerName, ownerId, name) => {
  const board = await addDoc(boardsCollectionRef, {
    ownerName: ownerName,
    ownerId: ownerId,
    name: name,
  });

  return board.id;
};

// ==============================================
// creates a post inside of the board with the 
// matching boardId in Firebase with the input 
// parameters representing the name of the post
// and the post description
// ==============================================
const createPost = (boardId, name, description) => {
  const postsCollectionRef = collection(db, `boards/${boardId}/posts`);
  addDoc(postsCollectionRef, {
    name: name,
    description: description,
  });
};

// ==============================================
// deletes the post with the matching postId 
// inside the board with the matching boardId
// ==============================================
const deletePost = (boardId, postId) => {
  const docRef = doc(db, `boards/${boardId}/posts/${postId}`);
  deleteDoc(docRef);
};

// ==============================================
// deletes the board with the matching boardId
// ==============================================
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

// ==============================================
// gets a board from Firebase with the matching
// boardId and returns a structured object
// containing the board id, board name, board
// owner name, board owner id, and a list of 
// post objects contained within the board each
// containing the post id, post name, and post
// description
// ==============================================
const getBoard = async (boardId) => {
  const boardRef = doc(db, `boards/${boardId}`);
  const board = await getDoc(boardRef);

  let boardObj = {
    boardId: boardId,
    ...board.data(),
    posts: [],
  };

  const postsRef = collection(db, `boards/${boardId}/posts`);
  const postsRes = await getDocs(postsRef);

  postsRes.forEach((post) => {
    boardObj.posts.push({ postId: post.id, ...post.data() });
  });

  return boardObj;
};

// ==============================================
// gets all boards whose ownerId property matches
// the input ownerId and returns a board object 
// that contains the board posts as well
// ==============================================
const getBoardsByOwnerId = async (ownerId) => {
  let boardsList = [];
  const q = query(boardsCollectionRef, where('ownerId', '==', ownerId));
  const boardsRes = await getDocs(q);

  // extracting posts
  boardsRes.forEach(async (board) => {
    let boardObj = await getBoard(board.id);
    boardsList.push(boardObj);
  });

  return boardsList;
};

// ==============================================
// same as getBoardsByOwnerId function but the
// returned boards do not contain the posts
// ==============================================
const getBoardsByOwnerIdNoPosts = async (ownerId) => {
  let boardsList = [];
  const q = query(boardsCollectionRef, where('ownerId', '==', ownerId));
  const boardsRes = await getDocs(q);

  boardsRes.forEach((board) => {
    const boardObj = {
      boardId: board.id,
      ...board.data(),
    };

    boardsList.push(boardObj);
  });

  return boardsList;
};

// ==============================================
// gets all the boards whose name and/or owner
// name EXACTLY match the queryParam
//
// in general, this fetches significantly less
// items than getBoardsByQueryContains since
// firebase does all the board filtering 
// themselves
// ==============================================
const getBoardsByQueryExact = async (queryParam) => {
  const qBoardName = query(
    boardsCollectionRef,
    where('name', '==', queryParam)
  );

  const qOwnerName = query(
    boardsCollectionRef,
    where('ownerName', '==', queryParam)
  );

  const boardNameRes = await getDocs(qBoardName);
  const ownerNameRes = await getDocs(qOwnerName);

  let boardsList = [];

  boardNameRes.forEach((board) => {
    const boardObj = {
      boardId: board.id,
      ...board.data(),
    };

    boardsList.push(boardObj);
  });

  ownerNameRes.forEach((board) => {
    const boardObj = {
      boardId: board.id,
      ...board.data(),
    };

    boardsList.push(boardObj);
  });

  return boardsList;
};

// ==============================================
// gets all the boards whose name and/or owner
// contains the queryParam
// 
// this initially grabs EVERY single board from
// Firebase and filters afterward (not optimal)
// ==============================================
const getBoardsByQueryContains = async (queryParam) => {
  let boardsList = [];
  const boardsRes = await getDocs(boardsCollectionRef);
  boardsRes.forEach((board) => {
    const boardData = board.data();
    if (
      boardData.ownerName.search(queryParam) !== -1 ||
      boardData.name.search(queryParam) !== -1
    ) {
      const boardObj = {
        boardId: board.id,
        ...boardData,
      };

      boardsList.push(boardObj);
    }
  });

  return boardsList;
};

export {
  createBoard,
  createPost,
  deletePost,
  deleteBoard,
  getBoard,
  getBoardsByOwnerId,
  getBoardsByOwnerIdNoPosts,
  getBoardsByQueryExact,
  getBoardsByQueryContains,
};
