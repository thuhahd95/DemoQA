import { test, expect } from "@playwright/test";
import { WebTablesPage } from "../pages/WebTablePage.js";
import { readDataFromCSV } from "../common/Utils.js";

const createData = readDataFromCSV("testcase/data/WebTable_TC1_6.csv");
test.describe("Web Tables Test", () => {
  for (const data of createData) {
    test(`Search user by ${data.SearchBy}`, async ({ page }) => {
      const webTablesPage = new WebTablesPage(page);

      await page.goto("/webtables");
      await webTablesPage.deleteUser(data.Keyword ?? "");
      await webTablesPage.createNewUser(
        data.FirstName ?? "",
        data.LastName ?? "",
        parseInt(data.Age ?? "0"),
        data.Email ?? "",
        parseInt(data.Salary ?? "0"),
        data.Department ?? "",
      );
      const keyword = data.Keyword ?? "";

      await webTablesPage.search(keyword);

      let result = await webTablesPage.verifySearchResult(
        data.SearchBy ?? "",
        keyword,
      );
      await expect(result).toContain(keyword);
    });
  }
});

const editData = readDataFromCSV("testcase/data/WebTable_Edit.csv");

test.describe("Web Tables Test Edit", () => {
  for (const data of editData) {
    test(`Edit user by ${data.Keyword}`, async ({ page }) => {
      const webTablesPage = new WebTablesPage(page);

      await page.goto("/webtables");
      await webTablesPage.createNewUser(
        data.Keyword ?? "",
        data.NewFirstName ?? "",
        parseInt(data.NewAge ?? "0"),
        data.NewEmail ?? "",
        parseInt(data.NewSalary ?? "0"),
        data.NewDepartment ?? "",
      );

      await webTablesPage.search(data.Keyword ?? "");

      await webTablesPage.editUser(
        data.Keyword ?? "",
        data.NewFirstName ?? "",
        data.NewLastName ?? "",
        parseInt(data.NewAge ?? "0"),
        data.NewEmail ?? "",
        parseInt(data.NewSalary ?? "0"),
        data.NewDepartment ?? "",
      );

      await webTablesPage.search(data.VerifyKeyword ?? "");

      const result = await webTablesPage.verifySearchResult(
        data.VerifyBy ?? "",
        data.VerifyKeyword ?? "",
      );

      await expect(result).toContain(data.VerifyKeyword ?? "");
    });
  }
});
