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
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('button-confirm')

```

# Test source

```ts
  184 |  * @param country - Country name.
  185 |  * @param state - State or region name.
  186 |  * @returns Select billing address location.
  187 |  */
  188 | async setCountry(country: string , state : string){
  189 |     await this.drpCountry.selectOption({ label: country })
  190 |     await this.drpState.selectOption({ label: state });
  191 | }
  192 | 
  193 | /**
  194 |      * This Method For Complete Step 2: Billing Details 
  195 |      * @param btnContinueBillingPersonalDetails - Click on Continue Button
  196 |      * @returns Step 4: Delivery Details
  197 |      */
  198 | async clickOnbtnContinueBillingPersonalDetails(): Promise<void> {
  199 |     await this.btnContinueBillingPersonalDetails.click();
  200 | }
  201 | 
  202 | /**
  203 |  * Verify that the Flat Rate shipping option is selected By Default.
  204 |  * @returns True if Flat Rate radio button is checked.
  205 |  */
  206 | 
  207 | async verifyFlatRateisCheced() : Promise<boolean>
  208 | {
  209 |      await  this.flat_Rate.isChecked()
  210 |      return true;
  211 | }
  212 | 
  213 | /**
  214 |  * Verify that the Delivery Details is Visible
  215 |  *
  216 |  * @returns True if Message shippingmethod Appear Correctly
  217 |  */
  218 | 
  219 | async verifyMsshippingmethodIsVisible() : Promise<boolean>
  220 | {
  221 |      const shippingmethod = await this.textTitlebuttonShipping.textContent();
  222 |      return shippingmethod?.includes("Please select the preferred shipping method to use on this order.") ?? false;
  223 | }
  224 | 
  225 | 
  226 |  /**
  227 |      * This Method For Complete Step 4: Delivery Method .
  228 |      * Continue Button.
  229 |      * @returns Step 5: Payment Method .
  230 |      */
  231 |  async clickOnContinueButtonshipping_method(): Promise<void> {
  232 |     await this.btnContinueshipping_method.click();
  233 | }
  234 | 
  235 | /**
  236 |  * Verify that the "Cash On Delivery" option is selected By Default.
  237 |  * @returns True if Flat Rate radio button is checked.
  238 |  */
  239 | 
  240 | async verifyCashOnDeliveryisCheced() : Promise<boolean>
  241 | {
  242 |      await  this.codPaymentMethod.isChecked()
  243 |      return true;
  244 | }
  245 | 
  246 | /**
  247 |  * This Method Select Terms & Conditions .
  248 |  * @param termsCondtion - click to Select.
  249 |  */
  250 | async selectTermsandCondtions() : Promise<void>{
  251 |     await this.termsCondtion.check()
  252 | 
  253 | }
  254 | 
  255 | 
  256 | /**
  257 |      * This Method For Complete Step 5: Payment Method.
  258 |      * Continue Button.
  259 |      * @returns Step 6: Confirm Order .
  260 |      */
  261 | async clickOnContinueButtonPayment_method(): Promise<void> {
  262 |     await this.btnContinuepayment_method.click();
  263 | }
  264 | 
  265 | 
  266 | /**
  267 |  * Verify that the Total Price Appear Correct in Step 6: Confirm Order.
  268 |  * @returns True if Total Price Correct
  269 |  */
  270 | 
  271 | async verifyTotalprice(totalPrice : string) : Promise<boolean>
  272 | {
  273 |      const price = await this.totalPrice.textContent();
  274 |      return price?.includes(totalPrice) ?? false;
  275 | }
  276 | 
  277 | 
  278 | /**
  279 |      * This Method For Complete Step 6: Confirm Order.
  280 |      * Continue Button.
  281 |      * @returns 
  282 |      */
  283 | async clickOnContinueButtonConfirmationOrder(): Promise<void> {
> 284 |     await this.confirmorderButton.click();
      |                                   ^ Error: locator.click: Target page, context or browser has been closed
  285 | }
  286 | 
  287 | 
  288 | 
  289 | async verifyTotalPriceAuto(totalPrice : string): Promise<void> {
  290 |     
  291 | 
  292 |     // Get values from UI
  293 |     const subtotalText = await this.subTotal.textContent();
  294 |     const shippingText = await this.shippingRate.textContent();
  295 |     //const totalText = await this.totalPrice.textContent();
  296 | 
  297 |     // Convert to numbers
  298 |     const subtotal = Helper.convertPriceToNumber(subtotalText!);
  299 |     const shipping = Helper.convertPriceToNumber(shippingText!);
  300 |     const actualTotal = Helper.convertPriceToNumber(totalPrice!);
  301 | 
  302 |     // Calculate expected total
  303 |     const expectedTotal = subtotal + shipping;
  304 | 
  305 |     // Logs for debugging
  306 |     console.log(`Subtotal: ${subtotal}`);
  307 |     console.log(`Shipping: ${shipping}`);
  308 |     console.log(`Expected Total: ${expectedTotal}`);
  309 |     console.log(`Actual Total: ${actualTotal}`);
  310 | }
  311 | 
  312 | 
  313 | 
  314 | 
  315 | 
  316 | 
  317 | }
  318 | 
```