import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';

import { useNavigate } from 'react-router-dom';

const Board = ({ user }) => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();

  const navigate = useNavigate();

  const fetchBoard = async () => {
    const boardRes = await getBoard(boardId);
    return boardRes;
  };

  const checkUser = async () => {
    const userState = await user;
    if (!userState) navigate('/');
  };

  useEffect(() => {
    let isMounted = true;
    fetchBoard().then((res) => {
      if (isMounted) setBoard(res);
    });

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <>
      <div className='board-page'>{JSON.stringify(board)}</div>
      <CreatePostButton boardId={board.boardId} onClickFunc={fetchBoard} />
    </>
  );
};

export default Board;
