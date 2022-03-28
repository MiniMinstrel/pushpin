const UserDashboard = ({ user }) => {
  return (
    <>
      <p style={{fontWeight: 'bold'}}>
        Welcome to your dashboard,{' '}
        <span className='red'>{user.displayName}</span>! This is where the magic
        happens!
      </p>
    </>
  );
};

export default UserDashboard;
