import React from 'react';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';
import PostContainer from '../PostContainer/PostContainer';

function AppContainer() {
  return (
    <Routes>
      <Route path="/:username/:postId" element={<PostContainer />} />
    </Routes>
  );
}

export default AppContainer;
