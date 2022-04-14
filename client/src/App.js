import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase-auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import UserDashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user && <Navbar user={user} />}

      <main>
        <Router>
          <Routes>
            <Route path='/' element={<Login user={user} />} />
            <Route path='/dashboard' element={<UserDashboard user={user} />} />
            <Route path='/boards/:boardId' element={<h1>on the tast</h1>} />
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
