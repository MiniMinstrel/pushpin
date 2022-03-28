import { FaThumbtack } from 'react-icons/fa';
import NavbarProfile from './NavbarProfile';

const Navbar = ({ user }) => {
  return (
    <nav>
      <FaThumbtack
        style={{ width: '2rem', height: '2rem', color: 'var(--color-red)' }}
      />
      <input type='text' placeholder='search...' />
      {user && <NavbarProfile user={user} />}
    </nav>
  );
};

export default Navbar;
