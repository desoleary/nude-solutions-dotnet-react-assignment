import stripNonNumericCharacters from '../stripNonNumericCharacters';

describe('stripNonNumericCharacters', () => {
  it('removes currency symbols', () => {
    const actual = stripNonNumericCharacters('$1,234,567');
    expect(actual).to.eq('1234567');
  });

  it('preserves fractional currency/dots', () => {
    const actual = stripNonNumericCharacters('$1,234,567.65');
    expect(actual).to.eq('1234567.65');
  });

  it('preserves negative sign', () => {
    const actual = stripNonNumericCharacters('-$1,234,567');
    expect(actual).to.eq('-1234567');
  });

  it('preserves positive sign', () => {
    const actual = stripNonNumericCharacters('+$1,234,567');
    expect(actual).to.eq('+1234567');
  });

  it('handles non string values', () => {
    expect(stripNonNumericCharacters(null)).to.eq(null);
    expect(stripNonNumericCharacters(undefined)).to.eq(undefined);
    expect(stripNonNumericCharacters(1.67)).to.eq(1.67);
  });
});
