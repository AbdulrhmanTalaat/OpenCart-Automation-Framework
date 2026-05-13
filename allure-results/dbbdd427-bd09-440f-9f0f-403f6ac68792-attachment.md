# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CheckOut.spec.ts >> CheckOut Page @master @regression
- Location: tests\CheckOut.spec.ts:37:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'waitForTimeout')
```

# Test source

```ts
  1   | import { test, expect , Page} from "@playwright/test";
  2   | import { TestConfig } from "../test.config";
  3   | import { Loginpage } from "../pages/LoginPage"
  4   | import { HomePage } from "../pages/HomePage"
  5   | import { MyAccountPage } from "../pages/MyAccountPage"
  6   | import { ProductPage } from "../pages/ProductPage"
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
  20  | let page : Page;
  21  | 
  22  | test.beforeEach("Lanch To URL", async ({ page }) => {
  23  |     config = new TestConfig();
  24  | 
  25  |     // 1. Navigate to application URL
  26  |     await page.goto(config.appUrl);
  27  | 
  28  |     login = new Loginpage(page);
  29  |     homepage = new HomePage(page);
  30  |     myAccountPage = new MyAccountPage(page);
  31  |     search = new SearchResult(page);
  32  |     product = new ProductPage(page);
  33  |     Shopping  = new ShoppingCartPage(page);
  34  |     checkOut = new CheckOutPage(page);
  35  | });
  36  | 
  37  | test("CheckOut Page @master @regression", async () => {
  38  | 
  39  |     // 2. Enter an existing product name in the search box
  40  |     // 3. Click the search button
  41  |     await homepage.searchProduct(config.productName);
  42  | 
  43  |     if (await search.isProductExist(config.productName))
  44  |          {
  45  |         // 5. Select the product
  46  |         await search.selectProduct(config.productName);
  47  |         //  6. Set quantity
  48  |         await product.setQuantity(config.productQuantity);
  49  |         // 7. Add the product to the cart
  50  |         await product.addToCart();
  51  |         // 8. Verify the success message
  52  |         const confitmationMS = await product.isConfirmationMessageVisible();
  53  |         console.log("Confirmation Ms after Add Product in Cart is Appear :", confitmationMS)
  54  |     }
  55  | 
  56  |     //9. Click on Item Card and Click on ViewCart 
  57  |     await product.clickItemsToNavigateToCart();
  58  |     await product.clickViewCart();
  59  |    
  60  |     // 10. Shopping page is Visible
  61  |     const shoppingTitle = await Shopping.shoppingPageIsVisible();
  62  |        expect(shoppingTitle).toBeTruthy();
  63  | 
  64  | 
  65  |     // 11. Get Total Price
  66  |      const totalPrice = await Shopping.getTotalPrice();
  67  |      console.log(`Total Price For Products is :  ${totalPrice}`)
  68  | 
  69  |      // 12. Check Out Page Is Visible or Not
  70  |      await Shopping.clickOnCheckout();
  71  |      const titleCheckOut = await checkOut.checkOutPageIsVisible();
  72  |      console.log(`page CheckOut is Visible :  ${titleCheckOut}`)
  73  | 
  74  | // Fill Step 1: Checkout Options 
  75  |  await checkOut.chooseCheckoutOption(config.selectOptionCheckOut);
> 76  |  await page.waitForTimeout(5000)
      |             ^ TypeError: Cannot read properties of undefined (reading 'waitForTimeout')
  77  |  await checkOut.clickOnContinue();
  78  | 
  79  |  // Step 2: Billing Details 
  80  |  // expect(await checkOut.verifyTitleBillingDetailsIsVisible()).toBeTruthy;
  81  |   await checkOut.fillYourPersonalDetails(RandomDataUtil.getlastName(),
  82  |                                          RandomDataUtil.getlastName() , RandomDataUtil.getEmail() , RandomDataUtil.getPhoneNumber());
  83  |   await checkOut.fillYourAddress(RandomDataUtil.getRandomAddress() , RandomDataUtil.getRandomCity() ,RandomDataUtil.getRandomPin());
  84  |   await checkOut.setCountry(config.country , config.state);
  85  |   await checkOut.clickOnbtnContinueBillingPersonalDetails();
  86  | 
  87  |   // Step 4: Delivery Method 
  88  |       expect (await checkOut.verifyMsshippingmethodIsVisible()).toBeTruthy();
  89  |       expect( await checkOut.verifyFlatRateisCheced()).toBeTruthy();
  90  |       await checkOut.clickOnContinueButtonshipping_method();
  91  |   
  92  |  // Step 5: Payment Method 
  93  |          expect(await checkOut.verifyCashOnDeliveryisCheced()).toBeTruthy();
  94  |          await checkOut.selectTermsandCondtions();
  95  |          await checkOut.clickOnContinueButtonPayment_method();
  96  |     
  97  | 
  98  |          // Step 5: Payment Method 
  99  |          const VerifytotalPrice = await checkOut.verifyTotalprice(config.totalPrice);
  100 |          expect(VerifytotalPrice).toBeTruthy();
  101 |          await checkOut.clickOnContinueButtonConfirmationOrder();
  102 |          
  103 | 
  104 | });
  105 | 
  106 | 
  107 | 
  108 | test.afterEach("Closs App", async ({ page }) => {
  109 |     await page.waitForTimeout(10000);
  110 |     await page.close();
  111 | });
```