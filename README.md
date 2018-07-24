# m3.intl.strinder-controller-test
Test for the search page

## Puppeteer

### Install
npm install puppeteer
npm install jest

### Setup
Add to the package.json
 ```json
   "jest": {
    "testRegex": "/puppeteer/.*"
  }
  ```
Create the file /puppeteer/search.js

## Cypress

### Install
npm install cypress

### Setup
Create the configuration file cypress.json
 ```json
{
  "chromeWebSecurity": false
}
 ```
Create the folder cypress with the *.js files with the testing features

## Test Cafe

### Install
npm install testcafe

### Run
Run command testcafe [browser] file

