import { Page, Locator } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage"

export class ProductPage {

    private readonly page: Page;

    // Locators using CSS selectors
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;


    // Constractor
    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtQuantity = this.page.locator('#input-quantity');
        this.btnAddToCart = this.page.locator('#button-cart');
        this.cnfMsg = this.page.locator('.alert.alert-success.alert-dismissible');
        this.btnItems = this.page.locator('#cart');
        this.lnkViewCart = this.page.locator('div>p>a>strong:has-text("View Cart")');
    }

    // action Method

    /**
         * Sets the product quantity
         * @param qty - Quantity to set
         */
    async setQuantity(Add_Qty: string): Promise<void> {
        await this.txtQuantity.fill(Add_Qty);
    }


    /**
     * Adds product to cart
     * click on Add To Cart Button
     */

    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Checks if confirmation message is visible
     * @returns Promise<boolean> - Returns true if message is visible
     */
    async isConfirmationMessageVisible(): Promise<boolean> {
        /*  await this.cnfMsg.isVisible();
         return true */
        const con = await this.cnfMsg.textContent();
        return con?.includes("Success: You have added ") ?? false
    }

    /**
         * Clicks on Items button to navigate to cart
         */
    async clickItemsToNavigateToCart(): Promise<void> {
        await this.btnItems.click();
    }

    /**
     * Clicks on View Cart link
     * @returns Promise<ShoppingCartPage> - Returns ShoppingCartPage instance
     */
    async clickViewCart(): Promise<ShoppingCartPage> {
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

    /**
         * Complete workflow to add product to cart.
         * @param quantity - Set Quantity of product to add.
         * @returns Promise<boolean> - True If Message Visible Correct.
         */
    async addProductToCart(quantity: string): Promise<boolean> {
        await this.setQuantity(quantity);
        await this.addToCart();
       const confirmation= await this.isConfirmationMessageVisible();
       return confirmation;
    }

}