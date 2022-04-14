import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';
import { useNavigate } from 'react-router-dom';

import { Navigate } from 'react-router-dom';

const Board = ({ user }) => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();

  
  const fetchBoard = async () => {
    if (!user) navigate('/');
    if (!user) return;
    const boardRes = await getBoard(boardId);
    setBoard(boardRes);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  if (!user) return <Navigate to='/' replace={true} />

  return (
    <>
      <div className='board-page'>{JSON.stringify(board)}</div>
      <CreatePostButton boardId={board.boardId} onClickFunc={fetchBoard} />
    </>
  );
};

export default Board;
