import { List, Typography } from 'antd';
import { arrayOf, node, number, oneOfType, string } from 'prop-types';
import React from 'react';

const { Item } = List;
const { Text } = Typography;

Item.displayName = 'ItemAntd';

const ListItem = ({ text, extra, actions, id }) => {
  const key = `list-item-${id}`;

  return (
    <Item extra={extra} actions={actions} key={key}>
      <Text>{text}</Text>
    </Item>
  );
};

ListItem.defaultProps = {
  actions: []
};

ListItem.propTypes = {
  id: oneOfType([number, string]).isRequired,
  text: string,
  extra: node,
  actions: arrayOf(node)
};

export default ListItem;
