import type { Page, Locator } from "@playwright/test";
export class PracticeFormPage {
    readonly txtFirstName: Locator;
    readonly txtlastName: Locator;
    readonly txtEmail: Locator;
    rdGender: string = 'xpath=//*[text()="@param"]';
    readonly txtMobile: Locator;
    readonly txtDateOfBirth: Locator;
    readonly cbSubject: Locator;
    chkHobbies: string = 'xpath=//label[text()="@param"]';
    readonly txtPicture: Locator;
    readonly txtCurrentAddress: Locator;
    readonly cbState: Locator;
    readonly cbCity: Locator;
    readonly btnSubmit: Locator;
    constructor(public readonly page: Page) {
        this.txtFirstName = page.locator('#firstName');  
        this.txtlastName = page.locator('#lastName');  
        this.txtEmail = page.locator('#email');  
        this.txtMobile = page.locator('#mobileNumber');  
        this.txtDateOfBirth = page.locator("#dateOfBirthInput");
        this.cbSubject = page.locator('#subjectsInput');  
        this.txtPicture = page.locator('#uploadPicture');  
        this.txtCurrentAddress = page.locator('#currentAddress');  
        this.cbState = page.locator('xpath=//*[@id="state"]//input');  
        this.cbCity = page.locator('xpath=//*[@id="city"]//input');  
        this.btnSubmit = page.locator('#submit');  
    }
    async goTo() {
        await this.page.goto("/automation-practice-form");
    }
    async inputData(firstName: string, lastName: string, email: string, gender: string, mobile: string, dateOfBirth: string, subject: string, hobbies: string, picture: string, currentAddress: string, state: string, city: string) {
        await this.txtFirstName.fill(firstName);
        await this.txtlastName.fill(lastName);
        await this.txtEmail.fill(email);
        await this.page.click(this.rdGender.replace('@param', gender));
        await this.txtMobile.fill(mobile);
        await this.inputDateOfBirth(dateOfBirth);
        await this.inputSubject(subject);
        await this.inputHobbies(hobbies);
        const picturePath = process.cwd() + '/testcase/data/' + picture;
        await this.txtPicture.fill(picturePath);
        await this.txtCurrentAddress.fill(currentAddress);
        await this.cbState.fill(state);
        await this.cbState.press('Enter');
        await this.cbCity.fill(city);
        await this.cbCity.press('Enter');
        await this.btnSubmit.click();
    }

async inputDateOfBirth(dateOfBirth: string) {
        let dateOfBirths = dateOfBirth.split(' ');
        const day = dateOfBirths[0];
        const month = dateOfBirths[1];
        const year  = dateOfBirths[2];  
        if (!day || !month || !year) {
            throw new Error(`Invalid dateOfBirth value: ${dateOfBirth}`);
        }
        await this.txtDateOfBirth.click();
        await this.page.locator('.react-datepicker__year-select').selectOption(year);
        await this.page.locator('.react-datepicker__month-select').selectOption(month);
        await this.page.locator(`.react-datepicker__day--0${day}`).click();
    }
    async inputSubject(subject: string) {
        const subjects = subject.split(',').map(s => s.trim());
        for (const sub of subjects) {
            await this.cbSubject.fill(sub);
            await this.cbSubject.press('Enter');
        }   
    }
    async inputHobbies(hobbies: string) {
        const hobbiesList = hobbies.split(',').map(h => h.trim());
        for (const hobby of hobbiesList) {
            await this.page.click(this.chkHobbies.replace('@param', hobby));
        }
    }
}
