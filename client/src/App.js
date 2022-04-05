import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase-auth';

import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Navbar user={user} />}
      <main>
      {user ? <UserDashboard user={user} /> : <Login />}</main>
    </>
  );
}

export default App;
