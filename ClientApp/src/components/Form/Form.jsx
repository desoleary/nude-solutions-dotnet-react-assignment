import { Button, Form as FormAntd } from 'antd';
import { noop } from 'lodash-es';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import React from 'react';
import Field from './Field';

const Form = (props) => {
  const { fields, formData, onSubmit, submitBtnProps } = props;
  const { label } = submitBtnProps;

  return (
    <FormAntd
      layout='inline'
      initialValues={formData}
      onFinish={onSubmit}
      data-cy-form>
      {fields.map((field) => (
        <Field {...field} key={field.name} />
      ))}

      <FormAntd.Item>
        <Button type='primary' htmlType='submit'>
          {label}
        </Button>
      </FormAntd.Item>
    </FormAntd>
  );
};

Form.defaultProps = {
  fields: [],
  formData: {},
  onSubmit: noop,
  submitBtnProps: {
    label: 'Submit'
  }
};

Form.propTypes = {
  fields: arrayOf(
    shape({
      name: string.isRequired,
      label: string,
      required: bool
    })
  ),
  formData: shape({}),
  formProps: shape({ layout: string }),
  submitBtnProps: shape({
    label: string
  }),
  onSubmit: func
};

export default Form;
