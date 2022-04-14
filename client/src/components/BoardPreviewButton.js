import { BsFillKanbanFill } from 'react-icons/bs';

const BoardPreviewButton = ({ board }) => {
  return (
    <div className='dashboard-button board-preview-button'>
      <BsFillKanbanFill style={{width: '2rem', height: '2rem'}}/>
      <h3>{board.name}</h3>
      <p>{board.ownerName}</p>
    </div>
  );
};

export default BoardPreviewButton;
