import { InputNumber as InputNumberAntd } from 'antd';
import { string } from 'prop-types';
import React from 'react';

const NumberInput = (props) => {
  const { placeholder, ...inputProps } = props;

  return <InputNumberAntd {...inputProps} placeholder={placeholder} />;
};

NumberInput.propTypes = {
  placeholder: string
};

export default NumberInput;
