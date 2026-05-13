import { expect,Locator, Page} from "@playwright/test";

export class HomePage{
// Locator  
                private readonly page : Page;
                private readonly myAccountLink : Locator;
                private readonly registertLink : Locator;
                private readonly logintLink : Locator;
                private readonly searchBox : Locator;
                private readonly searchButton : Locator;
  
// constructor
            constructor(page : Page)
            {
                this.page=page;
                this.myAccountLink = this.page.locator("a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']");
                this.registertLink = this.page.getByText('Register', { exact: true })
                this.logintLink = this.page.locator(':text-is("Login")')
                this.searchBox = this.page.locator("input[placeholder='Search']");
                this.searchButton =this.page.locator("button[class='btn btn-default btn-lg']");
            }


// Actions Method 

             async verifyHomePageExist() : Promise<boolean>
            {
                   const titlepage:string = await this.page.title();
                      if(titlepage)
                        {
                            return true
                        }
                      return false
                }



            async cliclOnMyaccount() : Promise<void>
            {
                await this.myAccountLink.click();
            }


            async cliclOnRegisterLink() : Promise<void>
            {
                await this.registertLink.click();
            }

            async cliclOnLoginLink() : Promise<void>
            {
                await this.logintLink.click();
            }

            async fillSearchBox(fillSearchBox : string) : Promise<void>
            {
                await this.searchBox.fill(fillSearchBox);
            }

            async clickOnSearchIcon() : Promise<void>
            {
                try{
                await this.searchButton.click();
            } catch (error) {
                console.log(`Exception Occured While Click On "Search Button" : ${error}`);
            }
        }

            async registerOnApp() : Promise<void>
            {
                await this.cliclOnMyaccount();
                await this.cliclOnRegisterLink();

            }

              async loginOnApp() : Promise<void>
            {
                await this.cliclOnMyaccount();
                await this.cliclOnLoginLink();

            }


      // Click the search button


         /**
          * This Method is used to search a product in the search box and click on the search button
          * @param fillSearchBox - Product Name to search.
          * @param clickOnSearchIcon - Click on the search button.
          * @returns void  -- navigate to the search result page
          */
              async searchProduct(fillSearchBox : string) : Promise<void>
            {
                await this.fillSearchBox(fillSearchBox);
                await this.clickOnSearchIcon();
            } 


             // Enter product name in the search box
    /* async enterProductName(pName: string){
        try {
            await this.searchBox.fill(pName);
        } catch (error) {
            console.log(`Exception occurred while entering product name: ${error}`);
            throw error;
        }
    }

     // Click the search button
    async clickSearch(){
        try {
            await this.searchButton.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Search': ${error}`);
            throw error;
        }
    }
 */



}