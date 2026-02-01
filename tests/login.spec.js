import { test, expect } from '@playwright/test';

test.describe('Login Test Suite', () => {

test('TC_LOGIN_01 – Valid Login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.login('Admin', 'admin123');

  await expect(page).toHaveURL(/dashboard/);
});

test('TC_LOGIN_02 – Invalid Password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('Admin', 'admin12345');

    await expect(page.locator(login.errorMsg)).toHaveText('Invalid credentials');
  });

  test('TC_LOGIN_03 – Empty Username', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('', 'admin123');
    await expect(page.locator(login.errorMsg)).toHaveText('Required');
  }); 

   test('TC_LOGIN_04 – Empty Password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('Admin', '');
    await expect(page.locator(login.errorMsg)).toHaveText('Required');
  });

   test('TC_LOGIN_05 – Both Fields Empty', async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login('', '');
    await expect(page.locator(login.errorMsg)).toHaveText(
      'Required under both fields'
    );
  });
})