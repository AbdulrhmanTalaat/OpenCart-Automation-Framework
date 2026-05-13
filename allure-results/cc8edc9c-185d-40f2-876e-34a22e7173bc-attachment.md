# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CheckOut.spec.ts >> CheckOut Page @master @regression
- Location: tests\CheckOut.spec.ts:36:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('#input-payment-firstname')
    - locator resolved to <input value="" type="text" name="firstname" class="form-control" placeholder="First Name" id="input-payment-firstname"/>
    - fill("O'Connell")
  - attempting fill action
    2 × waiting for element to be visible, enabled and editable
      - element is not visible
    - retrying fill action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and editable
      - element is not visible
    - retrying fill action
      - waiting 100ms
    13 × waiting for element to be visible, enabled and editable
       - element is not visible
     - retrying fill action
       - waiting 500ms

```

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  7   | import { SearchResult } from "../pages/SearchResultPage"
  8   | import { ShoppingCartPage } from "../pages/ShoppingCartPage"
  9   | import { CheckOutPage } from "../pages/CheckOutPage";
  10  | import {RandomDataUtil} from "../utils/randomDataGenerator";
  11  | 
  12  | let config: TestConfig;
  13  | let login: Loginpage;
  14  | let homepage: HomePage;
  15  | let myAccountPage: MyAccountPage;
  16  | let search: SearchResult;
  17  | let product: ProductPage;
  18  | let Shopping : ShoppingCartPage;
  19  | let checkOut : CheckOutPage;
  20  | 
  21  | test.beforeEach("Lanch To URL", async ({ page }) => {
  22  |     config = new TestConfig();
  23  | 
  24  |     // 1. Navigate to application URL
  25  |     await page.goto(config.appUrl);
  26  | 
  27  |     login = new Loginpage(page);
  28  |     homepage = new HomePage(page);
  29  |     myAccountPage = new MyAccountPage(page);
  30  |     search = new SearchResult(page);
  31  |     product = new ProductPage(page);
  32  |     Shopping  = new ShoppingCartPage(page);
  33  |     checkOut = new CheckOutPage(page);
  34  | });
  35  | 
  36  | test("CheckOut Page @master @regression", async () => {
  37  | 
  38  |     // 2. Enter an existing product name in the search box
  39  |     // 3. Click the search button
  40  |     await homepage.searchProduct(config.productName);
  41  | 
  42  |     if (await search.isProductExist(config.productName))
  43  |          {
  44  |         // 5. Select the product
  45  |         await search.selectProduct(config.productName);
  46  |         //  6. Set quantity
  47  |         await product.setQuantity(config.productQuantity);
  48  |         // 7. Add the product to the cart
  49  |         await product.addToCart();
  50  |         // 8. Verify the success message
  51  |         const confitmationMS = await product.isConfirmationMessageVisible();
  52  |         console.log("Confirmation Ms after Add Product in Cart is Appear :", confitmationMS)
  53  |     }
  54  | 
  55  |     //9. Click on Item Card and Click on ViewCart 
  56  |     await product.clickItemsToNavigateToCart();
  57  |     await product.clickViewCart();
  58  |    
  59  |     // 10. Shopping page is Visible
  60  |     const shoppingTitle = await Shopping.shoppingPageIsVisible();
  61  |        expect(shoppingTitle).toBeTruthy();
  62  | 
  63  | 
  64  |     // 11. Get Total Price
  65  |      const totalPrice = await Shopping.getTotalPrice();
  66  |      console.log(`Total Price For Products is :  ${totalPrice}`)
  67  | 
  68  |      // 12. Check Out Page Is Visible or Not
  69  |      await Shopping.clickOnCheckout();
  70  |      const titleCheckOut = await checkOut.checkOutPageIsVisible();
  71  |      console.log(`page CheckOut is Visible :  ${titleCheckOut}`)
  72  | 
  73  | // Fill Step 1: Checkout Options 
  74  |  await checkOut.chooseCheckoutOption(config.selectOptionCheckOut);
  75  |  await checkOut.clickOnContinue();
  76  | 
  77  |  // Step 2: Billing Details 
  78  |  // expect(await checkOut.verifyTitleBillingDetailsIsVisible()).toBeTruthy;
  79  |   await checkOut.fillYourPersonalDetails(RandomDataUtil.getlastName(),
  80  |                                          RandomDataUtil.getlastName() , RandomDataUtil.getEmail() , RandomDataUtil.getPhoneNumber());
  81  |   await checkOut.fillYourAddress(RandomDataUtil.getRandomAddress() , RandomDataUtil.getRandomCity() ,RandomDataUtil.getRandomPin());
  82  |   await checkOut.setCountry(config.country , config.state);
  83  |   await checkOut.clickOnbtnContinueBillingPersonalDetails();
  84  | 
  85  |   // Step 4: Delivery Method 
  86  |       expect (await checkOut.verifyMsshippingmethodIsVisible()).toBeTruthy();
  87  |       expect( await checkOut.verifyFlatRateisCheced()).toBeTruthy();
  88  |       await checkOut.clickOnContinueButtonshipping_method();
  89  |   
  90  |  // Step 5: Payment Method 
  91  |          expect(await checkOut.verifyCashOnDeliveryisCheced()).toBeTruthy();
  92  |          await checkOut.selectTermsandCondtions();
  93  |          await checkOut.clickOnContinueButtonPayment_method();
  94  |     
  95  | 
  96  |          // Step 5: Payment Method 
  97  |          const VerifytotalPrice = await checkOut.verifyTotalprice(config.totalPrice);
  98  |          expect(VerifytotalPrice).toBeTruthy();
  99  |          await checkOut.clickOnContinueButtonConfirmationOrder();
  100 |          
  101 | 
  102 | });
  103 | 
  104 | 
  105 | 
  106 | test.afterEach("Closs App", async ({ page }) => {
> 107 |     await page.waitForTimeout(10000);
      |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  108 |     await page.close();
  109 | });
```