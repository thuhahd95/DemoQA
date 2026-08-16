import type { Locator, Page, BrowserContext } from "@playwright/test";

export class BrowserWindowPage {
  readonly context: BrowserContext;
  readonly btnNewTab: Locator;
  readonly btnNewWindow: Locator;
  readonly btnNewWindowMessage: Locator;
  constructor(
    public readonly page: Page,
    context: BrowserContext,
  ) {
    this.context = context;
    this.btnNewTab = page.locator("#tabButton");
    this.btnNewWindow = page.locator("#windowButton");
    this.btnNewWindowMessage = page.locator("#messageWindowButton");
  }

  async gotoBrowserWindowPage() {
    await this.page.goto("/browser-windows");
  }

  async clickNewTab(): Promise<Page> {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.btnNewTab.click(),
    ]);
    await newTab.waitForLoadState();
    return newTab;
  }
  async clickNewWindow(): Promise<Page> {
    const [newWindow] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.btnNewWindow.click(),
    ]);
    await newWindow.waitForLoadState();
    return newWindow;
  }
  async clickNewWindowMessage(): Promise<Page> {
    const [newWindowMessage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.btnNewWindowMessage.click(),
    ]);
    await newWindowMessage.waitForLoadState();
    return newWindowMessage;
  }
}
