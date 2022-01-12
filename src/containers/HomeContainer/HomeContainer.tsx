import React from 'react';
import { Row, Col } from 'antd';

function HomeContainer() {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: '100vh', background: '#DFC8FF' }}
    >
      <Col>
        <Row style={{ maxWidth: '100%' }}>
          <img style={{ width: '100%' }} src="./assets/logo.png" alt="" />
        </Row>
        <Row justify="center" style={{ color: '#fff', fontWeight: 500 }}>
          ink.community
        </Row>
        <Row justify="center" style={{ color: '#fff', fontSize: 12 }}>
          — web3 community network
        </Row>
        <Row
          style={{
            position: 'fixed',
            bottom: '12px',
            right: '12px',
            color: '#fff',
            fontSize: 12,
          }}
        >
          help@ink.community
        </Row>
      </Col>
    </Row>
  );
}

export default HomeContainer;
