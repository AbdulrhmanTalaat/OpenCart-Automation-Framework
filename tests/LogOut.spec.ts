/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import {test , expect} from "@playwright/test";
import {TestConfig} from "../test.config";
import {HomePage} from "../pages/HomePage";
import {Loginpage} from "../pages/LoginPage";
import {MyAccountPage} from "../pages/MyAccountPage";
import {LogOutPage} from "../pages/LogOutpage";


let config : TestConfig;
let homePage : HomePage;
let loginPage : Loginpage;
let myAccountPage : MyAccountPage;
let logOut : LogOutPage;


test.beforeEach("Lanch to URL" , async({page})=>{
    config = new TestConfig ;
    // 1) Navigate to the application URL
     page.goto(config.appUrl)

      // Initialize page objects
  homePage = new HomePage(page);
  loginPage = new Loginpage(page);
  myAccountPage = new MyAccountPage(page);

   // logOut = new LogOutPage(page);
})

test('User logout test @master @regression', async () => {
 
    //  2) Go to Login page from Home page
    await homePage.cliclOnMyaccount();
    await homePage.cliclOnLoginLink();

    // 3) Login with valid credentials
    await loginPage.loginInApp(config.Email1 , config.password1);

    // 4) Verify 'My Account' page
    const pageMyaccountVisible = await myAccountPage.isMyAccountPageExists();
    expect(pageMyaccountVisible).toBeTruthy();

    // 5) Click on Logout link
    logOut = await myAccountPage.clickOnLogOutLink();

    // 6) Click on Continue button
    await logOut.VerifyHeaderLogout();

    // 7) Verify user is redirected to Home Page
   const homepageExisit =  await homePage.verifyHomePageExist()
   expect(homepageExisit).toBeTruthy();
   console.log(`Home Page is Visible ${homepageExisit}`)

});

test.afterEach("Closed APP",async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();
});