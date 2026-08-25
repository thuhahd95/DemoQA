import { test, expect } from "@playwright/test";
import { AlertsPage } from "../pages/AlertsPage.js";
import { TestBase } from "../common/TestBase.js";

test.describe("Alerts Test", () => {
  let alertPage: AlertsPage;
  let testBase: TestBase;

  test.beforeEach("Go to alert page", async ({ page }) => {
    // Navigate to the page containing the alert button
    alertPage = new AlertsPage(page);
    testBase = new TestBase(page);

    await testBase.goTo("/alerts");
  });

  test("Verify alert with a button", async ({ page }) => {
    // Click the button that triggers the alert
    await alertPage.btnAlert.click();
    // Wait for the alert to appear and accept it

    // page.on("dialog", async (dialog) => {
    //   expect(dialog.message()).toBe("You clicked a button");
    //   await dialog.accept();
    // });
    testBase.clickAcceptInAlert("You clicked a button");
    await expect(alertPage.lblAlert).toBeVisible();
  });

  test("Verify alert with a timer", async ({ page }) => {
    await alertPage.btnAlertWithTime.click();
    // Wait for the alert to appear and accept it
    // page.on("dialog", async (dialog) => {
    //   expect(dialog.message()).toBe("This alert appeared after 5 seconds");
    //   await page.waitForTimeout(5000); // Wait for 5 seconds before accepting the alert
    //   await dialog.accept();
    // });
    testBase.clickDissmissWithTimr("This alert appeared after 5 seconds", 5000);
    await expect(alertPage.lblAlert).toBeVisible();
  });

  test("Verify alert with two buttons", async ({ page }) => {
    const confirmResultCancel = "You selected Cancel";
    const confirmResultOk = "You selected Ok";

    await alertPage.btnAlertWithConfirm.click();
    // Wait for the alert to appear and accept it
    // page.on("dialog", async (dialog) => {
    //   expect(dialog.message()).toBe("Do you confirm action?");
    //   await dialog.dismiss();
    // });
    testBase.clickDismissInAlert("Do you confirm action?");
    const actualResultCancel: string =
      (await alertPage.lblConfirmResult.textContent()) || "";
    await expect(actualResultCancel.trim()).toBe(confirmResultCancel);

    await alertPage.btnAlertWithConfirm.click();
    // page.on("dialog", async (dialog) => {
    //   expect(dialog.message()).toBe("Do you confirm action?");
    //   await dialog.accept();
    // });
    testBase.clickAcceptInAlert("Do you confirm action?");
    const actualResultOk: string =
      (await alertPage.lblConfirmResult.textContent()) || "";
    await expect(actualResultOk.trim()).toBe(confirmResultOk);
  });

  test("Verify alert with a prompt", async ({ page }) => {
    const promptInput = "John Doe";
    const promptResult = `You entered ${promptInput}`;

    await alertPage.btnAlertWithPrompt.click();
    // page.on("dialog", async (dialog) => {
    //   expect(dialog.message()).toBe("Please enter your name");
    //   await dialog.accept(promptInput);
    // });
    testBase.clickAcceptWithPrompt("Please enter your name", promptInput);
    const actualResult: string =
      (await alertPage.lblConfirmResult.textContent()) || "";
    await expect(actualResult.trim()).toBe(promptResult);
  });
});
