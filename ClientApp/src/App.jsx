import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { RenterContentsEditor } from './pages';

import './custom.css';

const App = () => (
  <Layout>
    <Route exact path='/' component={RenterContentsEditor} />
  </Layout>
);

export default App;
