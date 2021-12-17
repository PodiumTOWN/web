import { Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import PostCard from '../../components/PostCard/PostCard';

function PostContainer() {
  const { username, postId } = useParams();

  const connect = async () => {
    // bridge url
    const bridge = 'https://bridge.walletconnect.org';

    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession();
    }

    // subscribe to events
  };

  if (username && postId) {
    return (
      <Row align="middle" justify="center" style={{ margin: 44 }}>
        <button type="button" onClick={connect}>
          connect
        </button>
        <PostCard username={username} postId={postId} />
      </Row>
    );
  }

  return <div>No</div>;
}

export default PostContainer;
