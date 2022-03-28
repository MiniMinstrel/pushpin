import { FaThumbtack } from 'react-icons/fa';

const Navbar = ({ user }) => {
  return (
    <nav>
      <div>
        <FaThumbtack style={{ width: '2rem', height: '2rem', color: 'var(--color-red)' }} />
      </div>
      <div>
        <input type='text' placeholder='search...' />
      </div>
      {user && <div>User logged in</div>}
    </nav>
  );
};

export default Navbar;
