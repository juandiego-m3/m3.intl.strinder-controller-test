// Dependencies
const { setWorldConstructor } = require("cucumber");
const puppeteer = require("puppeteer");

// Define class
class browser {

  // Init
  constructor() {
  };

  async init() {
    this.pupe = await puppeteer.launch();
    this.page = await this.pupe.newPage();
  }

  // After
  async close() {
    if (this.pupe) this.pupe.close();
  };

  // Open Url
  async navigate(url) {
    await this.page.goto(url);
  };

  // Find selector
  find(selector) {
    this.page.waitForSelector(selector);
  }

}

setWorldConstructor(browser);
