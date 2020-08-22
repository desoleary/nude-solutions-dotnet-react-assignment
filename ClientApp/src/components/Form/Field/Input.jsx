import { Input as InputAntd } from 'antd';
import { string } from 'prop-types';
import React from 'react';

const Input = (props) => {
  const { placeholder, name, ...inputProps } = props;
  return (
    <InputAntd
      {...inputProps}
      name={name}
      placeholder={placeholder}
      data-cy-input={name}
    />
  );
};

Input.propTypes = {
  name: string.isRequired,
  placeholder: string
};

export default Input;
