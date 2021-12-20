import React from 'react';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';
import PostContainer from '../PostContainer/PostContainer';
import PrivacyContainer from '../PrivacyContainer/PrivacyContainer';

function AppContainer() {
  return (
    <Routes>
      <Route path="/:username/:postId" element={<PostContainer />} />
      <Route path="/privacy" element={<PrivacyContainer />} />
    </Routes>
  );
}

export default AppContainer;
