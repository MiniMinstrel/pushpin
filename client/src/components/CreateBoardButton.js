import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { createBoard } from '../firebase/firebase-db';

const CreateBoardButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSubmit = () => {
    const name = document.querySelector('#new-board-name-input').value;
    createBoard(user.displayName, user.uid, name);
    document.querySelector('#new-board-name-input').value = '';
    handleClose();
  };

  return (
    <>
      <div
        id='create-board-button'
        className='dashboard-button'
        onClick={handleShow}
      >
        <FaPlus />
        New Board
      </div>

      <Modal className='modal' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>Create a New Board</Modal.Header>
        <Modal.Body>
          <input
            type='text'
            id='new-board-name-input'
            placeholder='Enter new board name...'
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleSubmit}>
            <FaPlus />
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateBoardButton;
