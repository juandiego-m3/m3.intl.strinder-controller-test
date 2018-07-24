// Dependenciez
import { Selector } from 'testcafe'; // first import testcafe selectors
import { ClientFunction } from 'testcafe';

// Variables
const LOGIN = "https://www.doctors.net.uk/Login/Login.aspx?go=true";
const SEARCH = "https://betasearch.doctors.net.uk";
const USER = 'doctors-mess';
const PWD = '';
const WORD = 'cancer';
const getLocation = ClientFunction(() => document.location.href);

fixture`Getting Started`// declare the fixture
  .page(SEARCH);  // specify the start page


//then create a test and place your code there
test('Search Process', async t => {
  // Login
  await t
    .typeText('#ctl00_cCphContent_cTxtUsername', USER)
    .typeText('#ctl00_cCphContent_cTxtPassword', PWD)
    .click('#ctl00_cCphContent_cBtnLogin')
    .expect(getLocation()).contains('search');
  // Search
  await t
    .typeText('#query', WORD)
    .pressKey('enter')
    .expect(Selector(".infinite-scroll-component").exists);
  // Filter
  await t
    .click(Selector('h4').withText('Filter by'))
    .click('label[for=forum]')
    .click('label[for=careers]')
    .click('label[for=news]')
    .click('label[for=sponsored]')
    .click('label[for=education]')
    .click('label[for=offduty]')
});
