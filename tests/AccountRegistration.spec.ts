/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';



let page: Page;
let context: BrowserContext;

test.beforeEach("Lanch To URL", async ({ browser }) => {
     context = await browser.newContext();
     page = await context.newPage();

     //Navigate to application URL
     const testConfig = new TestConfig();
     await page.goto(testConfig.appUrl);
});



test("User Register IN App @master @sanity @regression", async () => {

     const homepage = new HomePage(page);

     // Verify Home Page is visible
     const pageVisible = await homepage.verifyHomePageExist();
     console.log("Home Page is Visibale :", pageVisible);

     // Go to 'My Account' and click 'Register'
     await homepage.cliclOnMyaccount();
     await homepage.cliclOnRegisterLink();

     //Fill in registration details with random data

     const register = new RegistrationPage(page);
     const email =RandomDataUtil.getEmail();
     console.log(`Email = ${email}`)
     await register.fillPersonalDetails(RandomDataUtil.getFirstName(), RandomDataUtil.getlastName(),
          email, RandomDataUtil.getPhoneNumber());

     // Fill in password and confirm password fields with random password
     const password = RandomDataUtil.getRandomPassword(10);
     await register.fillPassword(password, password);
     console.log(`password = ${password}`)

     //Agree to Privacy Policy and submit the form
     await register.selectNewsletterOption("yes");
     await register.acceptPrivacyPolicy();
     await register.clickContinue();

     // Validate the confirmation message
     const successMessage = await register.verifyRegistrationSuccess();
     //console.log("Success Message is :", successMessage);
     expect(successMessage).toBe("Your Account Has Been Created!");

     // Click Continue Button 2 after registration success
     await register.clickContinueButton2();

});



test.afterAll("Closed App", async () => {
     await page.waitForTimeout(5000);
     await page.close();
});