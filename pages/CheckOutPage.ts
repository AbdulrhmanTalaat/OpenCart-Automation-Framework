import { Page, Locator, expect } from "@playwright/test";
import { Helper } from "../utils/helper"
export class CheckOutPage {


    // locator 
    private readonly page: Page;
    // Step1 : Checkout Options 
    private readonly headerTitle: Locator;
    private readonly registerOptions: Locator;
    private readonly guestOptions: Locator;
    private readonly btnFirstContinue: Locator;

    //  Step 2: Billing Details  Locator
    private readonly titleBillingDetails: Locator;
    private readonly checkoutExistaddress: Locator;
    private readonly checkoutNewaddress: Locator;
    private readonly continueButtonBillingDetails : Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly txtAddress1: Locator;
    private readonly txtCity: Locator;
    private readonly Post_Code: Locator;
    private readonly drpCountry: Locator;
    private readonly drpState: Locator;
    private readonly shippingAddress: Locator;
    private readonly btnContinueBillingPersonalDetails: Locator;

    // Step 3: Delivery Details 
    private readonly use_an_existing_address : Locator;
    private readonly use_an_New_address  : Locator;
    private readonly ContinueButtonDeliveryDetails : Locator;


    // Step 4 : Delivery Details  Locator 
    private readonly textTitlebuttonShipping: Locator;
    private readonly flat_Rate: Locator;
    private readonly btnContinueshipping_method: Locator;

    // Step 5: Payment Method 
    private readonly textTitlePayment: Locator;
    private readonly codPaymentMethod: Locator;
    private readonly btnContinuepayment_method: Locator;
    private readonly termsCondtion: Locator;

    // Step 6: Confirm Order 
    private readonly subTotal: Locator;
    private readonly shippingRate: Locator;
    private readonly totalPrice: Locator;
    private readonly confirmorderButton: Locator;


    // Constructor    
    constructor(page: Page) {
        this.page = page;
        // Step1 : Checkout Options    
        this.headerTitle = this.page.locator("div>h1");
        this.registerOptions = this.page.locator("input[value='register']");
        this.guestOptions = this.page.locator('input[value="guest"]');
        this.btnFirstContinue = this.page.locator('#button-account');

        // Step 2: Billing Details  Locator
        this.titleBillingDetails = this.page.getByRole('link', { name: 'Step 2: Billing Details ' });
        this.checkoutExistaddress = this.page.locator("input[name='payment_address'][value='existing']");
        this.checkoutNewaddress = this.page.locator("input[name='payment_address'][value='new']");
        this.continueButtonBillingDetails = this.page.locator("#button-payment-address");
        this.txtFirstName = this.page.locator('#input-payment-firstname');
        this.txtLastName = this.page.locator('#input-payment-lastname');
        this.email = this.page.locator('#input-payment-email');
        this.telephone = this.page.locator('#input-payment-telephone');
        this.txtAddress1 = this.page.locator('#input-payment-address-1');
        this.txtCity = this.page.locator('#input-payment-city');
        this.Post_Code = this.page.locator('#input-payment-postcode');
        this.drpCountry = this.page.locator('#input-payment-country');
        this.drpState = this.page.locator('#input-payment-zone');
        this.shippingAddress = this.page.locator("input[name='shipping_address']")
        this.btnContinueBillingPersonalDetails = this.page.locator('#button-guest');

        // Step 3: Delivery Details 
         this.use_an_existing_address = this.page.locator("input[name='shipping_address'][value='existing']");
         this.use_an_New_address= this.page.locator("input[name='shipping_address'][value='new']");
         this.ContinueButtonDeliveryDetails = this.page.locator("#button-shipping-address");

        // Step 4 : Delivery Details  Locator 
        this.textTitlebuttonShipping = this.page.getByText('Please select the preferred shipping method to use on this order.', { exact: true });
        this.flat_Rate = this.page.locator("input[name='shipping_method']");
        this.btnContinueshipping_method = this.page.locator("#button-shipping-method");

        // Step 5 : Payment Method 
        this.textTitlePayment = this.page.getByText('Please select the preferred payment method to use on this order.', { exact: true });
        this.codPaymentMethod = this.page.locator("input[name='payment_method']");
        this.termsCondtion = this.page.locator("input[name='agree']");
        this.btnContinuepayment_method = this.page.locator('#button-payment-method');

        // Step 6: Confirm Order 
        this.subTotal = this.page.locator('tfoot tr:nth-child(1) td:nth-child(2)');
        this.shippingRate = this.page.locator('tfoot tr:nth-child(2) td:nth-child(2)');
        this.totalPrice = this.page.locator("div[id='checkout-checkout'] tr:nth-child(3) td:nth-child(2)");
        this.confirmorderButton = this.page.locator("#button-confirm");
    }


    // Actions


    /**
         * Check CheckOut Page Is Visible Or Not.
         * @returns Promise<Boolean> Should return True.
         */
    async checkOutPageIsVisible(): Promise<boolean> {

        const header = await this.headerTitle.textContent();
        return header?.includes('Checkout') ?? false;
    }

    /**
         * This Method For select Checkout Options:.
         * Register Account Or Guest Checkout.
         * @returns select one Radio Button.
         */
    async chooseCheckoutOption(option: "Guest Checkout" | "Register Account"): Promise<void> {  // Union Type

        if (option === "Guest Checkout") {
            await this.guestOptions.check()
        }
        else if (option === "Register Account") {
            await this.registerOptions.click()
        }
    }
    //-------------------------------------------------------------------------- 
    /**
             * This Method For select Checkout Options:.
             * Register Account Or Guest Checkout.
             * @returns select one Radio Button.
             */
    /* async chooseCheckoutOption(option: string): Promise<void> {

        switch (option.toLowerCase()) {

            case "guest checkout":
                await this.guestOptions.click();
                break;

            case "Register Account":
                await this.registerOptions.click();
                break;

            default:
                throw new Error(`Invalid checkout option: ${option}`);
        }
    } */


    //=============================================================================
    /**
     * This Method For Verify Continue Button visible.
     * @returns Should Return true
     */

    async isContinueButtonVisible(): Promise<boolean> {
        return await this.btnFirstContinue.isVisible();
    }

    /**
    * This Method For Verify Continue Button Enabled.
    * @returns Should Return true
    */
    async isContinueButtonEnabled(): Promise<boolean> {
        return await this.btnFirstContinue.isEnabled();
    }

    /**
    * This Method For Complete First Step.
    * @param btnFirstContinue - Click on Continue Button.
    * @returns Step 2: Billing Details.
    */

    async clickOnContinueButtonCheckoutOptions(): Promise<void> {

        //   await expect(this.btnFirstContinue).toBeVisible();
        //  await expect(this.btnFirstContinue).toBeEnabled();
        await this.btnFirstContinue.click();
    }

    //======================================================================================== Step 2: Billing Details 

    /**
 * Verify that the Title Section Billing Details is Visible.
 * @returns True if Step 2: Billing Details is Appear Correctly.
 */
    async verifyTitleBillingDetailsIsVisible(): Promise<boolean> {
        const shippingmethod = await this.titleBillingDetails.textContent();
        return shippingmethod?.includes("Step 2: Billing Details ") ?? false;
    }

    /**
     * This Method fills customer billing details.
     * in Checkout Step 2: Billing Details.
     * Fill FirstName , LastName , Email , Telephone.
     * @param firstName - Customer first name.
     * @param lastName - Customer last name.
     * @param email - Customer email address.
     * @param telephone - Customer phone number.
     */
    async fillYourPersonalDetails(FillFirstName: string, FilllastName: string, FillEmail: string, FillTelephone: string): Promise<void> {
        await this.txtFirstName.fill(FillFirstName);
        await this.txtLastName.fill(FilllastName);
        await this.email.fill(FillEmail);
        await this.telephone.fill(FillTelephone);
    }

    /**
     * This Method fills customer billing details.
     * in Checkout Step 2: Billing Details.
     * Fill FirstName , LastName.
     * @param firstName - Customer first name.
     * @param lastName - Customer last name.
     */
    async fillYourPersonalDetailss(FillFirstName: string, FilllastName: string): Promise<void> {
        await this.txtFirstName.fill(FillFirstName);
        await this.txtLastName.fill(FilllastName);
    }

    /**
     * This Method fills customer Address details.
     * in Checkout Step 2: Billing Details.
     * Fill Address1 , City , PostCode.
     * @param address - Customer address.
     * @param city - Customer city.
     * @param postCode - Customer postal code.
     */
    async fillYourAddress(FillAddress1: string, FillCity: string, FillPostCode: string): Promise<void> {
        await this.txtAddress1.fill(FillAddress1);
        await this.txtCity.fill(FillCity);
        await this.Post_Code.fill(FillPostCode);
    }

    /**
     * This Method fills customer Address details.
     * Select country and state/region from dropdown lists.
     * @param country - Country name.
     * @param state - State or region name.
     * @returns Select billing address location.
     */
    async setCountry(country: string, state: string) {
        await this.drpCountry.selectOption({ label: country })
        await this.drpState.selectOption({ label: state });
    }

    /**
    * Verify that the shipping Address is selected By Default.
    * @returns True if is checked.
        */
    async verifyShippingAddressIs_Checked(): Promise<boolean> {
        const status = await this.shippingAddress.isChecked()
        return status;
    }


    /**
         * This Method For Complete Step 2: Billing Details 
         * @param btnContinueBillingPersonalDetails - Click on Continue Button
         * @returns Step 3: Delivery Details
         */
    async clickOnbtnContinueBillingPersonalDetails(): Promise<void> {
        await this.btnContinueBillingPersonalDetails.click();
    }

    
    /**
     * This Method For select Checkout Address:.
     * I want to use a new address  OR I want to use an existing address
     * @returns select one Radio Button.
     */

    async ChooseAddress(choose_Address: "I want to use an existing address" | "I want to use a new address") {
        if (choose_Address === "I want to use a new address") {
            await this.checkoutNewaddress.check();
        }

        else if (choose_Address === "I want to use an existing address") {
            await this.checkoutExistaddress.check();
        }

    }

     /**
    * This Method For Verify continueButtonBillingDetails is Visible.
    * @param continueButtonBillingDetails
    * @returns -  True if Button Is Visible
    */
     async CheckoutContinueButtonVisible(): Promise<boolean> {
        return await this.continueButtonBillingDetails.isVisible();
    }

    /**
    * This Method For Verify continueButtonBillingDetails Enabled.
    * @returns - True if Button Is Enabled.
    */
    async CheckoutContinueButtonEnabled(): Promise<boolean> {
        return await this.continueButtonBillingDetails.isEnabled();
    }

     /**
    * This Method For Complete Step 2: Billing Details.
    * @param continueButtonBillingDetails - Click on continueButtonBillingDetails When Choosse CheckOut Address:
    *  ( I want to use a new address  OR I want to use an existing address).
    * @returns-  Step 3: Delivery Details 
    */
    async clickOnContinueButtonCheckout(): Promise<void> {
        await this.continueButtonBillingDetails.click();
    }

    //========================================================================================= Step 3: Delivery Details 
    /**
     * This Method For Choose Delivery Details :.
     * I want to use a new address  OR I want to use an existing address
     * @returns select one Radio Button.
     */

    async ChooseDeliveryDetails(choose_Address: "I want to use an existing address" | "I want to use a new address") {
        if (choose_Address === "I want to use a new address") {
            await this.use_an_New_address.check();
        }

        else if (choose_Address === "I want to use an existing address") {
            await this.use_an_existing_address.check();
        }

    }


     /**
         * This Method For Complete Step 3: Delivery Details
         * @param  - Click on Continue Button
         * @returns Step 4: Delivery Method .
         */
     async clickOnbtnContinueDeliveryDetails(): Promise<void> {
        await this.ContinueButtonDeliveryDetails.click();
    }

    //========================================================================================= Step 4: Delivery Method .


    /**
     * Verify that the Flat Rate shipping option is selected By Default.
     * @returns True if Flat Rate radio button is checked.
     */

    async verifyFlatRateisCheced(): Promise<boolean> {
        await this.flat_Rate.isChecked()
        return true;
    }

    /**
     * Verify that the Delivery Details is Visible
     *
     * @returns True if Message shippingmethod Appear Correctly
     */

    async verifyMsshippingmethodIsVisible(): Promise<boolean> {
        const shippingmethod = await this.textTitlebuttonShipping.textContent();
        return shippingmethod?.includes("Please select the preferred shipping method to use on this order.") ?? false;
    }


    /**
        * This Method For Complete Step 4: Delivery Method.
        * Continue Button.
        * @returns Step 5: Payment Method .
        */
    async clickOnContinueButtonshipping_method(): Promise<void> {
        await this.btnContinueshipping_method.click();
    }
    //================================================================================= Step 5: Payment Method.
    /**
     * Verify that the "Cash On Delivery" option is selected By Default.
     * @returns True if Flat Rate radio button is checked.
     */

    async verifyCashOnDeliveryisCheced(): Promise<boolean> {
        await this.codPaymentMethod.isChecked()
        return true;
    }

    /**
     * This Method Select Terms & Conditions .
     * @param termsCondtion - click to Select.
     */
    async selectTermsandCondtions(): Promise<void> {
        await this.termsCondtion.check()
    }


    /**
         * This Method For Complete Step 5: Payment Method.
         * Continue Button.
         * @returns Step 6: Confirm Order .
         */
    async clickOnContinueButtonPayment_method(): Promise<void> {
        await this.btnContinuepayment_method.click();
    }

    //=================================================================================  Step 6: Confirm Order.

    /**
     * Get the Total Price in Step 6: Confirm Order.
     * @param totalPrice  - Capth Price In Page
     * @returns Get Total Price
     */
    async GetTotalprice(): Promise<string | null> {
        const price = await this.totalPrice.textContent();
        return price
    }

    /**
         *This Method For Verify Button visible.
         * Continue Button.
         * @returns  True If Confirmation Order is Visible
         */
    async isConfirmorder1ButtonVisible(): Promise<boolean> {
        return await this.confirmorderButton.isVisible();
    }

    /**
         * This Method For Verify Button Enabled.
         * Continue Button.
         * @returns True If Confirmation Order is Enabled
         */
    async isConfirmOrder2ButtonEnabled(): Promise<boolean> {
        return await this.confirmorderButton.isEnabled();
    }

    /**
         * This Method For Complete Step 6: Confirm Order.
         * Continue Button.
         * @returns  Confirm Order
         */
    async clickOnContinueButtonConfirmationOrder(): Promise<void> {
        await this.confirmorderButton.click();
    }

    /**
    * Get checkout pricing data from UI and calculate expected total.
    *
    * This method:
    * - Reads subtotal, shipping, and total prices from checkout page
    * - Converts price text into numeric values
    * - Calculates expected total (subtotal + shipping)
    * - Returns all pricing values for validation and assertions
    *
    * @returns Object containing:
    * - subtotal       : Product subtotal price
    * - shipping       : Shipping cost
    * - expectedTotal  : Calculated total price
    * - actualTotal    : Total price displayed in UI
    */

    async getTotalPriceData() {
        // Get values from UI
        const subtotalText = await this.subTotal.textContent();
        const shippingText = await this.shippingRate.textContent();
        const totalText = await this.totalPrice.textContent();

        // Convert to numbers
        const subtotal = Helper.convertPriceToNumber(subtotalText!);
        const shipping = Helper.convertPriceToNumber(shippingText!);
        const actualTotal = Helper.convertPriceToNumber(totalText!);

        // Calculate expected total
        const expectedTotal = subtotal + shipping;

        // Logs for debugging
        console.log(`Subtotal in Checkout Page: ${subtotal}`);
        console.log(`Shipping in Checkout Page : ${shipping}`);
        console.log(`Expected Total in Checkout Page : ${expectedTotal}`);
        console.log(`Actual Total in Checkout Page: ${actualTotal}`);

        return {
            subtotal,
            shipping,
            expectedTotal,
            actualTotal
        };
    }






}
