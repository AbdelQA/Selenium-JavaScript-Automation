const {By,Key,Builder, until} = require('selenium-webdriver');
const { expect } = require('chai');
const { describe, it, beforeEach, afterEach } = require('mocha');
require('chromedriver');

describe('Conduit Login Scenarios', function() {
    let driver;
    
    beforeEach(async function() {
        driver = new Builder().forBrowser("chrome").build();
        this.timeout(10000);
        //Go to Conduit Page
        await driver.get('https://demo.realworld.io/#/');
    })

    afterEach(async function() {
        await driver.quit();
    })

    it('User can Login with VALID User', async function () {
        //Go to Sign In Page, enter login info and login
        await driver.findElement(By.css('a[ui-sref="app.login"]')).click();
        await driver.findElement(By.css('[placeholder="Email"]')).sendKeys('qaportfolioaz@gmail.com');
        await driver.findElement(By.css('[placeholder="Password"]')).sendKeys('Loveqa!123');
        await driver.findElement(By.css('[type="submit"]')).click();

        //Wait until user logged in and element appears
        await driver.wait(until.elementLocated(By.css('.feed-toggle')), 10000);

        //Verify the user logged in successfully
        const feedToggle = await driver.findElement(By.css('.feed-toggle'));
        const feedToggleText = await feedToggle.getAttribute('textContent');
        expect(feedToggleText).to.include('Your Feed').and.to.include('Global Feed');
    });

    it('User cannot login with INVALID User - Error appears', async function () {
        //Go to Sign In Page, enter login info and login
        await driver.findElement(By.css('a[ui-sref="app.login"]')).click();
        await driver.findElement(By.css('[placeholder="Email"]')).sendKeys('abc@gmail.com');
        await driver.findElement(By.css('[placeholder="Password"]')).sendKeys('abc');
        await driver.findElement(By.css('[type="submit"]')).click();

        //Wait until error message appears
        await driver.wait(until.elementLocated(By.css('[ng-repeat="error in errors"]')), 10000);

        //Verify the user logged in successfully
        const error = await driver.findElement(By.css('[ng-repeat="error in errors"]'));
        const errorMessage = await error.getAttribute('textContent');
        expect(errorMessage).to.include('email or password is invalid');
    });

    it('User cannot login with BLANK EMAIL - Error appears', async function () {
        //Go to Sign In Page, enter login info and login
        await driver.findElement(By.css('a[ui-sref="app.login"]')).click();
        await driver.findElement(By.css('[placeholder="Password"]')).sendKeys('abc');
        await driver.findElement(By.css('[type="submit"]')).click();

        //Wait until error message appears
        await driver.wait(until.elementLocated(By.css('[ng-repeat="error in errors"]')), 10000);

        //Verify the user logged in successfully
        const error = await driver.findElement(By.css('[ng-repeat="error in errors"]'));
        const errorMessage = await error.getAttribute('textContent');
        expect(errorMessage).to.include('email can\'t be blank');
    });

    it('User cannot login with BLANK PASSWORD - Error appears', async function () {
        //Go to Sign In Page, enter login info and login
        await driver.findElement(By.css('a[ui-sref="app.login"]')).click();
        await driver.findElement(By.css('[placeholder="Email"]')).sendKeys('abc@gmail.com');
        await driver.findElement(By.css('[type="submit"]')).click();

        //Wait until error message appears
        await driver.wait(until.elementLocated(By.css('[ng-repeat="error in errors"]')), 10000);

        //Verify the user logged in successfully
        const error = await driver.findElement(By.css('[ng-repeat="error in errors"]'));
        const errorMessage = await error.getAttribute('textContent');
        expect(errorMessage).to.include('password can\'t be blank');
    });
});