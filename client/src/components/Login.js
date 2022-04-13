import { FaGoogle } from 'react-icons/fa';
import { signUserInWithGooglePopup } from '../firebase/firebase-auth';

const Login = () => {
  return (
    <div id='login'>
      <h1>Push Pin - Your Virtual Bulletin Board</h1>
      <img
        src='./logo.png'
        style={{ width: '10rem', height: '10rem' }}
        alt='Push Pin logo'
      />
      <button onClick={signUserInWithGooglePopup}>
        <FaGoogle
          style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
