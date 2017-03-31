import { Ng2EfInputsPage } from './app.po';

describe('ng2-ef-inputs App', () => {
  let page: Ng2EfInputsPage;

  beforeEach(() => {
    page = new Ng2EfInputsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
