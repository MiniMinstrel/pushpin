import { FaTrash } from 'react-icons/fa';
import { deleteBoard } from '../firebase/firebase-db';
import { useNavigate } from 'react-router-dom';

const DeleteBoardButton = ({ boardId }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await deleteBoard(boardId);
    navigate('/dashboard');
  };

  return (
    <div
      className='create-button post post-button'
      id='delete-board-button'
      onClick={handleSubmit}
    >
      <FaTrash /> Delete Board
    </div>
  );
};

export default DeleteBoardButton;
