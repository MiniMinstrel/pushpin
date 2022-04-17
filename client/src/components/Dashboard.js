import { Navigate } from 'react-router-dom';
import { getBoardsByOwnerIdNoPosts } from '../firebase/firebase-db';
import { useState, useEffect } from 'react';
import CreateBoardButton from './CreateBoardButton';
import BoardPreviewButton from './BoardPreviewButton';

const Dashboard = ({ user }) => {
  const [boards, setBoards] = useState([]);

  const fetchBoards = async () => {
    const boardsRes = await getBoardsByOwnerIdNoPosts(user.uid);
    setBoards([...boardsRes]);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  // go to login if user not logged in
  if (!user) return <Navigate to='/' replace={true} />;

  return (
    <div id='dashboard'>
      <p>
        Welcome to your dashboard,{' '}
        <span className='orange'>{user.displayName}</span>! This is where the
        magic happens!
      </p>

      <div id='dashboard-boards'>
        {boards.map((board) => {
          return <BoardPreviewButton key={board.boardId} board={board} />;
        })}
        <CreateBoardButton user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
