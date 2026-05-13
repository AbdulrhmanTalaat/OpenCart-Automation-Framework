import { test, expect} from "@playwright/test";
import { TestConfig } from "../test.config";
import { Loginpage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { MyAccountPage } from "../pages/MyAccountPage"
import { ProductPage } from "../pages/ProductPage"
import { SearchResult } from "../pages/SearchResultPage"
import { ShoppingCartPage } from "../pages/ShoppingCartPage"
import { CheckOutPage } from "../pages/CheckOutPage";

let config: TestConfig;
let login: Loginpage;
let homepage: HomePage;
let myAccountPage: MyAccountPage;
let search: SearchResult;
let product: ProductPage;
let Shopping : ShoppingCartPage;
let checkOut : CheckOutPage;

test.beforeEach("Lanch To URL", async ({ page }) => {
    config = new TestConfig();

    // 1. Navigate to application URL
    await page.goto(config.appUrl);

    login = new Loginpage(page);
    homepage = new HomePage(page);
    myAccountPage = new MyAccountPage(page);
    search = new SearchResult(page);
    product = new ProductPage(page);
    Shopping  = new ShoppingCartPage(page);
    checkOut = new CheckOutPage(page);
});

test("Shopping Page @master @regression", async () => {

    // 2. Enter an existing product name in the search box
    // 3. Click the search button
    await homepage.searchProduct(config.productName);
    const searcPageisExist = await search.isSearchResultsPageExists();
    expect(searcPageisExist).toBeTruthy();

    // Get Total proudct
    const totalProuduct = await search.getProductCount();
    console.log(`Total Product Is : ${totalProuduct}`);

    //  4. Verify the product appears in the search results
    const productIsExist = await search.isProductExist(config.productName);
    expect(productIsExist).toBeTruthy();

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
     console.log(`Total Price For Products is :  ${totalPrice}`)

     // 12. Check Out Page Is Visible or Not
     await Shopping.clickOnCheckout();
     const titleCheckOut = await checkOut.checkOutPageIsVisible();
     console.log(`page CheckOut is Visible :  ${titleCheckOut}`)
});



test.afterEach("Closs App", async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();
});