// Dependencies
const { When } = require('cucumber');

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today)
});

When('I type things and stuff', async function () {
  await this.page.click("#query");
  await this.page.type("#query", 'things and stuff');
  await this.page.keyboard.press('Enter');
});

// Functions
function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF";
  }
  else {
    return "Nope";
  }
}