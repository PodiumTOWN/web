import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AppContainer from './containers/AppContainer/AppContainer';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AppContainer />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
