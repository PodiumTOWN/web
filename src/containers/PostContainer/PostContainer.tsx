import { Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';

function PostContainer() {
  const { username, postId } = useParams();

  if (username && postId) {
    return (
      <Row align="middle" justify="center" style={{ margin: 44 }}>
        <PostCard username={username} postId={postId} />
      </Row>
    );
  }

  return <div>No</div>;
}

export default PostContainer;
