import { Navigate } from 'react-router-dom';

import { createBoard, createPost, deletePost, deleteBoard, getAllBoards, getBoardsByOwnerId } from '../firebase/firebase-db';

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

      <button onClick={() => createBoard(user.displayName, user.uid, 'some cool name')}>Create da new board</button>
      {/* <button onClick={() => createPost('JZ33HLRPwYpLn4MP87iC', 'post name again', 'super nice description test')}>Create da new post</button> */}
      {/* <button onClick={() => deletePost('eFERHG4VCwuzsvBHap7f', '5nOXSxohIWhC9wMTOnqT')}>Delete da new post</button> */}
      {/* <button onClick={() => deleteBoard('JZ33HLRPwYpLn4MP87iC')}>Delete da new board</button> */}
      {/* <button onClick={() => getAllBoards()}>Print all boards</button> */}

      <button onClick={() => getBoardsByOwnerId(user.uid)}>get yo boards</button>

    </div>
  );
};

export default Dashboard;
