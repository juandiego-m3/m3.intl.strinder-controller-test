// Dependencies
const assert = require('assert');
const { Given, Before, After } = require('cucumber');
const puppeteer = require("puppeteer");

// Variables
const USER = 'doctors-mess';
const PASS = '';
const LOGIN = 'https://www.doctors.net.uk/Login/Login.aspx?go=true';

Before(async function (testCase) {
  this.pupe = await puppeteer.launch();
  this.page = await this.pupe.newPage();
});

After(async function () {
  if (this.pupe) this.pupe.close();
});

Given('I open the url {string}', async function (string) {
  await this.page.goto(string);
});

Given('I open the login page', async function () {
  await this.page.goto(LOGIN);
});

Given('I write user', async function () {
  await this.page.click("#ctl00_cCphContent_cTxtUsername");
  await this.page.type("#ctl00_cCphContent_cTxtUsername", USER);
});

Given('I write password', async function () {
  await this.page.click("#ctl00_cCphContent_cTxtPassword");
  await this.page.type("#ctl00_cCphContent_cTxtPassword", PASS);
});

Given('I click the submit button', { timeout: 60000 }, async function () {
  await this.page.click("#ctl00_cCphContent_cBtnLogin");
  await this.page.waitForNavigation({ timeout: 60000 });
});

