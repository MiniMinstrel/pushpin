import { Navigate } from 'react-router-dom';

import {
  createBoard,
  createPost,
  deletePost,
  deleteBoard,
  getBoard,
  getBoardsByOwnerId,
  deleteAllBoards,
} from '../firebase/firebase-db';

const Dashboard = ({ user }) => {
  // go to login if user not logged in
  if (!user) return <Navigate to='/' replace={true} />;

  return (
    <div id='dashboard'>
      <p>
        Welcome to your dashboard,{' '}
        <span className='orange'>{user.displayName}</span>! This is where the
        magic happens!
      </p>

      <button
        onClick={() =>
          createBoard(user.displayName, user.uid, 'some cool name')
        }
      >
        Create da new board
      </button>
      <button
        onClick={() =>
          createPost('Cb5a1GTCcP9j9HKkoLWA', 'name', 'desciptiano')
        }
      >
        create da post
      </button>
      <button onClick={() => getBoardsByOwnerId(user.uid)}>
        get yo boards
      </button>
      <button onClick={() => deleteAllBoards()}>Delete all boards</button>
      <button onClick={() => getBoard('Cb5a1GTCcP9j9HKkoLWA')}>
        get da board
      </button>
    </div>
  );
};

export default Dashboard;
