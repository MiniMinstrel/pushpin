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
import SearchPage from './components/SearchPage';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Router>
        {user && <Navbar user={user} />}

        <main id="body">
          <Routes>
            <Route path='/' element={<Login user={user} />} />
            {user && (
              <Route
                path='/dashboard'
                element={<UserDashboard user={user} />}
              />
            )}
            <Route path='/boards/:boardId' element={<Board user={user} />} />
            {user && (
              <Route path='/search/:searchQuery' element={<SearchPage />} />
            )}
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </Routes>
        </main>

        <footer id="footer"> © 2022 Push Pin LLC. All Rights Reserved. </footer>

      </Router>
    </>
  );
}

export default App;
