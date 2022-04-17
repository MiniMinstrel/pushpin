import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BoardSearch = () => {
  const navigate = useNavigate();

  const onSearchSubmit = () => {
    const searchInput = document.querySelector('#search-input');
    const searchQuery = searchInput.value;
    searchInput.value = '';
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div id='board-search-container'>
      <input type='text' placeholder='search boards...' id='search-input' />
      <FaSearch id='search-submit-button' onClick={onSearchSubmit} />
    </div>
  );
};

export default BoardSearch;
