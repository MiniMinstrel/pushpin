const Post = ({ post }) => {
  return (
    <div className='post'>
      <h1>{post.name}</h1>
      <h4>{post.description}</h4>
    </div>
  );
};

export default Post;
