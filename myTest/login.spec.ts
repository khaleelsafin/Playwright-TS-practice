import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from '@playwright/test';

test('login test', async ({page, browserName},testInfo)=> {
    // const browser:Browser = await chromium.launch({headless:false, channel:'chrome'})
    // const page:Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login")
    const emailId:Locator = await page.locator('[id="input-email"]')
    const password:Locator = await page.locator('#input-password')
    const loginButton:Locator = await page.locator('[value="Login"]')

     await emailId.fill("pwtest@opencart.com")
     await password.fill("playwright@123")
     await loginButton.click();

     const title = await page.title();
     console.log("home page title: "+title)


      const screenshotBuffer = await page.screenshot({path: `screenshot/homepage-${browserName}_${testInfo.project.name}.png`})

    //   await testInfo.attach('my-screenshot', {
    //     body: screenshotBuffer,
    //     contentType: 'image/png'
    // });

     expect(title).toEqual("Account Login")

    //  await browser.close();
})