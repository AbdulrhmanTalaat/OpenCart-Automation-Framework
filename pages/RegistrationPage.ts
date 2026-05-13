import {Locator, Page} from "@playwright/test";
export class RegistrationPage{

// Locator for Registration Page :-
    private readonly page : Page;
//Your Personal Details    
    private readonly firstName : Locator;
    private readonly lastName : Locator;        
    private readonly email : Locator;
    private readonly telephone : Locator;
//Your Password
    private readonly password : Locator;
    private readonly confirmPassword : Locator
//Newsletter
    private readonly newsletterYes : Locator;
    private readonly newsletterNo : Locator;
//Privacy Policy
    private readonly privacyPolicyCheckBox : Locator;
//Continue Button
    private readonly continueButton : Locator;  
    private readonly SuccessMessage : Locator;  
    private readonly continueButton2 : Locator;      



//Constructor
    constructor(page : Page)
    {
        this.page=page;
        this.firstName = this.page.locator("#input-firstname");
        this.lastName = this.page.locator("#input-lastname");
        this.email = this.page.locator("#input-email");
        this.telephone = this.page.locator("#input-telephone");

        this.password = this.page.locator("#input-password");
        this.confirmPassword = this.page.locator("#input-confirm");

        this.newsletterYes = this.page.getByLabel('Yes', { exact: true })
        this.newsletterNo = this.page.getByLabel('No', { exact: true })

        this.privacyPolicyCheckBox = this.page.locator('input[name="agree"]')
        this.continueButton = this.page.locator("input[value='Continue']");
        this.SuccessMessage = this.page.getByRole('heading', { name: /Your Account Has Been Created!/i })
        this.continueButton2 = this.page.locator("a.btn.btn-primary");
    }



// Actions Method

/* 
@param = شرح للـ parameters
بيخلي الكود readable + professional
مهم جدًا في المشاريع الكبيرة
*/

/**
 * This method fills the user personal details in the registration form.
 * 
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param email - The user's email address
 * @param telephone - The user's phone number
 */
async fillPersonalDetails(firstName : string, lastName : string, email : string, telephone : string) : Promise<void>
{
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.telephone.fill(telephone);
}

/**
*  This method fills the user Password in the registration form.
*  @param password - User password
*  @param confirmPassword - Confirmation of the user password
*/
async fillPassword(password : string, confirmPassword : string) : Promise<void>
{
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
}


/**
 * * This method fills the Newsletter in the registration form.
 * @param newsletterYes - select option Yes
 * @param newsletterNo - select option No
*/ 
 
async selectNewsletterOption(option : string) : Promise<void>
{
     if(option.toLowerCase() === "yes")
     {
         await this.newsletterYes.check();
     }
     else
     {
         await this.newsletterNo.check();
     }
}

async acceptPrivacyPolicy() : Promise<void>
{
    await this.privacyPolicyCheckBox.check();
}


async clickContinue() : Promise<void>
{
    await this.continueButton.click();    
}


/**
 * Confirmation of the user registration success by getting the success message text.
 * Click on continue button to navigate to home page after registration success.
 * @returns confirmation message text after successful registration
 * @param continueButton2 - Click on continue button to navigate to home page after registration success
 */
async verifyRegistrationSuccess() : Promise<string | null>
{
  return await this.SuccessMessage.textContent();
  await this.continueButton2.click();
}

/**
 * Click on continue button to navigate to home page after registration success.
 * @param continueButton2 - Click on continue button to navigate to home page after registration success
 */
async clickContinueButton2() : Promise<void>
{
  await this.continueButton2.click();
}



}