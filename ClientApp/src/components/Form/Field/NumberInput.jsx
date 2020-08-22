import { InputNumber as InputNumberAntd } from 'antd';
import { string } from 'prop-types';
import React from 'react';

const NumberInput = (props) => {
  const { name, placeholder, ...inputProps } = props;

  return (
    <InputNumberAntd
      {...inputProps}
      name={name}
      placeholder={placeholder}
      data-cy-input={name}
    />
  );
};

NumberInput.propTypes = {
  name: string.isRequired,
  placeholder: string
};

export default NumberInput;
