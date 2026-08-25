import type { Page, Locator } from "@playwright/test";
export class TestBase {
  constructor(public readonly page: Page) {}
  async goTo(url: string) {
    await this.page.goto(url);
  }
  async clickAcceptInAlert(alertMessage: string): Promise<string> {
    this.page.on("dialog", async (dialog) => {
      if (dialog.message() === alertMessage) {
        await dialog.accept();
      }
    });
    return this.page.url();
  }

  async clickDismissInAlert(alertMessage: string): Promise<string> {
    this.page.on("dialog", async (dialog) => {
      if (dialog.message() === alertMessage) {
        await dialog.dismiss();
      }
    });
    return this.page.url();
  }

  async clickDissmissWithTimr(
    alertMessage: string,
    waitTime: number,
  ): Promise<string> {
    this.page.on("dialog", async (dialog) => {
      if (dialog.message() === alertMessage) {
        await this.page.waitForTimeout(waitTime);
        await dialog.dismiss();
      }
    });
    return this.page.url();
  }

  async clickAcceptWithPrompt(
    alertMessage: string,
    promptInput: string,
  ): Promise<string> {
    this.page.on("dialog", async (dialog) => {
      if (dialog.message() === alertMessage) {
        await dialog.accept(promptInput);
      }
    });
    return this.page.url();
  }
}
