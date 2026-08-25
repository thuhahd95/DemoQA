import type { Page, Locator } from "@playwright/test";
export class FramesPage {
  readonly lblFrames: Locator;
  constructor(public readonly page: Page) {
    this.lblFrames = page.locator("xpath=//h1[text()='Frames']");
  }
  async switchToFrame(): Promise<string | null> {
    await this.page.frameLocator("#frame1");
    await this.page.locator("#sampleHeading").waitFor();
    const sampleHeadingText = await this.page
      .locator("#sampleHeading")
      .textContent();
    return sampleHeadingText;
  }
}
