import { object, string, oneOf } from 'prop-types';
import React from 'react';
import FormItem from './FormItem';

import Input from './Input';
import NumberInput from './NumberInput';
import Select from './Select';

const WIDGET_MAP = {
  string: Input,
  number: NumberInput,
  select: Select
};

const getWidget = (name) => WIDGET_MAP[name] || Input;

const Field = (props) => {
  const { name, label, rules, uiWidget, ...inputProps } = props;

  const Widget = getWidget(uiWidget);

  return (
    <FormItem label='' name={name} rules={rules}>
      <Widget {...inputProps} placeholder={label} style={{ minWidth: 120 }} />
    </FormItem>
  );
};

Field.defaultProps = {
  uiWidget: 'string'
};

Field.propTypes = {
  label: string,
  name: string.isRequired,
  rules: object,
  uiWidget: oneOf(['string', 'number', 'select'])
};

export default Field;
