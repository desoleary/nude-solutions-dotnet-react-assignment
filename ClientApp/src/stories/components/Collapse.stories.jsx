import React from 'react';

import Collapse from '../../components/Collapse';

const handlePanelChange = (contentId) => {
  console.log(contentId);
};

const footerProps = {
  id: 'some-footer-panel-identifier',
  header: 'some-footer-header',
  extra: <div>some-footer-extra-content</div>
};

const props = {
  data: [
    {
      id: 'some-identifier',
      header: 'some-text',
      extra: <div>some-extra-content</div>,
      items: [
        {
          id: 'some-item-identifier',
          text: 'some-list-item-text',
          actions: ['some-action-to-be-performed'],
          extra: ['some-extra-content']
        }
      ]
    },
    {
      id: 'some-other-identifier',
      header: 'some-other-text',
      extra: <div>some-other-extra-content</div>,
      items: [
        {
          id: 'some-other-item-identifier',
          text: 'some-other-list-item-text',
          actions: ['some-other-action-to-be-performed'],
          extra: ['some-other-extra-content']
        }
      ]
    }
  ],
  expandAllByDefault: false,
  onChange: handlePanelChange
};

const Template = (args) => <Collapse {...args} />;

export const Default = Template.bind();

Default.args = { ...props };

export const WithKitchenSink = Template.bind();

WithKitchenSink.args = { ...props, footerProps, expandAllByDefault: true };

export const WithExpandAllByDefaultSet = Template.bind();

WithExpandAllByDefaultSet.args = { ...props, expandAllByDefault: true };

export const WithDefaultActiveKeySet = Template.bind();

WithDefaultActiveKeySet.args = {
  ...props,
  defaultActiveKey: ['collapse-panel-some-other-identifier']
};

export const WithFooterProps = Template.bind();

WithFooterProps.args = {
  ...props,
  footerProps: {
    id: 'some-footer-panel-identifier',
    header: 'some-footer-header',
    extra: <div>some-footer-extra-content</div>
  }
};

export const WithoutListItems = Template.bind();

WithoutListItems.args = {
  ...props,
  data: [
    {
      id: 'some-identifier',
      header: 'some-text',
      extra: <div>some-extra-content</div>,
      items: []
    }
  ],
  expandAllByDefault: true
};

export default {
  title: 'Components/Collapse',
  component: Collapse
};
