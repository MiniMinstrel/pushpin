import { FaTrash } from 'react-icons/fa';
import { deleteBoard } from '../firebase/firebase-db';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteBoardButton = ({ boardId }) => {
  const navigate = useNavigate();

  const deleteAlert = () => {
    
    deleteBoard(boardId);
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    await deleteBoard(boardId);
    navigate('/dashboard');
  };

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
    <div
      className='create-button post post-button'
      id='delete-board-button'
      //onClick={handleSubmit}
      onClick={handleShow}
    >
      <FaTrash /> Delete Board
    </div>
    
    <Modal className='modal' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>Are you sure you want to delete this board?</Modal.Header>
        <Modal.Body>
          This action can't be undone
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleSubmit}>
            <FaTrash />
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default DeleteBoardButton;
