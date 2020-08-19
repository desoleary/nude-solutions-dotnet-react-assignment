import { DeleteFilled } from '@ant-design/icons/lib/icons';
import { Popconfirm } from 'antd';
import { number, string, oneOfType, func } from 'prop-types';
import React from 'react';

import { noop } from 'lodash-es';

import DangerDeleteFilledIcon from '../../../components/Icons/DangerDeleteFilledIcon';

const DeleteContentAction = (props) => {
  const { contentId, currencyAmount, onConfirm } = props;

  return (
    <div>
      {`${currencyAmount} `}
      <Popconfirm
        title='Are you sure？'
        icon={<DangerDeleteFilledIcon />}
        onConfirm={() => onConfirm(contentId)}>
        <DeleteFilled />
      </Popconfirm>{' '}
    </div>
  );
};

DeleteContentAction.defaultProps = {
  onConfirm: noop
};

DeleteContentAction.propTypes = {
  contentId: oneOfType([number, string]).isRequired,
  currencyAmount: string.isRequired,
  onConfirm: func
};

export default DeleteContentAction;
