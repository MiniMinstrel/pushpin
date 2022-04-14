import { Navigate } from 'react-router-dom';
import { getBoardsByOwnerId } from '../firebase/firebase-db';
import { useState, useEffect } from 'react';
import CreateUserButton from './CreateBoardButton';
import BoardPreviewButton from './BoardPreviewButton';

const Dashboard = ({ user }) => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    (async () => {
      if (user) {
        const boardsRes = await getBoardsByOwnerId(user.uid);
        setBoards([...boardsRes]);
      }
    })();
  }, [user]);

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
          return <BoardPreviewButton board={board} />;
        })}
        <CreateUserButton user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
