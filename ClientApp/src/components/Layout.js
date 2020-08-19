import React from 'react';
import { Container } from 'reactstrap';
import { node } from 'prop-types';
import NavMenu from './NavMenu';

const Layout = (props) => (
  <div>
    <NavMenu />
    <Container>{props.children}</Container>
  </div>
);

Layout.propTypes = {
  children: node
};

export default Layout;
