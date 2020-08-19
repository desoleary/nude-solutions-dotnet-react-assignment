import { Popconfirm } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import DeleteContentAction from '../DeleteContentAction';

describe('DeleteContentAction', () => {
  const props = {
    contentId: 'some-content-id',
    currencyAmount: '$2,000.00',
    onConfirm: sinon.spy()
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DeleteContentAction {...props} />);
  });

  it('adds currency with whitespace', () => {
    expect(wrapper.text()).to.eql('$2,000.00  ');
  });

  it('popover calls underlying on delete handler', () => {
    const popupConfirmProps = wrapper.find(Popconfirm).props();
    popupConfirmProps.onConfirm();

    expect(props.onConfirm).to.have.been.calledOnceWith(props.contentId);
  });
});
