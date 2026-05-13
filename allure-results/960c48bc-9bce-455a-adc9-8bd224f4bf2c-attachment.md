# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CheckOut.spec.ts >> CheckOut Page @master @regression
- Location: tests\CheckOut.spec.ts:36:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('input[type=\'radio\']') resolved to 2 elements:
    1) <input type="radio" name="account" value="register" checked="checked"/> aka getByRole('radio', { name: 'Register Account' })
    2) <input type="radio" value="guest" name="account"/> aka getByRole('radio', { name: 'Guest Checkout' })

Call log:
  - waiting for locator('input[type=\'radio\']')

```

# Test source

```ts
  20  |     private readonly txtCity: Locator;
  21  |     private readonly Post_Code: Locator;
  22  |     private readonly drpCountry: Locator;
  23  |     private readonly drpState: Locator;
  24  |     private readonly btnContinueBillingPersonalDetails: Locator;
  25  | 
  26  |     // Step 4 : Delivery Details  Locator 
  27  |     private readonly textTitlebuttonShipping: Locator;
  28  |     private readonly flat_Rate: Locator;
  29  |     private readonly btnContinueshipping_method: Locator;
  30  | 
  31  |     // Step 5: Payment Method 
  32  |     private readonly textTitlePayment: Locator;
  33  |     private readonly codPaymentMethod: Locator;
  34  |     private readonly btnContinuepayment_method: Locator;
  35  |     private readonly termsCondtion: Locator;
  36  | 
  37  |     // Step 6: Confirm Order 
  38  |     private readonly subTotal : Locator;
  39  |     private readonly shippingRate : Locator;
  40  |     private readonly totalPrice: Locator;
  41  |     private readonly confirmorderButton: Locator;
  42  | 
  43  | 
  44  |     // Constructor    
  45  |     constructor(page: Page) {
  46  |         this.page = page;
  47  |         // Step1 : Checkout Options    
  48  |         this.headerTitle = this.page.locator("div>h1");
  49  |         this.CheckoutOptions = this.page.locator("input[type='radio']");
  50  |         this.btnFirstContinue = this.page.locator('#button-account');
  51  |         // Step 2: Billing Details  Locator
  52  |         this.titleBillingDetails = this.page.getByRole('link', { name: 'Step 2: Billing Details ' });
  53  |         this.txtFirstName = this.page.locator('#input-payment-firstname');
  54  |         this.txtLastName = this.page.locator('#input-payment-lastname');
  55  |         this.email = this.page.locator('#input-payment-email');
  56  |         this.telephone = this.page.locator('#input-payment-telephone');
  57  |         this.txtAddress1 = this.page.locator('#input-payment-address-1');
  58  |         this.txtCity = this.page.locator('#input-payment-city');
  59  |         this.Post_Code = this.page.locator('#input-payment-postcode');
  60  |         this.drpCountry = this.page.locator('#input-payment-country option');
  61  |         this.drpState = this.page.locator('#input-payment-zone option');
  62  |         this.btnContinueBillingPersonalDetails = this.page.locator('#button-guest');
  63  | 
  64  |         // Step 4 : Delivery Details  Locator 
  65  |         this.textTitlebuttonShipping = this.page.getByText('Please select the preferred shipping method to use on this order.', { exact: true });
  66  |         this.flat_Rate = this.page.locator("input[name='shipping_method']");
  67  |         this.btnContinueshipping_method = this.page.locator("#button-shipping-method");
  68  | 
  69  |         // Step 5 : Payment Method 
  70  |         this.textTitlePayment = this.page.getByText('Please select the preferred payment method to use on this order.', { exact: true });
  71  |         this.codPaymentMethod = this.page.locator("input[name='payment_method']");
  72  |         this.termsCondtion = this.page.locator("input[name='agree']");
  73  |         this.btnContinuepayment_method = this.page.locator('#button-payment-method');
  74  | 
  75  |         // Step 6: Confirm Order 
  76  |         this.subTotal = this.page.locator('tfoot tr:nth-child(1) td:nth-child(2)');
  77  |         this.shippingRate = this.page.locator('tfoot tr:nth-child(2) td:nth-child(2)');
  78  |         this.totalPrice = this.page.locator("div[id='checkout-checkout'] tr:nth-child(3) td:nth-child(2)");
  79  |         this.confirmorderButton = this.page.locator("button-confirm");
  80  |     }
  81  | 
  82  | 
  83  |     // Actions
  84  | 
  85  | 
  86  |     /**
  87  |          * Check CheckOut Page Is Visible Or Not.
  88  |          * @returns Promise<Boolean> Should return True.
  89  |          */
  90  |     async checkOutPageIsVisible(): Promise<boolean> {
  91  | 
  92  |         const header = await this.headerTitle.textContent();
  93  |         return header?.includes('Checkout') ?? false;
  94  |     }
  95  | 
  96  | 
  97  | 
  98  | 
  99  |     /**
  100 |          * This Method For select Checkout Options:.
  101 |          * Register Account Or Guest Checkout.
  102 |          * @returns select one Radio Button.
  103 |          */
  104 |     /* async chooseCheckoutOption(selectCheckoutOptions: string): Promise<void> {
  105 |         const options = await this.CheckoutOptions.all();
  106 | 
  107 |         for (const option of options) {
  108 |             const text = await option.textContent();
  109 | 
  110 |             if (text?.toLocaleLowerCase() === selectCheckoutOptions) {
  111 |                 await option.click();
  112 |                 break;
  113 |             }
  114 |         }
  115 |     } */
  116 | 
  117 |      // Choose checkout option
  118 |      async chooseCheckoutOption(checkOutOption: string){
  119 |         if (checkOutOption === "Guest Checkout") {
> 120 |             await this.CheckoutOptions.click();
      |                                        ^ Error: locator.click: Error: strict mode violation: locator('input[type=\'radio\']') resolved to 2 elements:
  121 |         }
  122 |     }
  123 | 
  124 | 
  125 |     /**
  126 |      * This Method For Complete First Step.
  127 |      * @param btnFirstContinue - Click on Continue Button.
  128 |      * @returns Step 2: Billing Details.
  129 |      */
  130 |     async clickOnContinueButtonCheckoutOptions(): Promise<void> {
  131 |         await this.btnFirstContinue.click();
  132 | 
  133 |     }
  134 | 
  135 |     /**
  136 |  * Verify that the Title Section Billing Details is Visible.
  137 |  * @returns True if Step 2: Billing Details is Appear Correctly.
  138 |  */
  139 | 
  140 | async verifyTitleBillingDetailsIsVisible () : Promise<boolean>
  141 | {
  142 |      const shippingmethod = await  this.titleBillingDetails.textContent();
  143 |      return shippingmethod?.includes("Step 2: Billing Details ") ?? false;
  144 | }
  145 | 
  146 | /**
  147 |  * This Method fills customer billing details.
  148 |  * in Checkout Step 2: Billing Details.
  149 |  * Fill FirstName , LastName , Email , Telephone.
  150 |  * @param firstName - Customer first name.
  151 |  * @param lastName - Customer last name.
  152 |  * @param email - Customer email address.
  153 |  * @param telephone - Customer phone number.
  154 |  */
  155 | async fillYourPersonalDetails(FillFirstName : string, FilllastName : string , FillEmail : string , FillTelephone : string): Promise<void> {
  156 |     await this.txtFirstName.fill(FillFirstName);
  157 |     await this.txtLastName.fill(FilllastName);
  158 |     await this.email.fill(FillEmail);
  159 |     await this.telephone.fill(FillTelephone);
  160 | }
  161 | 
  162 | /**
  163 |  * This Method fills customer Address details.
  164 |  * in Checkout Step 2: Billing Details.
  165 |  * Fill Address1 , City , PostCode.
  166 |  * @param address - Customer address.
  167 |  * @param city - Customer city.
  168 |  * @param postCode - Customer postal code.
  169 |  */
  170 | async fillYourAddress(FillAddress1 : string, FillCity : string , FillPostCode : string): Promise<void> {
  171 |     await this.txtAddress1.fill(FillAddress1);
  172 |     await this.txtCity.fill(FillCity);
  173 |     await this.Post_Code.fill(FillPostCode);
  174 | }
  175 | 
  176 | /**
  177 |  * This Method fills customer Address details.
  178 |  * Select country and state/region from dropdown lists.
  179 |  * @param country - Country name.
  180 |  * @param state - State or region name.
  181 |  * @returns Select billing address location.
  182 |  */
  183 | async setCountry(country: string , state : string){
  184 |     await this.drpCountry.selectOption(country)
  185 |     await this.drpState.selectOption({ label: state });
  186 | }
  187 | 
  188 | /**
  189 |      * This Method For Complete Step 2: Billing Details 
  190 |      * @param btnContinueBillingPersonalDetails - Click on Continue Button
  191 |      * @returns Step 4: Delivery Details
  192 |      */
  193 | async clickOnbtnContinueBillingPersonalDetails(): Promise<void> {
  194 |     await this.btnContinueBillingPersonalDetails.click();
  195 | }
  196 | 
  197 | /**
  198 |  * Verify that the Flat Rate shipping option is selected By Default.
  199 |  * @returns True if Flat Rate radio button is checked.
  200 |  */
  201 | 
  202 | async verifyFlatRateisCheced() : Promise<boolean>
  203 | {
  204 |      await  this.flat_Rate.isChecked()
  205 |      return true;
  206 | }
  207 | 
  208 | /**
  209 |  * Verify that the Delivery Details is Visible
  210 |  *
  211 |  * @returns True if Message shippingmethod Appear Correctly
  212 |  */
  213 | 
  214 | async verifyMsshippingmethodIsVisible() : Promise<boolean>
  215 | {
  216 |      const shippingmethod = await this.textTitlebuttonShipping.textContent();
  217 |      return shippingmethod?.includes("Please select the preferred shipping method to use on this order.") ?? false;
  218 | }
  219 | 
  220 | 
```