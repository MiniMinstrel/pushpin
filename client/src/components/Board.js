import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import DeleteBoardButton from './DeleteBoardButton';

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
    <>
      <h1 id='board-name'>{board.name}</h1>
      <p id='board-owner'>
        By <span className='orange'>{board.ownerName}</span>
      </p>

      <div id='posts-grid'>
        {board.posts &&
          board.posts.map((post) => {
            return <Post post={post} key={post.postId} />;
          })}

        {user && user.uid === board.ownerId && (
          <>
            <CreatePostButton
              boardId={board.boardId}
              onClickFunc={updateBoard}
            />
            <DeleteBoardButton boardId={board.boardId} />
          </>
        )}
      </div>
    </>
  );
};

export default Board;
