import WebPage from '../pages/WebPage';

context('Renter Contents Editor Page', () => {
  let page;

  beforeEach(() => {
    page = new WebPage().visit().clearLocalStorage();
  });

  it('populates contents', () => {
    page
      .getControl()
      .populateInputs({
        description: 'knives',
        value: 600.5,
        category: { select: 'Kitchen' }
      })
      .assertFormData()
      .submit();

    page
      .getControl()
      .populateInputs({
        description: 'TV',
        value: 1200.99,
        category: { select: 'Electronics' }
      })
      .submit();

    page
      .getControl()
      .populateInputs({
        description: 'shirt',
        value: 150.88,
        category: { select: 'Clothing' }
      })
      .submit();

    [
      ['Kitchen', '$600.50'],
      ['Electronics', '$1,200.99'],
      ['Clothing', '$150.88']
    ].forEach(([category, currencyAmount]) => {
      cy.get(`.cy-data-panel-${category.toLowerCase()}`)
        .should('contain.text', category)
        .should('contain.text', currencyAmount);
    });

    cy.get('.cy-data-panel-collapse-footer-panel')
      .should('contain.text', 'TOTAL')
      .should('contain.text', '$1,952.37');
  });
});
