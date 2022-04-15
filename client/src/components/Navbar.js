import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import NavbarProfile from './NavbarProfile';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { signUserOut } from '../firebase/firebase-auth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShowProfilePopup(true);
  const handleClose = () => setShowProfilePopup(false);
  const handleLogoutClose = () => {
    handleClose();
    signUserOut();
  };

  return (
    <>
      <nav>
        <img onClick={() => navigate('/')} src='./logo.png' alt='Push Pin' />
        <input type='text' placeholder='search boards...' />
        <NavbarProfile user={user} onClickFunc={handleShow} />
      </nav>

      <Modal className='modal' show={showProfilePopup} onHide={handleClose}>
        <Modal.Header closeButton>
          Logged in as&nbsp;
          <span className='orange'>{user.displayName}</span>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className='orange'>Name</span> - {user.displayName}
          </p>
          <p>
            <span className='orange'>Email</span> - {user.email}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button id='logout-button' onClick={handleLogoutClose}>
            <FaRegArrowAltCircleLeft
              style={{
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
            Sign out
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
