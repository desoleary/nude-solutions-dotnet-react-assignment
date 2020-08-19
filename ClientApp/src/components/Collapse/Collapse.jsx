import { Collapse as CollapseAntd } from 'antd';
import { noop } from 'lodash-es';
import {
  arrayOf,
  func,
  node,
  number,
  oneOfType,
  shape,
  string,
  bool
} from 'prop-types';
import React from 'react';
import Panel from './Panel';

CollapseAntd.displayName = 'CollapseAntd';

const Collapse = (props) => {
  const { data, footerProps, expandAllByDefault, ...rest } = props;

  const panelIdFormatter = (id) => `collapse-panel-${id}`;

  const defaultActiveKey = expandAllByDefault
    ? data.map(({ id }) => panelIdFormatter(id))
    : props.defaultActiveKey;

  return (
    <CollapseAntd
      {...rest}
      onChange={props.onChange}
      defaultActiveKey={defaultActiveKey}>
      {data.map((itemProps) => (
        <Panel {...itemProps} key={panelIdFormatter(itemProps.id)} />
      ))}
      {footerProps && (
        <Panel id='collapse-footer-panel' {...footerProps} disabled />
      )}
    </CollapseAntd>
  );
};

Collapse.defaultProps = {
  expandAllByDefault: false,
  onChange: noop
};

Collapse.propTypes = {
  data: arrayOf(
    shape({
      id: oneOfType([number, string]).isRequired,
      text: string,
      extra: node,
      actions: arrayOf(node)
    })
  ),
  expandAllByDefault: bool,
  defaultActiveKey: oneOfType([
    string,
    number,
    oneOfType([arrayOf(string), arrayOf(number)])
  ]),
  footerProps: shape({
    id: oneOfType([string, number]),
    header: oneOfType([string, number, node]),
    extra: oneOfType([string, number, node])
  }),
  onChange: func
};

export default Collapse;
