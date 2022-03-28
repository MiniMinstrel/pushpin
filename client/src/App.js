import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase-auth';

import UserDashboard from './components/UserDashboard';
import Login from './components/Login';

function App() {
  const [user] = useAuthState(auth);

  return user ? <UserDashboard user={user} /> : <Login />;
}

export default App;
