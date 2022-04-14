import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBoard } from '../firebase/firebase-db';
import CreatePostButton from './CreatePostButton';

const Board = ({ user }) => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();

  const fetchBoard = async () => {
    const boardRes = await getBoard(boardId);
    return boardRes;
  };
  
  useEffect(() => {
    let isMounted = true;
    fetchBoard().then((res) => {
      if (isMounted) setBoard(res);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className='board-page'>{JSON.stringify(board)}</div>
      <CreatePostButton boardId={board.boardId} onClickFunc={fetchBoard} />
    </>
  );
};

export default Board;
