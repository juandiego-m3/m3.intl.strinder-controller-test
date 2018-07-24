// Dependencies
import faker from "faker";
import puppeteer from "puppeteer";

// Variables
// Variables
const LOGIN = "http://www.doctors.net.uk/Login/Login.aspx?go=true"
const SEARCH = "http://betasearch.doctors.net.uk"
const USER = 'doctors-mess'
const PWD = ''
let page;
let browser;
const width = 1920;
const height = 1080;

// Before
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false, // For head navigation
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height }); // For head navigation
});

// After
afterAll(() => {
  browser.close();
});

// Login
describe("Login form", () => {
  test("User can Login", async () => {
    await page.goto(LOGIN);
    await page.waitForSelector("#aspnetForm");
    await page.click("#ctl00_cCphContent_cTxtUsername");
    await page.type("#ctl00_cCphContent_cTxtUsername", USER);
    await page.click("#ctl00_cCphContent_cTxtPassword");
    await page.type("#ctl00_cCphContent_cTxtPassword", PWD);
    await page.click("#ctl00_cCphContent_cBtnLogin");
    await page.waitForNavigation();
  }, 60000); // For head navigation
});

// Search
describe("Search", () => {
  // Basic
  test("User can search", async () => {
    await page.goto(SEARCH);
    await page.waitForSelector(".page-search-result");
    await page.click("#query");
    await page.type("#query", 'cancer');
    await page.keyboard.press('Enter');
    await page.waitForSelector(".infinite-scroll-component");
  }, 20000);
})
