import { signUserInWithGooglePopup } from '../firebase/firebase-auth';

const Login = () => {
  return (
    <button onClick={signUserInWithGooglePopup}>Sign in with Google</button>
  );
};

export default Login;
