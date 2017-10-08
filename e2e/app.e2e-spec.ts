import { MypersonalsitePage } from './app.po';

describe('mypersonalsite App', () => {
  let page: MypersonalsitePage;

  beforeEach(() => {
    page = new MypersonalsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
