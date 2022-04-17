import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase-auth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import UserDashboard from './components/Dashboard';
import Login from './components/Login';
import Board from './components/Board';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Router>
        {user && <Navbar user={user} />}

        <main>
          <Routes>
            <Route path='/' element={<Login user={user} />} />
            {user && (
              <Route
                path='/dashboard'
                element={<UserDashboard user={user} />}
              />
            )}
            <Route path='/boards/:boardId' element={<Board user={user} />} />
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
