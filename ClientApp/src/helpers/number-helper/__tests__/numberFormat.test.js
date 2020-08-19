import numberFormat from '../numberFormat';

describe('numberFormat', () => {
  it('returns value unchanged if value is not a string', () => {
    expect(numberFormat(null)).to.eql('0.00');
    expect(numberFormat(undefined)).to.eql('0.00');
    expect(numberFormat(10000)).to.eql('10,000.00');
  });

  context('without currency symbol', () => {
    it('removes currency symbol from input', () => {
      const value = numberFormat('$1,000,000');

      expect(value).to.eql('1,000,000.00');
    });
  });

  context('with currency symbol', () => {
    it('converts to currency value', () => {
      const value = numberFormat('1,000,000', { currency: 'GBP' });

      expect(value).to.eql('£1,000,000.00');
    });
  });
});
