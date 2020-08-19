import { shallow } from 'enzyme';
import React from 'react';
import { List as ListAntd } from 'antd';
import List from '../List';

describe('with shallow rendering', () => {
  let wrapper;

  const listItemProps = {
    id: 'some-identifier',
    text: 'some-text',
    extra: <div>some-extra-content</div>,
    actions: [<div>some-action-to-perform</div>]
  };

  const props = {
    dataSource: [listItemProps]
  };

  beforeEach(() => {
    wrapper = shallow(<List {...props} />);
  });

  it('compares snapshot', () => {
    expect(wrapper.length).to.eql(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('passes props correctly', () => {
    const antdListProps = wrapper.find(ListAntd).props();

    expect(antdListProps.size).to.eql('small');
    expect(antdListProps.split).to.eql(false);
    expect(antdListProps.dataSource).to.eql([listItemProps]);
  });
});
