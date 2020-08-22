import { Select as SelectAntd } from 'antd';
import { arrayOf, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { noop, snakeCase } from 'lodash-es';

const { Option } = SelectAntd;

const Select = (props) => {
  const { name, value, onChange, options, ...rest } = props;

  return (
    <SelectAntd
      {...rest}
      defaultValue={value}
      onChange={onChange}
      data-cy-select={name}>
      {options.map((option) => {
        const key = snakeCase(option);
        return (
          <Option value={option} key={key}>
            {option}
          </Option>
        );
      })}
    </SelectAntd>
  );
};

Select.defaultProps = {
  options: [],
  onChange: noop
};

Select.propTypes = {
  name: string.isRequired,
  options: arrayOf(string),
  value: oneOfType([string, number]),
  onChange: func
};

export default Select;
