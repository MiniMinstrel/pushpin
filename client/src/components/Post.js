import DeletePostButton from './DeletePostButton.js';
import { useParams } from 'react-router-dom';

const Post = ({ post, user, boardOwnerId, updateBoardFunc }) => {
  const { boardId } = useParams();

  return (
    <div className='post'>
      <div id='post-header'>
        <h1>{post.name}</h1>
        {user && user.uid === boardOwnerId && (
          <DeletePostButton
            boardId={boardId}
            postId={post.postId}
            updateBoardFunc={updateBoardFunc}
          />
        )}
      </div>
      <h4>{post.description}</h4>
    </div>
  );
};

export default Post;
