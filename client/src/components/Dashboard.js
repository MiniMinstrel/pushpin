import { Navigate } from 'react-router-dom';

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
    </div>
  );
};

export default Dashboard;
