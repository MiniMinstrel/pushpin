import { signUserOut } from '../firebase/firebase-auth';

const UserDashboard = ({ user }) => {
  return (
    <>
      <p>Display name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt='user pic' referrerPolicy='no-referrer' />
      <p>UID: {user.uid}</p>

      <button onClick={signUserOut}>Sign out</button>
    </>
  );
};

export default UserDashboard;
