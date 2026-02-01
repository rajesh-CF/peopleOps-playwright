import { test as setup } from '@playwright/test';
import { LoginPage } from './page/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ browser }) => {
  // Create context WITHOUT loading storageState to avoid circular dependency
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.navigate();
  
  // Perform login
  await loginPage.login('Admin', 'admin123');
  
  // Wait for dashboard to load
  await page.waitForLoadState('networkidle');
  
  // Save authenticated session to storage
  await context.storageState({ path: authFile });
  await context.close();
  
  await context.close();
});
