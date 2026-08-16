import { expect, type Locator, type Page } from "@playwright/test";

export class WebTablesPage {
  readonly page: Page;
  readonly txtSearch: Locator;
  searchResultXpath: string = "xpath=//tbody/tr/td[@param]";
  readonly btnAdd: Locator;
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtAge: Locator;
  readonly txtEmail: Locator;
  readonly txtSalary: Locator;
  readonly txtDepartment: Locator;
  readonly btnSubmit: Locator;
  readonly btnDeletes: Locator;
  readonly btnEdits: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtSearch = page.locator("#searchBox");
    this.btnAdd = page.locator("#addNewRecordButton");
    this.txtFirstName = page.locator("#firstName");
    this.txtLastName = page.locator("#lastName");
    this.txtAge = page.locator("#age");
    this.txtEmail = page.locator("#userEmail");
    this.txtSalary = page.locator("#salary");
    this.txtDepartment = page.locator("#department");
    this.btnSubmit = page.locator("#submit");
    this.btnDeletes = page.locator("xpath=//span[@title='Delete']/svg");
    this.btnEdits = page.locator("xpath=//span[@title='Edit']/svg");
  }

  async search(keyword: string) {
    await this.txtSearch.fill(keyword);
    await this.txtSearch.press("Enter");
  }
  //searchResult
  async verifySearchResult(searchBy: string, keyword: string): Promise<string> {
    let result = "";
    switch (searchBy) {
      case "FirstName":
        result = await this.getSearchResult(1, keyword);
        break;
      case "LastName":
        result = await this.getSearchResult(2, keyword);
        break;
      case "Age":
        result = await this.getSearchResult(3, keyword);
        break;
      case "Email":
        result = await this.getSearchResult(4, keyword);
        break;
      case "Salary":
        result = await this.getSearchResult(5, keyword);
        break;
      case "Department":
        result = await this.getSearchResult(6, keyword);
        break;
    }
    return result;
  }
  async getSearchResult(columnIndex: number, keyword: string): Promise<string> {
    const searchResultLocator = this.searchResultXpath.replace(
      "@param",
      columnIndex.toString(),
    );
    const text: string =
      (await this.page.locator(searchResultLocator).first().textContent()) ??
      "";
    return text;
  }
  async createNewUser(
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    salary: number,
    department: string,
  ) {
    await this.btnAdd.click();
    await this.txtFirstName.fill(firstName);
    await this.txtLastName.fill(lastName);
    await this.txtAge.fill(age.toString());
    await this.txtEmail.fill(email);
    await this.txtSalary.fill(salary.toString());
    await this.txtDepartment.fill(department);
    await this.page.locator("#submit").click();
  }
  //Delete user
  async deleteUser(keyword: string) {
    await this.search(keyword);
    const count = await this.btnDeletes.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        await this.btnDeletes.first().click();
      }
    }
  }
  //Edit user
  async editUser(
    keyword: string,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    salary: number,
    department: string,
  ) {
    await this.search(keyword);

    await expect(this.btnEdits.first()).toBeVisible();

    await this.btnEdits.first().click();

    await this.txtFirstName.clear();
    await this.txtFirstName.fill(firstName);

    await this.txtLastName.clear();
    await this.txtLastName.fill(lastName);

    await this.txtAge.clear();
    await this.txtAge.fill(age.toString());

    await this.txtEmail.clear();
    await this.txtEmail.fill(email);

    await this.txtSalary.clear();
    await this.txtSalary.fill(salary.toString());

    await this.txtDepartment.clear();
    await this.txtDepartment.fill(department);

    await this.btnSubmit.click();
  }
}
