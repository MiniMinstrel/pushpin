import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';

const Board = ({ user }) => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();

  const fetchBoard = async () => {
    if (!user) return;
    const boardRes = await getBoard(boardId);
    setBoard(boardRes);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return <div className='board-page'>{JSON.stringify(board)}</div>;
};

export default Board;
