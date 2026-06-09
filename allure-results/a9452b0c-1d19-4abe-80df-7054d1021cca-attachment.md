# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TextBoxTest.spec.ts >> TextBox Tests >> Email format is wrong (without "@")
- Location: tests\TextBoxTest.spec.ts:29:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(255, 0, 0)"
Received: "rgb(33, 37, 41)"
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - link [ref=e4] [cursor=pointer]:
      - /url: https://demoqa.com
      - img [ref=e5]
  - generic [ref=e8]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e14] [cursor=pointer]:
          - generic [ref=e15]:
            - img [ref=e17]
            - text: Elements
          - img [ref=e22]
        - list [ref=e25]:
          - listitem [ref=e26] [cursor=pointer]:
            - link "Text Box" [ref=e27]:
              - /url: /text-box
              - img [ref=e28]
              - text: Text Box
          - listitem [ref=e30] [cursor=pointer]:
            - link "Check Box" [ref=e31]:
              - /url: /checkbox
              - img [ref=e32]
              - text: Check Box
          - listitem [ref=e34] [cursor=pointer]:
            - link "Radio Button" [ref=e35]:
              - /url: /radio-button
              - img [ref=e36]
              - text: Radio Button
          - listitem [ref=e38] [cursor=pointer]:
            - link "Web Tables" [ref=e39]:
              - /url: /webtables
              - img [ref=e40]
              - text: Web Tables
          - listitem [ref=e42] [cursor=pointer]:
            - link "Buttons" [ref=e43]:
              - /url: /buttons
              - img [ref=e44]
              - text: Buttons
          - listitem [ref=e46] [cursor=pointer]:
            - link "Links" [ref=e47]:
              - /url: /links
              - img [ref=e48]
              - text: Links
          - listitem [ref=e50] [cursor=pointer]:
            - link "Broken Links - Images" [ref=e51]:
              - /url: /broken
              - img [ref=e52]
              - text: Broken Links - Images
          - listitem [ref=e54] [cursor=pointer]:
            - link "Upload and Download" [ref=e55]:
              - /url: /upload-download
              - img [ref=e56]
              - text: Upload and Download
          - listitem [ref=e58] [cursor=pointer]:
            - link "Dynamic Properties" [ref=e59]:
              - /url: /dynamic-properties
              - img [ref=e60]
              - text: Dynamic Properties
      - generic [ref=e64] [cursor=pointer]:
        - generic [ref=e65]:
          - img [ref=e67]
          - text: Forms
        - img [ref=e73]
      - generic [ref=e77] [cursor=pointer]:
        - generic [ref=e78]:
          - img [ref=e80]
          - text: Alerts, Frame & Windows
        - img [ref=e85]
      - generic [ref=e89] [cursor=pointer]:
        - generic [ref=e90]:
          - img [ref=e92]
          - text: Widgets
        - img [ref=e98]
      - generic [ref=e102] [cursor=pointer]:
        - generic [ref=e103]:
          - img [ref=e105]
          - text: Interactions
        - img [ref=e110]
      - generic [ref=e114] [cursor=pointer]:
        - generic [ref=e115]:
          - img [ref=e117]
          - text: Book Store Application
        - img [ref=e122]
    - generic [ref=e124]:
      - heading "Text Box" [level=1] [ref=e125]
      - generic [ref=e127]:
        - generic [ref=e128]:
          - generic [ref=e130]: Full Name
          - textbox "Full Name" [ref=e132]: John Doe
        - generic [ref=e133]:
          - generic [ref=e135]: Email
          - textbox "name@example.com" [ref=e137]: john.doeexample.com
        - generic [ref=e138]:
          - generic [ref=e140]: Current Address
          - textbox "Current Address" [ref=e142]: 123 Main St
        - generic [ref=e143]:
          - generic [ref=e145]: Permanent Address
          - textbox [ref=e147]: 456 Elm St
        - button "Submit" [active] [ref=e150] [cursor=pointer]
  - contentinfo [ref=e157]:
    - generic [ref=e158]: © 2013-2026 TOOLSQA.COM | ALL RIGHTS RESERVED.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { TextBoxPage } from '../pages/TextBoxPage.js';
  3  | 
  4  | test.describe('TextBox Tests', () => {
  5  | let textBoxPage: TextBoxPage;
  6  | 
  7  | test.beforeEach(async ({ page }) => {
  8  |     textBoxPage = new TextBoxPage(page);
  9  |     await textBoxPage.goTo();
  10 | }); 
  11 | 
  12 | test('Submit Successfully', async () => {
  13 |   const fullName: string = 'John Doe';
  14 |   const email: string = 'john.doe@example.com';
  15 |   const currentAddress: string = '123 Main St';
  16 |   const permanentAddress: string = '456 Elm St';
  17 |     await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
  18 |     const actualNameText: string = await textBoxPage.getTextByLocator(textBoxPage.lbName);
  19 |     const actualEmailText: string = await textBoxPage.getTextByLocator(textBoxPage.lbEmail);
  20 |     const actualCurrentAddressText: string = await textBoxPage.getTextByLocator(textBoxPage.lbCurrentAddress);
  21 |     const actualPermanentAddressText: string = await textBoxPage.getTextByLocator(textBoxPage.lbPermanentAddress);
  22 |     await expect(actualNameText).toBe(fullName);
  23 |     await expect(actualEmailText).toBe(email);
  24 |     await expect(actualCurrentAddressText).toBe(currentAddress);
  25 |     await expect(actualPermanentAddressText).toBe(permanentAddress);
  26 |     
  27 |   });
  28 | 
  29 | test('Email format is wrong (without "@")', async () => {
  30 |   const fullName: string = 'John Doe';
  31 |   const email: string = 'john.doeexample.com';
  32 |   const currentAddress: string = '123 Main St';
  33 |   const permanentAddress: string = '456 Elm St';
  34 |     await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
> 35 |     await expect(await textBoxPage.getCssValue(textBoxPage.txtEmail)).toBe('rgb(255, 0, 0)'); // Red color indicates error  
     |                                                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  36 |   });
  37 | 
  38 | });
  39 | 
  40 | 
```