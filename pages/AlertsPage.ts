import type { Page, Locator } from "@playwright/test";
export class AlertsPage {
  readonly btnAlert: Locator;
  readonly btnAlertWithTime: Locator;
  readonly btnAlertWithConfirm: Locator;
  readonly btnAlertWithPrompt: Locator;
  readonly lblAlert: Locator;
  readonly lblConfirmResult: Locator;
  constructor(public readonly page: Page) {
    this.btnAlert = page.locator("#alertButton");
    this.btnAlertWithTime = page.locator("#timerAlertButton");
    this.btnAlertWithConfirm = page.locator("#confirmButton");
    this.btnAlertWithPrompt = page.locator("#promptButton");
    this.lblAlert = page.locator("xpath=//h1[text()='Alerts']");
    this.lblConfirmResult = page.locator("#confirmResult");
  }
  // async goTo() {
  //   await this.page.goto("/alerts");
  // }
}
