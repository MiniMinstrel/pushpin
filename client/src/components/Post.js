import DeletePostButton from './DeletePostButton.js';
import { useParams } from 'react-router-dom';

const Post = ({ post }) => {

  const { boardId } = useParams();

  return (
    <div className='post'>
      <h1>{post.name}</h1>
      <h4>{post.description}</h4>
      <DeletePostButton boardId={boardId} postId={post.postId} />

    </div>
  );
};

export default Post;
