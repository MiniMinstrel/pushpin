import { FaTrash } from 'react-icons/fa';
import { deletePost } from '../firebase/firebase-db';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const DeletePostButton = ({ boardId, postId }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await deletePost(boardId, postId);
    navigate('/dashboard');
  };

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div id='delete-post-button' onClick={handleShow}>
        <FaTrash style={{width: '1.2rem', height: '1.2rem'}}/>
      </div>

      <Modal className='modal' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          Are you sure you want to delete this post?
        </Modal.Header>
        <Modal.Body>This action can't be undone</Modal.Body>
        <Modal.Footer>
          <button className='modal-delete-button' onClick={handleSubmit}>
            <FaTrash />
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePostButton;
