import React from 'react';

import { List } from '../../components';

const props = {
  dataSource: [
    {
      id: 'some-identifier',
      text: 'some-content',
      extra: <div>some-extra-content</div>,
      actions: [<div>some-action-to-be-performed</div>]
    }
  ]
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props
};

export default {
  title: 'Components/List',
  component: List
};
