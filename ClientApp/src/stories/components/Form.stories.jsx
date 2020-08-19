import React from 'react';

import { Form } from '../../components';

const fields = [
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'value',
    label: 'Value',
    uiWidget: 'number'
  },
  {
    name: 'category',
    label: 'Category',
    uiWidget: 'select',
    options: ['Electronics', 'Shirts', 'Kitchen']
  }
];

const props = {
  fields,
  submitBtnProps: {
    label: 'Add'
  }
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind();

Default.args = { ...props };

export default {
  title: 'Components/Form',
  component: Form
};
