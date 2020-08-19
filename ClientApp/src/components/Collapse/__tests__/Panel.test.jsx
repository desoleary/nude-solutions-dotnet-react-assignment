import { Collapse } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import Panel from '../Panel';
import List from '../../List';

const { Panel: PanelAntd } = Collapse;

describe('with shallow rendering', () => {
  let wrapper;
  const props = {
    id: 'some-identifier',
    header: <div>'some-header'</div>,
    extra: <div>some-extra-content</div>,
    items: [{ id: 'some-item-identifier' }]
  };

  beforeEach(() => {
    wrapper = shallow(<Panel {...props} />);
  });

  it('compares snapshot', () => {
    expect(wrapper.length).to.eql(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes props correctly to Antd's Panel", () => {
    const antdPanelWrapper = wrapper.find(PanelAntd);
    const antdPanelProps = wrapper.find(PanelAntd).props();

    expect(antdPanelWrapper.key()).to.eql(`panel-${props.id}`);
    expect(antdPanelProps.header).to.eql(props.header);
    expect(antdPanelProps.extra).to.eql(props.extra);
    expect(antdPanelProps.actions).to.eql(props.actions);
  });

  it('passes props correctly to List', () => {
    const listWrapper = wrapper.find(List);
    const listProps = listWrapper.props();

    expect(listWrapper.key()).to.eql(`panel-list-${props.id}`);
    expect(listProps.dataSource).to.eql(props.items);
  });
});
