// Dependencies
import puppeteer from "puppeteer";

// Variables
let browser;
let page;
const USER = 'nagios.monitor'
const PWD = '10m43t'
const TIME = 60000
const HEAD = false

// Before
beforeAll(async () => {
  browser = await puppeteer.launch({ headless: !HEAD });
  page = await browser.newPage();
  page.setDefaultNavigationTimeout(TIME);
});

// After
afterAll(() => {
  browser.close();
});

// Login
describe("Login form", () => {
  test("User can Login", async () => {
    await page.goto('http://www.doctors.net.uk/Login/Login.aspx?go=true');
    await page.waitForSelector("#aspnetForm");
    await page.click("#ctl00_cCphContent_cTxtUsername");
    await page.type("#ctl00_cCphContent_cTxtUsername", USER);
    await page.click("#ctl00_cCphContent_cTxtPassword");
    await page.type("#ctl00_cCphContent_cTxtPassword", PWD);
    await page.click("#ctl00_cCphContent_cBtnLogin");
    await page.waitForNavigation();
  }, TIME);
});

// Home
describe("Home", () => {
  test("User lands on home page", async () => {
    await page.goto('https://home.doctors.net.uk');
    await page.waitForSelector('#dnukHeaderWrapper');
    await page.waitForFunction('document.querySelector("#m3breadcrumblinks").innerText == "Home"');
  }, TIME)
});

// Forum
describe("Forum", () => {
  test("User navigates to Forum Page", async () => {
    await page.goto('https://forum.doctors.net.uk/#/home');
    await page.waitForSelector('#dnukHeaderWrapper');
    await page.waitForFunction('document.querySelector(".m3breadcrumb a").innerText == "Forum"');
  }, TIME)
});

// Education
describe("Education", () => {
  test("User navigates to Education Page", async () => {
    await page.goto('https://www.doctors.net.uk/education');
    await page.waitForSelector('#dnukHeaderWrapper');
    await page.waitForFunction('document.querySelector(".m3breadcrumb a").innerText == "Education"');
  }, TIME)
});

// Library
describe("Library", () => {
  test("User navigates to Library Page", async () => {
    await page.goto('https://www.doctors.net.uk/library');
    await page.waitForSelector('#dnukHeaderWrapper');
    await page.waitForFunction('document.querySelector("#m3breadcrumblinks a").innerText == "Library"');
  }, TIME)
});

// News
describe("News", () => {
  test("User navigates to News Page", async () => {
    await page.goto('https://news.doctors.net.uk');
    await page.waitForSelector('#dnukHeaderWrapper');
    await page.waitForFunction('document.querySelector("#news > div.header-wrapper > div > div > div > h1").innerText == "News"');
  }, TIME)
});

// Off Duty
describe("Off Duty", () => {
  test("User navigates to Off Duty Page", async () => {
    await page.goto('https://offduty.doctors.net.uk');
    await page.waitForSelector('#dnukHeaderWrapper');
    await page.waitForFunction('document.querySelector("#m3breadcrumblinks").innerText == "Off Duty"');
  }, TIME)
});

// Email
describe("Email", () => {
  test("User navigates to Email Page", async () => {
    await page.goto('https://webmail.doctors.org.uk');
    await page.waitForSelector('#dnukheader');
    await page.waitForFunction('document.querySelector("#synclink").innerText == "Sync device"');
  }, TIME)
});

// Careers
describe("Careers", () => {
  test("User navigates to Careers Page", async () => {
    await page.goto('https://careers.doctors.net.uk');
    await page.waitForSelector('#m3Header');
    await page.waitForFunction('document.querySelector("#homepage-content > div.col-sm-12.col-md-12 > div > div > a > h2").innerText == "Careers"');
  }, TIME)
});

// Search
describe("Search", () => {
  test("User navigates to Search page", async () => {
    await page.goto('https://betasearch.doctors.net.uk');
    await page.waitForSelector(".page-search-result");
  }, TIME);
  test("User performs a search for cancer", async () => {
    await page.click("#query");
    await page.type("#query", 'cancer');
    await page.keyboard.press('Enter');
    await page.waitForSelector(".infinite-scroll-component", { timeout: TIME });
  }, TIME);
});
