import { test, expect } from "@playwright/test";
import { DataProvider } from "../utils/dataProvider";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { Loginpage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage";

// Load JSON test data logindata.json
const pathFile = "testdata/logindata.json"
const dataJson = DataProvider.getDataFromJsonFile(pathFile);

for (const data of dataJson) {

    test(`Login Test with JSON Data: ${data.testName} @datadriven`, async ({ page }) => {

        // Open URL 
        const config = new TestConfig();
        await page.goto(config.appUrl);


        // Lanch to My Account And Click On login Link
        const homePage = new HomePage(page);
        await homePage.cliclOnMyaccount();
        await homePage.cliclOnLoginLink();

        // Login in APP

        const login = new Loginpage(page);
        await login.fillEmail(data.email);
        await login.fillPassword(data.password);
        await login.clickOnLoginButton();

        if (data.expected.toLowerCase() === "success") {
            const myAccount = new MyAccountPage(page);
            const isExist = await myAccount.isMyAccountPageExists();
            expect(isExist).toBeTruthy();
        }
        else {

            const errorMs = await login.getErrorMessage();
            expect(errorMs).toBe(" Warning: No match for E-Mail Address and/or Password.")
        }

    });
}


// Load CSV test data logindata.CSV
const pathCSV = "testdata/logindata.csv"
const dataCSV = DataProvider.getDataFromCSVFile(pathCSV)

for (const datac of dataCSV) {

    test(`Login Test with CSV Data: ${datac.testName} @datadriven`, async ({ page }) => {

        // Open URL 
        const config = new TestConfig();
        await page.goto(config.appUrl);


        // Lanch to My Account And Click On login Link
        const homePage = new HomePage(page);
        await homePage.cliclOnMyaccount();
        await homePage.cliclOnLoginLink();

        // Login in APP

        const login = new Loginpage(page);
        await login.fillEmail(datac.email);
        await login.fillPassword(datac.password);
        await login.clickOnLoginButton();
        if (datac.expected.toLowerCase() === "success") {
            const myAccount = new MyAccountPage(page);
            const isExist = await myAccount.isMyAccountPageExists();
            expect(isExist).toBeTruthy();
        }
        else {

            const errorMs = await login.getErrorMessage();
            expect(errorMs).toBe(" Warning: No match for E-Mail Address and/or Password.")
        }

    });
} 