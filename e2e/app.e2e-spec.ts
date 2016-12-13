import { Ng2SmdInputPage } from './app.po';

describe('ng2-ef-inputs App', function() {
  let page: Ng2SmdInputPage;

  beforeEach(() => {
    page = new Ng2SmdInputPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
