import React from 'react';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import { Share } from 'react-feather';

interface PostCardProps {
  username: string;
  postId: string;
}

function PostCard({ username, postId }: PostCardProps) {
  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>ink</Col>
          <Col
            sm={16}
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <Typography.Text type="secondary">#{postId}</Typography.Text>
          </Col>
        </Row>
      }
      style={{ width: 400 }}
      cover={
        <img alt="example" src={`https://ipfs.infura.io/ipfs/${postId}`} />
      }
      actions={[<Share key="setting" />, <>Get the App</>]}
    >
      <Card.Meta
        avatar={
          <Avatar src="https://pbs.twimg.com/profile_images/1440013960493862918/a5FFgrna_400x400.jpg" />
        }
        title={`@${username}`}
        description="Test status..."
      />
    </Card>
  );
}

export default PostCard;
