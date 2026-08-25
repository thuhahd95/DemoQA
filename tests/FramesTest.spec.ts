import { test, expect } from "@playwright/test";
import { FramesPage } from "../pages/FramesPage.js";
import { TestBase } from "../common/TestBase.js";
test.describe("Frames Test", () => {
  let framesPage: FramesPage;
  let testBase: TestBase;
  test.beforeEach("Go to frames page", async ({ page }) => {
    framesPage = new FramesPage(page);
    testBase = new TestBase(page);
    await testBase.goTo("/frames");
  });
  test("Verify switch to frame", async ({ page }) => {
    const sampleHeadingText = await framesPage.switchToFrame();
    expect(sampleHeadingText).toBe("This is a sample page");
  });
});
