import { getBoardsByQueryContains } from '../firebase/firebase-db';
import BoardPreviewButton from './BoardPreviewButton';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';

const SearchPage = () => {
  const [boards, setBoards] = useState([]);
  const { searchQuery } = useParams();

  useEffect(() => {
    const fetchBoards = async () => {
      const boardsRes = await getBoardsByQueryContains(searchQuery);
      setBoards([...boardsRes]);
    };

    fetchBoards();
  }, [searchQuery]);

  return (
    <FadeIn>
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
    </FadeIn>
  );
};

export default SearchPage;
