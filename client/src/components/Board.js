import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';
import { useNavigate } from 'react-router-dom';

const Board = ({ user }) => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();

  if (!user) navigate('/');
  
  const fetchBoard = async () => {
    if (!user) return;
    const boardRes = await getBoard(boardId);
    setBoard(boardRes);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <>
      <div className='board-page'>{JSON.stringify(board)}</div>
      <CreatePostButton boardId={board.boardId} />
    </>
  );
};

export default Board;
