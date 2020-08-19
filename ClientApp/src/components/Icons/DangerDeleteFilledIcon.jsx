import { DeleteFilled as DeleteFilledAntd } from '@ant-design/icons';
import React from 'react';

import { string, shape } from 'prop-types';

const DangerDeleteFilledIcon = (props) => <DeleteFilledAntd {...props} />;

DangerDeleteFilledIcon.defaultProps = {
  style: { color: 'red' }
};

DangerDeleteFilledIcon.propTypes = {
  style: shape({ color: string })
};

export default DangerDeleteFilledIcon;
