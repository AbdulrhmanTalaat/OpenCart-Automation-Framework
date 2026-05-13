import { Page, Locator } from "@playwright/test";
import { CheckOutPage } from "./CheckOutPage";
export class ShoppingCartPage{

    private readonly page :Page;
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;
    private readonly headerPage : Locator;

// Constractor    
    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators with CSS selectors
        this.lblTotalPrice = this.page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
        this.btnCheckout = this.page.locator("a[class='btn btn-primary']");
        this.headerPage = this.page.locator('div>h1');
    }


// Actions

/**
     * Check Shopping Page Is Visible Or Not
     * @returns Promise<Boolean> Should return True
     */
async shoppingPageIsVisible() : Promise<boolean>
{

    const header = await this.headerPage.textContent();
      return header?.includes('Shopping Cart') ?? false;
}



/**
     * Get the total price from the shopping cart
     * @returns Promise<string | null> - The total price text
     */

async getTotalPrice(): Promise<string | null>
{
        const totalPrice =  await this.lblTotalPrice.textContent();
        return totalPrice;
    
}

/**
     * Click on the Checkout button
     * @returns Promise<CheckoutPage> - CheckoutPage instance
     */
async clickOnCheckout() : Promise<CheckOutPage>
{

      await this.btnCheckout.click();
      return new CheckOutPage(this.page)
}


}