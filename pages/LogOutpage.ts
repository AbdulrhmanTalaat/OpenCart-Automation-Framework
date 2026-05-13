import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogOutPage {
    // Locator   
    private readonly page: Page;
    private readonly Ms: Locator;
    private readonly BtnCountinue: Locator;

    // Constractor
    constructor(page: Page) {
        this.page = page;
        this.Ms = this.page.locator("div>h1");
        this.BtnCountinue = this.page.locator(".btn.btn-primary");
    }


    // Actions

    /**
        * Verifies if the "Account Logout" is visible
        * @returns Promise<boolean> - Returns true if Header is visible
        */
    async VerifyHeaderLogout(): Promise<boolean> {
        const ms = await this.Ms.textContent();
        return ms?.includes("Account Logout") ?? false;
    }



    /**
        * Clicks the Continue button after logout
        * @returns Promise<HomePage> - Returns instance of HomePage
        */
    async clickContinue(): Promise<HomePage> {
        await this.BtnCountinue.isVisible()
        await this.BtnCountinue.isEnabled()

        await this.BtnCountinue.click();
        return new HomePage(this.page);
    }


}