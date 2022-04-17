import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import DeleteBoardButton from './DeleteBoardButton';
import { AiFillEdit } from 'react-icons/ai';

const Board = ({ user }) => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();

  const fetchBoard = async () => {
    const boardRes = await getBoard(boardId);
    return boardRes;
  };

  const updateBoard = async () => {
    const boardRes = await getBoard(boardId);
    setBoard({ ...boardRes });
  };

  const checkUser = async () => {
    const userState = await user;
    if (!userState) navigate('/');
  };

  useEffect(() => {
    checkUser();

    let isMounted = true;
    fetchBoard().then((res) => {
      if (isMounted) setBoard({ ...res });
    });

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div id='board-container'>
      <h1 id='board-name'>{board.name}</h1>
      <p id='board-owner'>
        By <span className='orange'>{board.ownerName}</span>
      </p>

      {user && user.uid === board.ownerId && (
        <p>
          You own this board, so feel free to edit! <AiFillEdit />
        </p>
      )}

      <div id='posts-grid'>
        {board.posts &&
          board.posts.map((post) => {
            return (
              <Post
                post={post}
                user={user}
                boardOwnerId={board.ownerId}
                updateBoardFunc={updateBoard}
                key={post.postId}
              />
            );
          })}

        {user && user.uid === board.ownerId && (
          <>
            <CreatePostButton
              boardId={board.boardId}
              updateBoardFunc={updateBoard}
            />
            <DeleteBoardButton boardId={board.boardId} />
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
