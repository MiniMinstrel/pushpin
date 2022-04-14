import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { createBoard } from '../firebase/firebase-db';
import { useNavigate } from 'react-router-dom';

const CreateBoardButton = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSubmit = async () => {
    const name = document.querySelector('#new-board-name-input').value;
    const boardId = await createBoard(user.displayName, user.uid, name);
    document.querySelector('#new-board-name-input').value = '';
    handleClose();
    navigate(`/boards/${boardId}`);
  };

  return (
    <>
      <div
        className='create-button dashboard-button'
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
