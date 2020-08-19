import { Input as InputAntd } from 'antd';
import { string } from 'prop-types';
import React from 'react';

const Input = (props) => {
  const { placeholder, ...inputProps } = props;
  return <InputAntd {...inputProps} placeholder={placeholder} />;
};

Input.propTypes = {
  placeholder: string
};

export default Input;
