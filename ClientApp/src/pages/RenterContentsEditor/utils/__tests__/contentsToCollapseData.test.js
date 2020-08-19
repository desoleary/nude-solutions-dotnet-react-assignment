import contentsToCollapseData, {
  calculateTotalAmountFor,
  mapContentItemIntoCollapseItem
} from '../contentsToCollapseData';

const content = {
  id: 'some-content-id',
  description: 'TV',
  value: 2000.0,
  category: 'Electronics'
};

const handleDeleteFunc = () => 'handling delete function';

describe('contentsToCollapseData utils', () => {
  describe('calculateTotalAmountFor', () => {
    it('converts multiple contents into summed amount', () => {
      expect(calculateTotalAmountFor([content, content])).to.eql(4000.0);
    });
  });

  describe('mapContentItemIntoCollapseItem', () => {
    const onDeleteFunc = () => 'some-delete-func';
    let subject;

    beforeEach(() => {
      subject = mapContentItemIntoCollapseItem({
        ...content,
        onDelete: onDeleteFunc
      });
    });

    it('maps content into panel list item props', () => {
      expect(subject).to.include({
        id: 'some-content-id',
        text: 'TV'
      });
    });

    it('extra props has the correct mapped values', () => {
      expect(subject.extra.props).to.include({
        contentId: 'some-content-id',
        currencyAmount: '$2,000.00',
        onConfirm: onDeleteFunc
      });
    });
  });

  describe('contentsToCollapseData', () => {
    let subject;

    beforeEach(() => {
      subject = contentsToCollapseData([content], {
        onDelete: handleDeleteFunc
      });
    });

    it('maps contents into RenterContentsEditor data props format', () => {
      const collapsePanelProps = subject[0];
      expect(collapsePanelProps).to.include({
        id: 'electronics',
        extra: '$2,000.00',
        header: 'Electronics'
      });

      expect(collapsePanelProps.items.length).to.eql(1);
    });
  });
});
