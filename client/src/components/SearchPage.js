import { getBoardsByQueryContains } from '../firebase/firebase-db';
import BoardPreviewButton from './BoardPreviewButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SearchPage = () => {
  const [boards, setBoards] = useState([]);
  const { searchQuery } = useParams();

  const fetchBoards = async () => {
    const boardsRes = await getBoardsByQueryContains(searchQuery);
    setBoards([...boardsRes]);
  };

  useEffect(() => {
    fetchBoards();
  }, [searchQuery]);

  return (
    <div id='search-page-container'>
      <h2>
        Showing search results for <span className='orange'>{searchQuery}</span>
      </h2>
      <div className='boards-grid'>
        {boards.map((board) => {
          return <BoardPreviewButton key={board.boardId} board={board} />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
