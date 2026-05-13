import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { Loginpage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { MyAccountPage } from "../pages/MyAccountPage"
import { ProductPage } from "../pages/ProductPage"
import { SearchResult } from "../pages/SearchResultPage"
/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */
let config: TestConfig;
let login: Loginpage;
let homepage: HomePage;
let myAccountPage: MyAccountPage;
let search: SearchResult;
let product: ProductPage;

test.beforeEach("Lanch To URL", async ({ page }) => {
    config = new TestConfig();

    // 1. Navigate to application URL
    await page.goto(config.appUrl);

    login = new Loginpage(page);
    homepage = new HomePage(page);
    myAccountPage = new MyAccountPage(page);
    search = new SearchResult(page);
    product = new ProductPage(page);
});

test("Select Product after Search @master @regression", async () => {

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
        console.log("Confirmation Ms is Appear :", confitmationMS)
    }
});



test.afterEach("Closs App", async ({ page }) => {
    await page.waitForTimeout(5000);
    await page.close();
});