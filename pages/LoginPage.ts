import {Page, Locator} from "@playwright/test";

export class Loginpage{

// locator
private readonly page : Page;
private readonly emaiField : Locator;
private readonly passwordField : Locator;
private readonly loginButton : Locator;
private readonly erroMessage : Locator;

// Constractor
constructor(page : Page){

    this.page = page;
    this.emaiField = this.page.locator("#input-email");
    this.passwordField = this.page.locator("#input-password")
    this.loginButton = this.page.locator("input[value='Login']");
    this.erroMessage = this.page.locator('div>div:has-text("Warning: No match for E-Mail Address and/or Password.")');
}

// Actions

/**
 * This Method Fill Email Field For Login App
 * @param fillEmail - Email For User 
 */
async fillEmail(fillEmail : string) : Promise<void> {
await this.emaiField.fill(fillEmail);
}


/**
 * This Method Fill Password Field For Login App
 * @param fillPassword - Password For User 
 */
async fillPassword(password : string) : Promise<void> {
await this.passwordField.fill(password);
}

/**
 * This Method Click on Login Button
 * @param ClickOnloginButton - Successfully Click on Login Button and Login to App
 */
async clickOnLoginButton() : Promise<void> {
await this.loginButton.click();
}

/**
 *  Performs complete login action
     * @param email - Email address to enter
     * @param password - Password to enter
 */
async loginInApp(emai:string , password :string) : Promise<void> {
     await this.fillEmail(emai);
     await this.fillPassword(password);
     await this.clickOnLoginButton();
}


/**
 * This Method For Return Error Messge When Add Wrong Email or Password in Login
 * @param verifyErrormessage -- return Error Message
 */
 async getErrorMessage() : Promise<string | null>
 {
    const erorr = await this.erroMessage.textContent();
       return erorr;
 }



}