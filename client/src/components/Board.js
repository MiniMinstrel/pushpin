import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';
import { useNavigate } from 'react-router-dom';
import Post from './Post';

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
      <div id='posts-grid'>
        {board.posts && board.posts.map((post) => {
          return <Post post={post} key={post.postId} />;
        })}
        <CreatePostButton boardId={board.boardId} onClickFunc={updateBoard} />
      </div>
    </>
  );
};

export default Board;
