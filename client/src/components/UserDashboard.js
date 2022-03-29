const UserDashboard = ({ user }) => {
  return (
    <div id='dashboard'>
      <p>
        Welcome to your dashboard,{' '}
        <span className='red'>{user.displayName}</span>! This is where the magic
        happens!
      </p>
    </div>
  );
};

export default UserDashboard;
