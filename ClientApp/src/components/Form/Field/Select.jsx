import { Select as SelectAntd } from 'antd';
import { arrayOf, oneOfType, string, number, func } from 'prop-types';
import React from 'react';
import { snakeCase, noop } from 'lodash-es';

const { Option } = SelectAntd;

const Select = (props) => {
  const { value, onChange, options, ...rest } = props;

  return (
    <SelectAntd {...rest} defaultValue={value} onChange={onChange}>
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
  options: arrayOf(string),
  value: oneOfType([string, number]),
  onChange: func
};

export default Select;
