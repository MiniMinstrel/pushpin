const BoardPreviewButton = ({ board }) => {
  return (
    <div className='dashboard-button'>
      <h3>{board.name}</h3>
      <p>
        by: <span className='orange'>{board.ownerName}</span>
      </p>
    </div>
  );
};

export default BoardPreviewButton;
