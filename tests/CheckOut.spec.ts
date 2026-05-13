import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { Loginpage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { MyAccountPage } from "../pages/MyAccountPage"
import { ProductPage } from "../pages/ProductPage"
import { SearchResult } from "../pages/SearchResultPage"
import { ShoppingCartPage } from "../pages/ShoppingCartPage"
import { CheckOutPage } from "../pages/CheckOutPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";

let config: TestConfig;
let login: Loginpage;
let homepage: HomePage;
let myAccountPage: MyAccountPage;
let search: SearchResult;
let product: ProductPage;
let Shopping: ShoppingCartPage;
let checkOut: CheckOutPage;

test.beforeEach("Lanch To URL", async ({ page }) => {
    config = new TestConfig();

    // 1. Navigate to application URL
    await page.goto(config.appUrl);

    login = new Loginpage(page);
    homepage = new HomePage(page);
    myAccountPage = new MyAccountPage(page);
    search = new SearchResult(page);
    product = new ProductPage(page);
    Shopping = new ShoppingCartPage(page);
    checkOut = new CheckOutPage(page);
});

test("CheckOut Page as a Guest @master @regression", async () => {

    // 2. Enter an existing product name in the search box
    // 3. Click the search button
    await homepage.searchProduct(config.productName);

    if (await search.isProductExist(config.productName)) {
        // 5. Select the product
        await search.selectProduct(config.productName);
        //  6. Set quantity
        await product.setQuantity(config.productQuantity);
        // 7. Add the product to the cart
        await product.addToCart();
        // 8. Verify the success message
        const confitmationMS = await product.isConfirmationMessageVisible();
        console.log("Confirmation Ms after Add Product in Cart is Appear :", confitmationMS)
    }

    //9. Click on Item Card and Click on ViewCart 
    await product.clickItemsToNavigateToCart();
    await product.clickViewCart();

    // 10. Shopping page is Visible
    const shoppingTitle = await Shopping.shoppingPageIsVisible();
    expect(shoppingTitle).toBeTruthy();


    // 11. Get Total Price
    const totalPrice = await Shopping.getTotalPrice();
    console.log(`Total Price For Products in Shopping page  is :  ${totalPrice}`)

    // 12. Check Out Page Is Visible or Not
    await Shopping.clickOnCheckout();
    const titleCheckOut = await checkOut.checkOutPageIsVisible();
    console.log(`page CheckOut is Visible :  ${titleCheckOut}`)

    // Fill Step 1: Checkout Options 

    await checkOut.chooseCheckoutOption("Guest Checkout");       // Choose one Option from Radio Button

    expect(await checkOut.isContinueButtonVisible()).toBeTruthy();
    expect(await checkOut.isContinueButtonEnabled()).toBeTruthy();
    await checkOut.clickOnContinueButtonCheckoutOptions();   // Click on Continue Button

    // Step 2: Billing Details 

    const Billing_Details = await checkOut.verifyTitleBillingDetailsIsVisible();
    expect(Billing_Details).toBeTruthy();
    console.log(`Are Step 2: Billing Details Is Appear in Correct : ${Billing_Details}`);

    await checkOut.fillYourPersonalDetails(RandomDataUtil.getlastName()
        , RandomDataUtil.getlastName(), RandomDataUtil.getEmail(), RandomDataUtil.getPhoneNumber()); // Fill Personal Data

    await checkOut.fillYourAddress(RandomDataUtil.getRandomAddress(), RandomDataUtil.getRandomCity(), RandomDataUtil.getRandomPin());  // Fill Personal Data
    await checkOut.setCountry(config.country, config.state);   // Fill Personal Data
    const status = await checkOut.verifyShippingAddressIs_Checked();
    console.log(`Verify shipping address is Checked by Default : ${status}`);
          expect(status).toBeTruthy(); // Verify shipping address is Checked by Default
    await checkOut.clickOnbtnContinueBillingPersonalDetails();    // Click on Continue Button


    // Step 4: Delivery Method 
    expect(await checkOut.verifyMsshippingmethodIsVisible()).toBeTruthy(); // Verify Message shippingmethod Appear Correctly
    expect(await checkOut.verifyFlatRateisCheced()).toBeTruthy();  // Verify that the Flat Rate shipping option is selected By Default.
    await checkOut.clickOnContinueButtonshipping_method();    // Click on Continue Button

    // Step 5: Payment Method 
    expect(await checkOut.verifyCashOnDeliveryisCheced()).toBeTruthy();  // Verify that the "Cash On Delivery" option is selected By Default.
    await checkOut.selectTermsandCondtions();  // Select Terms & Conditions .
    await checkOut.clickOnContinueButtonPayment_method(); // Click on Continue Button


    // Step 5: Payment Method 
    const total = await checkOut.GetTotalprice();  // Get Total Price
    console.log(`Total Price Is : ${total}`)       // Print Total Price

    const totalData = await checkOut.getTotalPriceData();
    expect(totalData.actualTotal).toBe(totalData.expectedTotal); // or toBeCloseTo()


    expect(await checkOut.isConfirmorder1ButtonVisible()).toBeTruthy();
    expect(await checkOut.isConfirmOrder2ButtonEnabled()).toBeTruthy();
    await checkOut.clickOnContinueButtonConfirmationOrder();  // Click on Confirmation order Button
    


});
 


test.afterEach("Closs App", async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();
});