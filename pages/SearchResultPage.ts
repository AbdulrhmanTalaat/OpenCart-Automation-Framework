import { Page, Locator } from "@playwright/test";
import { ProductPage } from "./ProductPage";
export class SearchResult {
    // Locator
    private readonly page: Page;
    private readonly titleSearchResult: Locator;
    private readonly productList: Locator;

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.titleSearchResult = this.page.locator("#content>h1");
        this.productList = this.page.locator("div>h4>a");
    }


    // Actions Method
    /**
     * This Method is used to verify if the search results page is visible
     * @returns boolean - Returns true if search results page is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {

    // Approch 1
        /* const searchResultpage = await this.titleSearchResult.textContent();
        return searchResultpage?.includes("'Search -'") ?? false */
        
    // Approch 2
        const searchResultpage = await this.titleSearchResult.isVisible();
        return searchResultpage; 
    }



    /**
     * This method Checked Name Visible In List Products
     * @param ProductName - The name of the product to search for
     * @returns boolean - Return True if Product Name product exists
     */
    async isProductExist(ProductName: string): Promise<boolean> {
        const AllProducts = await this.productList.allTextContents();
        for (const products of AllProducts) {
            if (products.trim() === ProductName.trim())
                return true;
        }
        return false;
    }



    /**
     * Select a product from the search results by its name
     * @param ProductName - The name of the product to select
     * @returns Promise<ProductPage> - ProductPage instance after selecting the product
     */
    async selectProduct(ProductName: string): Promise<ProductPage | null> {
        const count = await this.productList.count();
        for (let i = 0; i < count; i++) {
            const prouduct = this.productList.nth(i);
            const title = await prouduct.textContent();
            if (title === ProductName) {
                await prouduct.click();
                return new ProductPage(this.page);
            }
        }
        console.log(`Product not found: ${ProductName}`);
        return null;
    }



    /**
     * Get count of products in search results
     * @returns Promise<number> - Number of products found
     */
    async getProductCount(): Promise<number> {
        const count = await this.productList.count();
        return count;
    }

}