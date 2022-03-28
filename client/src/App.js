import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  signUserInWithGooglePopup,
  signUserOut,
} from './firebase/firebase-auth';

// import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [user] = useAuthState(auth);

  if (user) {
    return (
      <>
        <div id='user-description'>
          <p>Display name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>photo link: {user.photoURL}</p>
          <img
            src={user.photoURL}
            alt='user pic'
            referrerpolicy='no-referrer'
          />
          <p>UID: {user.uid}</p>
        </div>

        <button onClick={signUserOut}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <button onClick={signUserInWithGooglePopup}>Sign in with Google</button>
    </>
  );
}

export default App;
