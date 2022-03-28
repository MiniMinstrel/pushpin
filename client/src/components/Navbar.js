import { FaThumbtack, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import NavbarProfile from './NavbarProfile';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { signUserOut } from '../firebase/firebase-auth';

const Navbar = ({ user }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const handleShow = () => setShowProfilePopup(true);
  const handleClose = () => setShowProfilePopup(false);
  const handleLogoutClose = () => {
    handleClose();
    signUserOut();
  };

  return (
    <>
      <nav>
        <FaThumbtack
          style={{ width: '2rem', height: '2rem', color: 'var(--color-red)' }}
        />
        <input type='text' placeholder='search boards...' />
        {user && <NavbarProfile user={user} onClickFunc={handleShow} />}
      </nav>

      {user && (
        <Modal
          id='profile-popup-modal'
          show={showProfilePopup}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            Logged in as&nbsp;
            <span className='red'>{user.displayName}</span>
          </Modal.Header>
          <Modal.Body>
            <p>
              <span className='red'>Name</span> - {user.displayName}
            </p>
            <p>
              <span className='red'>Email</span> - {user.email}
            </p>
            <p>
              <span className='red'>UID</span> - {user.uid}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button id='logout-button' onClick={handleLogoutClose}>
              <FaRegArrowAltCircleLeft
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  marginRight: '0.3rem',
                }}
              />
              Sign out
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
