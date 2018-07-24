// Dependencies
const assert = require('assert');
const { Then } = require('cucumber');

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer)
});

Then('I see the search box', { timeout: 60000 }, async function () {
  await this.page.waitForSelector('#root > div.page-search-result > div > div > div > div.search-form');
});

Then('I see results', async function () {
  await this.page.waitForSelector('#root > div.page-search-result > div > div > div > div:nth-child(4) > div');
});

Then('I see home page', async function () {
  await this.page.waitForSelector('#m3breadcrumblinks');
});