import { List as ListAntd } from 'antd';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import ListItem from './ListItem';

ListAntd.displayName = 'ListAntd';

const List = (props) => {
  const { dataSource } = props;

  return (
    <ListAntd
      dataSource={dataSource}
      size='small'
      split={false}
      renderItem={ListItem}
    />
  );
};

List.propTypes = {
  dataSource: arrayOf(
    shape({
      id: oneOfType([number, string]).isRequired,
      text: string,
      extra: node,
      actions: arrayOf(node)
    })
  )
};

export default List;
