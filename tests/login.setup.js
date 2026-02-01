import { test as setup } from '@playwright/test';

setup('Login and save session', async ({ browser }) => {
  // Create context without storageState to avoid reading non-existent auth file
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForSelector('h6:has-text("Dashboard")');
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  
  await context.storageState({ path: 'playwright/.auth/user.json' });
  await context.close();
});
