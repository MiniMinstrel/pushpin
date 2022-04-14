import { BsFillKanbanFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const BoardPreviewButton = ({ board }) => {
  const navigate = useNavigate();

  return (
    <div
      className='dashboard-button board-preview-button'
      onClick={() => navigate(`/boards/${board.boardId}`)}
    >
      <BsFillKanbanFill style={{ width: '2rem', height: '2rem' }} />
      <h3>{board.name}</h3>
      <p>{board.ownerName}</p>
    </div>
  );
};

export default BoardPreviewButton;
