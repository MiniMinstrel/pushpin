import { FaTrash } from 'react-icons/fa';
import { deletePost } from '../firebase/firebase-db';
import { useNavigate } from 'react-router-dom';

const DeletePostButton = ({ boardId, postId }) => {


const navigate = useNavigate();

  const handleSubmit = async () => {
    await deletePost(boardId, postId);
    navigate('/dashboard');
    };

  return (

    <div
      className='create-delete-button'
      id='delete-post-button'
      onClick={handleSubmit}
    >
      <FaTrash /> Delete
    </div>

  );
};


export default DeletePostButton;