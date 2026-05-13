/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { Loginpage } from "../pages/LoginPage";
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let myAccountPage: MyAccountPage;
let loginPage: Loginpage;


test.beforeEach("Navigate to base URL",async ({ page }) => {
    config = new TestConfig;
    await page.goto(config.appUrl);   // Navigate to base URL

    homePage = new HomePage(page)
    homePage = new HomePage(page);
    loginPage = new Loginpage(page);
    myAccountPage = new MyAccountPage(page);
});

test("User Login In App @master @sanity @regression" , async ()=>{
//Navigate to Login page via Home page
   await homePage.cliclOnMyaccount();
   await homePage.cliclOnLoginLink();

//Enter valid credentials and log in   
   await loginPage.fillEmail(config.Email1);
   await loginPage.fillPassword(config.password1);
   await loginPage.clickOnLoginButton();

//alternatevly
    //   await loginPage.loginInApp(config.email, config.password);

// Verify successful login by checking 'My Account' page presence   
    const isLoggedIn =  await myAccountPage.isMyAccountPageExists(); 
    // expect(isLoggedIn).toBe(true);
     expect(isLoggedIn).toBeTruthy();
});

test.afterEach("Closed APP",async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();
});