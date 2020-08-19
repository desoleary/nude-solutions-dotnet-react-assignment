import { Form } from 'antd';
import {
  bool,
  string,
  element,
  arrayOf,
  shape,
  oneOfType,
  number
} from 'prop-types';
import React from 'react';

const FormItem = ({ label, name, rules, children }) => (
  <Form.Item label={label} rules={rules} name={name}>
    {children}
  </Form.Item>
);

FormItem.defaultProps = {
  rules: []
};

FormItem.propTypes = {
  children: element.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  rules: arrayOf(
    oneOfType([
      shape({ required: bool }),
      shape({ min: number }),
      shape({ max: number })
    ])
  )
};

export default FormItem;
