import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResult } from "../pages/SearchResultPage";
import { TestConfig } from "../test.config";

/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */
// Declare reusable variables
let homepage: HomePage;
let searchResult: SearchResult;
let config: TestConfig;

test.beforeEach("Lanch To URL", async ({ page }) => {
    // Initialize page objects
    config = new TestConfig();
    homepage = new HomePage(page);
    searchResult = new SearchResult(page);
    //  1) Navigate to the application URL
    await page.goto(config.appUrl);
});

test("Search Product in Search Result Page @master @regression", async () => {
    // 2) Enter the product name in the search field
    //  3) Click the search button
    await homepage.searchProduct(config.productName);

    // Verify the search results page is visible
    const resultSearch = await searchResult.isSearchResultsPageExists();
    console.log("Is Page Search Result Is Visible", resultSearch);
    expect(resultSearch).toBeTruthy();


    // 4) Verify if the product is displayed in the search results    
    const productIsExist = await searchResult.isProductExist(config.productName);
    console.log("Is product Name Is Exisit", productIsExist);
    expect(productIsExist).toBeTruthy();

    // Get Total proudct
    const totalProuduct = await searchResult.getProductCount();
    console.log(`Total Product Is : ${totalProuduct}`);
    // Select Product
    await searchResult.selectProduct(config.productName);
});

test.afterEach("close App", async ({ page }) => {

    await page.waitForTimeout(5000);
    await page.close();
});