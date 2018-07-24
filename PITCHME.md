---?image=http://www.skilsure.co.uk/assets/img/Testing.png&size=auto

# Testing
<br>
<br>
<br>
<br>
<br>
<br>
##### Dealing with testing in earlier stages. Processes and Tools for automation

---

# Why Testing

@ul[brighten]
- Customer satisfaction (Who likes a buggy page?)
- Lower development cost. 100x on Production. 15x on Integration
- Time Saving (30%)
- 10 Bugs/KLOC average programmers
@ulend

Note:
- Data from IBM
- Example of having one more day free a week
- KLOC: 1000 Lines of code
---

# Ways of Testing

@div[left-50]
![test][test]
@divend

@div[right-50]
@ul[brighten]
* Functional Testing
  - Unit Testing
  - Integration Tests
  - **UI Test**
* Non Functional Testing
  - Performance
  - Scalability
  - Functionality
@ulend
@divend

[test]:https://blog.theodo.fr/wp-content/uploads/2017/04/generic-testing.png

---

## Jest

![Matt][matt]

[matt]:https://avatars1.githubusercontent.com/u/19352438?s=400&v=4

---

## Puppeteer

![puppeteer]

[puppeteer]:https://developers.google.com/web/tools/images/puppeteer.png

Note:
- Maintained by Chrome DevTools team
- Selenium

---

Install

``` 
$ npm install puppeteer --save-dev 
```

---

Configure in package.json

```json
  "jest": {
    "testRegex": "/puppeteer/.*"
  }
```

Default: (/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$

---

Write Test

```javascript
// Before
beforeAll(async () => {
  browser = await puppeteer.launch({
    //headless: false, // For head navigation
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
```

---

Run Test

```
$ jest
```

Note:
- Pros
- Locked-down API and Chrome binary.
- Backed by the publisher of Chrome, Google.
- Full-featured API covering the majority of use cases.

Cons
- Flaky test
- Hard to configure. Lots of dependencies
- Slow. Selenium spin a new browser for each test

---

## Cypress
![cypress]

[cypress]:https://pbs.twimg.com/profile_images/715181587596505088/WCV1ZBXh_400x400.jpg

---

Install

```
$ npm install cypress --save-dev
```

---?image=https://user-images.githubusercontent.com/98919/41261888-2c99fce6-6e21-11e8-94d9-42f5e42a9c61.png&size=auto 75%position=bottom

Prepare Tests

--- 

Write some test

```javascript
// Search Process
describe('Search Process', function () {
  // Login
  it('User can Login', function () {
    cy.visit(SEARCH);
    cy.get('#aspnetForm');
    cy.get('#ctl00_cCphContent_cTxtUsername').type(USER);
    cy.get('#ctl00_cCphContent_cTxtPassword').type(PWD);
    cy.get('#ctl00_cCphContent_cBtnLogin').click();
    cy.url().should('include', 'search');
  })
  // Search
  it("User can search", function () {
    cy.get(".page-search-result")
    cy.get("#greyBarWrapper")
    cy.get("#query").click()
    cy.get("#query").type('cancer{enter}')
    cy.get(".search-results")
  });
})
```

---

Run

```
$ ./node_modules/.bin/cypress run
```

Note:

Pros
- Run Independently (no Selenium)
- No dependencies
- Fast
- Screenshot for every step
- video

Cons
- Commercial company
- Small comunity

---

## TestCafe
![testcafe]

[testcafe]:https://raw.githubusercontent.com/DevExpress/testcafe-gh-page-assets/master/src/images/testcafe-ogp-icon.png

---

Install

```
$ npm install testcafe --save-dev
```

---

Write some test

```javascript

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
});

```

---

Run Test

```
$ testcafe chrome:headless ./testcafe/search.js
```

Note:

Pro
- Easyest to run
- Cross Browser
- Native events such as upload

Cons
- Less verbose information
- Lack of documentation

---

## Cucumber
![cucumber]
BBD tool to use Gherkin language

[cucumber]:https://crossbrowsertesting.com/crossbrowsertesting/media/images/integrations/cucumber-logo.svg?ext=.svg

---

Install

```
$ npm install cucumber --save-dev
```

---

Folder structure

- Features
- Steps
- Actions

---

Write some test

```

  Scenario: Login in Doctors.net.uk
    Given I open the login page
      And I write user
      And I write password
    When I click the submit button
    Then I see home page

```

(Example: search in Google)

---
Strongs
- Live documentation of requirements. Better input and ouptut
- Decoupling
- Collaborative. Ready for QA
- Technology independent
- Reusing Actions
---

## Tips

- Selector
- Video
- Flashy Cypress
- Flashy TestCafe

---

# When testing

Developing Time Vs Test Time
ASAP

---

# When do we start?

---

Why not Today?

---

# Thans! 
<span style="color:red;font-size:xx-small">[Syntax error detected]</span>

---

# Thanks!

--- 

*References*

<span style="font-size:small">

https://lwn.net/Articles/115530/

https://medium.com/javascript-scene/the-outrageous-cost-of-skipping-tdd-code-reviews-57887064c412

http://www.softtek.com/about/it-industry-success-stories/reduced-cost-and-time-saved-through-implementation-of-a-test-automation-framework

https://github.com/GoogleChrome/puppeteer

https://www.cypress.io/

https://devexpress.github.io/testcafe/

</span>


