import { Symbolic1Page } from './app.po';

describe('symbolic1 App', () => {
  let page: Symbolic1Page;

  beforeEach(() => {
    page = new Symbolic1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
