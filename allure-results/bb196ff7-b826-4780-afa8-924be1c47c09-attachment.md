# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CheckOut.spec.ts >> CheckOut Page @master @regression
- Location: tests\CheckOut.spec.ts:36:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { TestConfig } from "../test.config";
  3   | import { Loginpage } from "../pages/LoginPage"
  4   | import { HomePage } from "../pages/HomePage"
  5   | import { MyAccountPage } from "../pages/MyAccountPage"
  6   | import { ProductPage } from "../pages/ProductPage"
  7   | import { SearchResult } from "../pages/SearchResultPage"
  8   | import { ShoppingCartPage } from "../pages/ShoppingCartPage"
  9   | import { CheckOutPage } from "../pages/CheckOutPage";
  10  | import { RandomDataUtil } from "../utils/randomDataGenerator";
  11  | 
  12  | let config: TestConfig;
  13  | let login: Loginpage;
  14  | let homepage: HomePage;
  15  | let myAccountPage: MyAccountPage;
  16  | let search: SearchResult;
  17  | let product: ProductPage;
  18  | let Shopping: ShoppingCartPage;
  19  | let checkOut: CheckOutPage;
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
  32  |     Shopping = new ShoppingCartPage(page);
  33  |     checkOut = new CheckOutPage(page);
  34  | });
  35  | 
  36  | test("CheckOut Page @master @regression", async () => {
  37  | 
  38  |     // 2. Enter an existing product name in the search box
  39  |     // 3. Click the search button
  40  |     await homepage.searchProduct(config.productName);
  41  | 
  42  |     if (await search.isProductExist(config.productName)) {
  43  |         // 5. Select the product
  44  |         await search.selectProduct(config.productName);
  45  |         //  6. Set quantity
  46  |         await product.setQuantity(config.productQuantity);
  47  |         // 7. Add the product to the cart
  48  |         await product.addToCart();
  49  |         // 8. Verify the success message
  50  |         const confitmationMS = await product.isConfirmationMessageVisible();
  51  |         console.log("Confirmation Ms after Add Product in Cart is Appear :", confitmationMS)
  52  |     }
  53  | 
  54  |     //9. Click on Item Card and Click on ViewCart 
  55  |     await product.clickItemsToNavigateToCart();
  56  |     await product.clickViewCart();
  57  | 
  58  |     // 10. Shopping page is Visible
  59  |     const shoppingTitle = await Shopping.shoppingPageIsVisible();
  60  |     expect(shoppingTitle).toBeTruthy();
  61  | 
  62  | 
  63  |     // 11. Get Total Price
  64  |     const totalPrice = await Shopping.getTotalPrice();
  65  |     console.log(`Total Price For Products is :  ${totalPrice}`)
  66  | 
  67  |     // 12. Check Out Page Is Visible or Not
  68  |     await Shopping.clickOnCheckout();
  69  |     const titleCheckOut = await checkOut.checkOutPageIsVisible();
  70  |     console.log(`page CheckOut is Visible :  ${titleCheckOut}`)
  71  | 
  72  |     // Fill Step 1: Checkout Options 
  73  |     await checkOut.chooseCheckoutOption(config.selectOptionCheckOut);
> 74  |     expect(await checkOut.isContinueButtonVisible()).toBeTruthy();
      |                                                      ^ Error: expect(received).toBeTruthy()
  75  |     expect(await checkOut.isContinueButtonEnabled()).toBeTruthy();
  76  |     await checkOut.clickOnContinueButtonCheckoutOptions();
  77  |     // Step 2: Billing Details 
  78  |  /*    const Billing_Details = await checkOut.verifyTitleBillingDetailsIsVisible();
  79  |     expect(Billing_Details).toBeTruthy();
  80  |     console.log(`Are Step 2: Billing Details Is Appear in Correct : ${Billing_Details}`);
  81  | 
  82  |      await checkOut.fillYourPersonalDetails(RandomDataUtil.getlastName(),
  83  |                                            RandomDataUtil.getlastName() , RandomDataUtil.getEmail() , RandomDataUtil.getPhoneNumber());
  84  |     await checkOut.fillYourAddress(RandomDataUtil.getRandomAddress() , RandomDataUtil.getRandomCity() ,RandomDataUtil.getRandomPin());
  85  |     await checkOut.setCountry(config.country , config.state);
  86  |     await checkOut.clickOnbtnContinueBillingPersonalDetails(); */
  87  | 
  88  |   /* 
  89  |     // Step 4: Delivery Method 
  90  |         expect (await checkOut.verifyMsshippingmethodIsVisible()).toBeTruthy();
  91  |         expect( await checkOut.verifyFlatRateisCheced()).toBeTruthy();
  92  |         await checkOut.clickOnContinueButtonshipping_method();
  93  |     
  94  |    // Step 5: Payment Method 
  95  |            expect(await checkOut.verifyCashOnDeliveryisCheced()).toBeTruthy();
  96  |            await checkOut.selectTermsandCondtions();
  97  |            await checkOut.clickOnContinueButtonPayment_method();
  98  |       
  99  |   
  100 |            // Step 5: Payment Method 
  101 |            const VerifytotalPrice = await checkOut.verifyTotalprice(config.totalPrice);
  102 |            expect(VerifytotalPrice).toBeTruthy();
  103 | 
  104 |            expect(await checkOut.isConfirmorder1ButtonVisible()).toBeTruthy();
  105 |            expect(await checkOut.isConfirmOrder2ButtonEnabled()).toBeTruthy();
  106 |            await checkOut.clickOnContinueButtonConfirmationOrder();  */
  107 | 
  108 | 
  109 | });
  110 | 
  111 | 
  112 | 
  113 | test.afterEach("Closs App", async ({ page }) => {
  114 |     await page.waitForTimeout(5000);
  115 |     await page.close();
  116 | });
```