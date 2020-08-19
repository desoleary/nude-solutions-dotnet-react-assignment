import React from 'react';
import { contents } from '../../pages/RenterContentsEditor/seeds';
import { RenterContentsEditor } from '../../pages';

const props = {
  contents
};

const Template = (args) => <RenterContentsEditor {...args} />;

export const Default = Template.bind({});

Default.args = { ...props };

export default {
  title: 'Pages/RenterContentsEditor',
  component: RenterContentsEditor
};
