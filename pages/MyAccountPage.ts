import { Page, Locator, expect } from '@playwright/test';
import { LogOutPage } from './LogOutpage';


export class MyAccountPage {
    private readonly page: Page;

    // Locators using CSS selectors
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;


    // Consractor

    constructor(page: Page) {
        this.page = page;
        this.msgHeading = this.page.locator('h2:has-text("My Account")');
        this.lnkLogout = this.page.getByRole('link', { name: 'Logout' });
        //page.locator("text='Logout'").nth(1);
    }


    // Actions


    /**
     * Verifies if My Account page is displayed
     * @returns Promise<boolean> - Returns true if heading is visible
     */

    async isMyAccountPageExists(): Promise<boolean> {
        try {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        }
        catch (error) {
            console.log(`Error checking My Account page heading visibility: ${error}`);
            return false;
        }
    }


    /**
     * Clicks on Logout link
     * @returns Promise<LogoutPage> - Returns instance of LogoutPage
     */

     async clickOnLogOutLink(): Promise<LogOutPage> {
        await this.lnkLogout.click();
        return new LogOutPage(this.page);
    } 

}