/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) checkout
 */

import { Page, expect, test } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { Loginpage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { ProductPage } from "../pages/ProductPage";
import { SearchResult } from "../pages/SearchResultPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { LogOutPage } from "../pages/LogOutpage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckOutPage } from "../pages/CheckOutPage";


test("End To End Senario", async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl);

    //1) Register a new account
    let email = await RegisterNewAccount(page);
    console.log("✅ Registration is completed!");

    //  2) Logout after successful registration
    await LogOut(page);
    console.log("✅ Logout is completed!");

    //  3) Login with the same account
    await peformLogin(page, email, "123456");
    console.log("✅ Login is completed!");

    // 4) Search for a product and add it to the cart
    await peformAddToCart(page);
    console.log("✅ Product added to cart!");

    // 5)Navigate To shopping cart page
    const totalPrice = await verifyShoppingCart(page);
    console.log("✅ Shopping cart completed!");

    //  6) Attempt checkout 
    await performCheckout(page);
    console.log("✅ Check Out  completed!");

});

// Function to register a new user account.
async function RegisterNewAccount(page: Page): Promise<string> {
    const homePgae = new HomePage(page);
    await homePgae.cliclOnMyaccount()
    await homePgae.cliclOnRegisterLink();
    // Fill in random user details
    const register = new RegistrationPage(page);
    let email = RandomDataUtil.getEmail();
    await register.fillPersonalDetails(RandomDataUtil.getFirstName(), RandomDataUtil.getlastName(),
        email, RandomDataUtil.getPhoneNumber());
    await register.fillPassword("123456", "123456");
    await register.selectNewsletterOption("yes");
    await register.acceptPrivacyPolicy();
    await register.clickContinue();
    // Validate that the registration was successful
    expect(await register.verifyRegistrationSuccess()).toBe("Your Account Has Been Created!");
    await register.clickContinueButton2();

    return email;   // Return the email for later use in login
}

// Function to log out the current user.
async function LogOut(page: Page) {

    const myAccount = new MyAccountPage(page);
    const logout = new LogOutPage(page);
    await myAccount.clickOnLogOutLink();
    expect(await logout.VerifyHeaderLogout()).toBe(true);
    await logout.clickContinue();

}

// Function to log in using the registered email.
async function peformLogin(page: Page, email: string, password: string) {

    const homePage = new HomePage(page);
    await homePage.cliclOnMyaccount();
    await homePage.cliclOnLoginLink();

    const login = new Loginpage(page);
    await login.loginInApp(email, password);

    const myAccount = new MyAccountPage(page);
    expect(await myAccount.isMyAccountPageExists()).toBe(true);
}

// Function to search for a product and add it to cart
async function peformAddToCart(page: Page) {

    const homePage = new HomePage(page);
    const config = new TestConfig();

    // Fill Search box
    await homePage.fillSearchBox(config.productName);
    await homePage.clickOnSearchIcon();

    // Choose Product
    const searchPage = new SearchResult(page);
    await searchPage.selectProduct(config.productName);

    // Add Product To Cart
    const product = new ProductPage(page);
    const confirmMessage = await product.addProductToCart(config.productQuantity);
    expect(confirmMessage).toBe(true)

}


// Function to verify the shopping cart details
async function verifyShoppingCart(page: Page): Promise<string | null> {
    const product = new ProductPage(page);
    await product.clickItemsToNavigateToCart();
    const shoppingCart = await product.clickViewCart();
    expect(await shoppingCart.shoppingPageIsVisible()).toBeTruthy();
    const totalPrice = shoppingCart.getTotalPrice();

    return totalPrice
}


// Function to perform checkout 
async function performCheckout(page: Page) {
    const shoppingPage = new ShoppingCartPage(page);
    const checkoutPage = await shoppingPage.clickOnCheckout();

    expect(await checkoutPage.checkOutPageIsVisible()).toBe(true);

    // Step 2: Billing Details 
    const config = new TestConfig();
    await checkoutPage.fillYourPersonalDetailss(RandomDataUtil.getFirstName(), RandomDataUtil.getlastName());
    await checkoutPage.fillYourAddress(RandomDataUtil.getRandomAddress(), RandomDataUtil.getRandomCity(), RandomDataUtil.getRandomPin())
    await checkoutPage.setCountry(config.country, config.state);
    await checkoutPage.CheckoutContinueButtonVisible();
    await checkoutPage.CheckoutContinueButtonEnabled();
    await checkoutPage.clickOnContinueButtonCheckout();


    // Step 3: Delivery Details 
    await checkoutPage.ChooseDeliveryDetails("I want to use an existing address");
    await checkoutPage.clickOnbtnContinueDeliveryDetails();
     
   

    // Step 4: Delivery Method 
    expect(await checkoutPage.verifyFlatRateisCheced()).toBeTruthy();
    expect(await checkoutPage.verifyMsshippingmethodIsVisible()).toBeTruthy();
    await checkoutPage.clickOnContinueButtonshipping_method();

    // Step 5: Payment Method 
    expect(await checkoutPage.verifyCashOnDeliveryisCheced()).toBeTruthy();
    await checkoutPage.selectTermsandCondtions();
    await checkoutPage.clickOnContinueButtonPayment_method();


    // Step 6: Confirm Order 
    const totalPrice = await checkoutPage.GetTotalprice();
    console.log(`Total Price In Step 6: Confirm Order  is : ${totalPrice}`)

    await checkoutPage.getTotalPriceData();

    await checkoutPage.isConfirmorder1ButtonVisible();
    await checkoutPage.isConfirmOrder2ButtonEnabled();
    await checkoutPage.clickOnContinueButtonConfirmationOrder();
}