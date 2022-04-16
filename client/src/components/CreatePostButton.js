import { createPost } from '../firebase/firebase-db';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const CreatePostButton = ({ boardId, onClickFunc }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSubmit = async () => {
    const nameInput = document.querySelector('#post-name-input');
    const descriptionInput = document.querySelector('#post-description-input');
    const postName = nameInput.value;
    const postDescription = descriptionInput.value;
    await createPost(boardId, postName, postDescription);
    nameInput.value = '';
    descriptionInput.value = '';
    handleClose();
    onClickFunc();
  };

  return (
    <>
      <div className='create-button post post-button' onClick={handleShow}>
        <FaPlus />
        New Post
      </div>

      <Modal className='modal' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>Create a New Post</Modal.Header>
        <Modal.Body>
          <div id='create-post-modal-input'>
            <input
              id='post-name-input'
              type='text'
              placeholder='Enter new post name...'
            />
            <textarea
              id='post-description-input'
              type='text'
              placeholder='Enter new post description...'
            />
          </div>
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

export default CreatePostButton;
