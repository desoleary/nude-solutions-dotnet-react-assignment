import { Collapse } from 'antd';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import List from '../List';

const { Panel: PanelAntd } = Collapse;
PanelAntd.displayName = 'PanelAntd';

const Panel = (props) => {
  const { id, header, extra, items, ...rest } = props;
  const key = `panel-${id}`;
  const listKey = `panel-list-${id}`;

  return (
    <PanelAntd {...rest} header={header} extra={extra} key={key}>
      <List dataSource={items} key={listKey} />
    </PanelAntd>
  );
};

Panel.propTypes = {
  id: oneOfType([string, number]),
  header: oneOfType([string, number, node]),
  extra: oneOfType([string, number, node]),
  items: arrayOf(
    shape({
      id: oneOfType([number, string]).isRequired,
      text: string,
      extra: node,
      actions: arrayOf(node)
    })
  )
};

export default Panel;
