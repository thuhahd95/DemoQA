import { test, expect } from "@playwright/test";
import { BrowserWindowPage } from "../pages/BrowserWindowPage.js";
import { NewTabPage } from "../pages/NewTabPage.js";
import { NewWindowMessagePage } from "../pages/NewWindowMessage.js";
import { NewWindowPage } from "../pages/NewWindowPage.js";

test.describe("Browser Window Test", () => {
  let browserWindowPage: BrowserWindowPage;
  test.beforeEach(async ({ context }) => {
    const page = await context.newPage();
    browserWindowPage = new BrowserWindowPage(page, context);
    await browserWindowPage.gotoBrowserWindowPage();
  });
  test("Verify new tab opens with correct URL", async ({ context }) => {
    const newPage = await browserWindowPage.clickNewTab();
    const newTabPage = new NewTabPage(newPage);
    const actualSampleHeading = await newTabPage.getSampleHeadingText();
    expect(actualSampleHeading).toBe("This is a sample page");
  });
  test("Verify new window opens with correct URL", async ({ context }) => {
    const newWindow = await browserWindowPage.clickNewWindow();
    const newWindowPage = new NewWindowPage(newWindow);
    const actualSampleHeading = await newWindowPage.getSampleHeadingText();
    expect(actualSampleHeading).toBe("This is a sample page");
  });
  test("Verify new window message opens with correct message", async ({
    context,
  }) => {
    const newWindowMessage = await browserWindowPage.clickNewWindowMessage();
    const newWindowMessagePage = new NewWindowMessagePage(newWindowMessage);
    const actualSampleHeading =
      await newWindowMessagePage.getSampleHeadingText();
    expect(actualSampleHeading).toBe(
      "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.",
    );
  });
});
