import React from 'react';

import ListItem from '../../components/List/ListItem';

const props = {
  id: 'some-identifier',
  text: 'some-content',
  extra: <div>some-extra-content</div>,
  actions: [<div>some-action-to-be-performed</div>]
};

const Template = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...props
};

export default {
  title: 'Components/ListItem',
  component: ListItem
};
