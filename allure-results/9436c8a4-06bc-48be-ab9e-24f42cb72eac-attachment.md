# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CheckOut.spec.ts >> CheckOut Page @master @regression
- Location: tests\CheckOut.spec.ts:36:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('#input-payment-firstname')
    - locator resolved to <input value="" type="text" name="firstname" class="form-control" placeholder="First Name" id="input-payment-firstname"/>
    - fill("Barrows")
  - attempting fill action
    2 × waiting for element to be visible, enabled and editable
      - element is not visible
    - retrying fill action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and editable
      - element is not visible
    - retrying fill action
      - waiting 100ms
    73 × waiting for element to be visible, enabled and editable
       - element is not visible
     - retrying fill action
       - waiting 500ms

```

# Test source

```ts
  58  |         this.telephone = this.page.locator('#input-payment-telephone');
  59  |         this.txtAddress1 = this.page.locator('#input-payment-address-1');
  60  |         this.txtCity = this.page.locator('#input-payment-city');
  61  |         this.Post_Code = this.page.locator('#input-payment-postcode');
  62  |         this.drpCountry = this.page.locator('#input-payment-country');
  63  |         this.drpState = this.page.locator('#input-payment-zone');
  64  |         this.btnContinueBillingPersonalDetails = this.page.locator('#button-guest');
  65  | 
  66  |         // Step 4 : Delivery Details  Locator 
  67  |         this.textTitlebuttonShipping = this.page.getByText('Please select the preferred shipping method to use on this order.', { exact: true });
  68  |         this.flat_Rate = this.page.locator("input[name='shipping_method']");
  69  |         this.btnContinueshipping_method = this.page.locator("#button-shipping-method");
  70  | 
  71  |         // Step 5 : Payment Method 
  72  |         this.textTitlePayment = this.page.getByText('Please select the preferred payment method to use on this order.', { exact: true });
  73  |         this.codPaymentMethod = this.page.locator("input[name='payment_method']");
  74  |         this.termsCondtion = this.page.locator("input[name='agree']");
  75  |         this.btnContinuepayment_method = this.page.locator('#button-payment-method');
  76  | 
  77  |         // Step 6: Confirm Order 
  78  |         this.subTotal = this.page.locator('tfoot tr:nth-child(1) td:nth-child(2)');
  79  |         this.shippingRate = this.page.locator('tfoot tr:nth-child(2) td:nth-child(2)');
  80  |         this.totalPrice = this.page.locator("div[id='checkout-checkout'] tr:nth-child(3) td:nth-child(2)");
  81  |         this.confirmorderButton = this.page.locator("button-confirm");
  82  |     }
  83  | 
  84  | 
  85  |     // Actions
  86  | 
  87  | 
  88  |     /**
  89  |          * Check CheckOut Page Is Visible Or Not.
  90  |          * @returns Promise<Boolean> Should return True.
  91  |          */
  92  |     async checkOutPageIsVisible(): Promise<boolean> {
  93  | 
  94  |         const header = await this.headerTitle.textContent();
  95  |         return header?.includes('Checkout') ?? false;
  96  |     }
  97  | 
  98  | 
  99  | 
  100 | 
  101 |     /**
  102 |          * This Method For select Checkout Options:.
  103 |          * Register Account Or Guest Checkout.
  104 |          * @returns select one Radio Button.
  105 |          */
  106 |     /* async chooseCheckoutOption(selectCheckoutOptions: string): Promise<void> {
  107 |         const options = await this.CheckoutOptions.all();
  108 | 
  109 |         for (const option of options) {
  110 |             const text = await option.textContent();
  111 | 
  112 |             if (text?.toLocaleLowerCase() === selectCheckoutOptions) {
  113 |                 await option.click();
  114 |                 break;
  115 |             }
  116 |         }
  117 |     } */
  118 | 
  119 |      // Choose checkout option
  120 |      async chooseCheckoutOption(checkOutOption: string){
  121 |         if (checkOutOption === "Guest Checkout") {
  122 |             await this.CheckoutOptions.click();
  123 |         }
  124 |     }
  125 | 
  126 | 
  127 |     /**
  128 |      * This Method For Complete First Step.
  129 |      * @param btnFirstContinue - Click on Continue Button.
  130 |      * @returns Step 2: Billing Details.
  131 |      */
  132 |      async clickOnContinueButtonCheckoutOptions(): Promise<void> {
  133 |         await this.btnFirstContinue.waitFor({ state: "visible"});
  134 |         await this.btnFirstContinue.click(({ force: true }))
  135 |     } 
  136 | 
  137 |     /**
  138 |  * Verify that the Title Section Billing Details is Visible.
  139 |  * @returns True if Step 2: Billing Details is Appear Correctly.
  140 |  */
  141 | 
  142 | async verifyTitleBillingDetailsIsVisible () : Promise<boolean>
  143 | {
  144 |      const shippingmethod = await  this.titleBillingDetails.textContent();
  145 |      return shippingmethod?.includes("Step 2: Billing Details ") ?? false;
  146 | }
  147 | 
  148 | /**
  149 |  * This Method fills customer billing details.
  150 |  * in Checkout Step 2: Billing Details.
  151 |  * Fill FirstName , LastName , Email , Telephone.
  152 |  * @param firstName - Customer first name.
  153 |  * @param lastName - Customer last name.
  154 |  * @param email - Customer email address.
  155 |  * @param telephone - Customer phone number.
  156 |  */
  157 | async fillYourPersonalDetails(FillFirstName : string, FilllastName : string , FillEmail : string , FillTelephone : string): Promise<void> {
> 158 |     await this.txtFirstName.fill(FillFirstName);
      |                             ^ Error: locator.fill: Target page, context or browser has been closed
  159 |     await this.txtLastName.fill(FilllastName);
  160 |     await this.email.fill(FillEmail);
  161 |     await this.telephone.fill(FillTelephone);
  162 | }
  163 | 
  164 | /**
  165 |  * This Method fills customer Address details.
  166 |  * in Checkout Step 2: Billing Details.
  167 |  * Fill Address1 , City , PostCode.
  168 |  * @param address - Customer address.
  169 |  * @param city - Customer city.
  170 |  * @param postCode - Customer postal code.
  171 |  */
  172 | async fillYourAddress(FillAddress1 : string, FillCity : string , FillPostCode : string): Promise<void> {
  173 |     await this.txtAddress1.fill(FillAddress1);
  174 |     await this.txtCity.fill(FillCity);
  175 |     await this.Post_Code.fill(FillPostCode);
  176 | }
  177 | 
  178 | /**
  179 |  * This Method fills customer Address details.
  180 |  * Select country and state/region from dropdown lists.
  181 |  * @param country - Country name.
  182 |  * @param state - State or region name.
  183 |  * @returns Select billing address location.
  184 |  */
  185 | async setCountry(country: string , state : string){
  186 |     await this.drpCountry.selectOption({ label: country })
  187 |     await this.drpState.selectOption({ label: state });
  188 | }
  189 | 
  190 | /**
  191 |      * This Method For Complete Step 2: Billing Details 
  192 |      * @param btnContinueBillingPersonalDetails - Click on Continue Button
  193 |      * @returns Step 4: Delivery Details
  194 |      */
  195 | async clickOnbtnContinueBillingPersonalDetails(): Promise<void> {
  196 |     await this.btnContinueBillingPersonalDetails.click();
  197 | }
  198 | 
  199 | /**
  200 |  * Verify that the Flat Rate shipping option is selected By Default.
  201 |  * @returns True if Flat Rate radio button is checked.
  202 |  */
  203 | 
  204 | async verifyFlatRateisCheced() : Promise<boolean>
  205 | {
  206 |      await  this.flat_Rate.isChecked()
  207 |      return true;
  208 | }
  209 | 
  210 | /**
  211 |  * Verify that the Delivery Details is Visible
  212 |  *
  213 |  * @returns True if Message shippingmethod Appear Correctly
  214 |  */
  215 | 
  216 | async verifyMsshippingmethodIsVisible() : Promise<boolean>
  217 | {
  218 |      const shippingmethod = await this.textTitlebuttonShipping.textContent();
  219 |      return shippingmethod?.includes("Please select the preferred shipping method to use on this order.") ?? false;
  220 | }
  221 | 
  222 | 
  223 |  /**
  224 |      * This Method For Complete Step 4: Delivery Method .
  225 |      * Continue Button.
  226 |      * @returns Step 5: Payment Method .
  227 |      */
  228 |  async clickOnContinueButtonshipping_method(): Promise<void> {
  229 |     await this.btnContinueshipping_method.click();
  230 | }
  231 | 
  232 | /**
  233 |  * Verify that the "Cash On Delivery" option is selected By Default.
  234 |  * @returns True if Flat Rate radio button is checked.
  235 |  */
  236 | 
  237 | async verifyCashOnDeliveryisCheced() : Promise<boolean>
  238 | {
  239 |      await  this.codPaymentMethod.isChecked()
  240 |      return true;
  241 | }
  242 | 
  243 | /**
  244 |  * This Method Select Terms & Conditions .
  245 |  * @param termsCondtion - click to Select.
  246 |  */
  247 | async selectTermsandCondtions() : Promise<void>{
  248 |     await this.termsCondtion.check()
  249 | 
  250 | }
  251 | 
  252 | 
  253 | /**
  254 |      * This Method For Complete Step 5: Payment Method.
  255 |      * Continue Button.
  256 |      * @returns Step 6: Confirm Order .
  257 |      */
  258 | async clickOnContinueButtonPayment_method(): Promise<void> {
```