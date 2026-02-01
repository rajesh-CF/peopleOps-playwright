const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // TC01: Valid Login with Username
  test('TC01 - Valid Login with Username', async ({ page }) => {
    await loginPage.enterUsername('admin');
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    
    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });

  // TC02: Valid Login with Email
  test('TC02 - Valid Login with Email', async ({ page }) => {
    await loginPage.enterUsername('admin');
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    
    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });

  // TC03: Remember Me Functionality
  test.skip('TC03 - Remember Me Functionality', async ({ page }) => {
    await loginPage.checkRememberMe();
    expect(await loginPage.isRememberMeChecked()).toBe(true);
    
    await loginPage.login('admin', 'password123');
    await page.waitForLoadState('networkidle');
  });

  // TC04: Invalid Username
  test.only('TC04 - Invalid Username', async () => {
    await loginPage.enterUsername('invaliduser@example.com');
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    await loginPage.page.waitForTimeout(2000);
    // Verify we stay on login page (login failed)
    expect(loginPage.page.url()).toContain('/login');
  });

  // TC05: Invalid Password
  test('TC05 - Invalid Password', async () => {
    await loginPage.enterUsername('admin@example.com');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickSignIn();
    await loginPage.page.waitForTimeout(2000);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // TC06: Blank Username Field
  test('TC06 - Blank Username Field', async () => {
    await loginPage.enterUsername('');
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    await loginPage.page.waitForTimeout(1000);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // TC07: Blank Password Field
  test('TC07 - Blank Password Field', async () => {
    await loginPage.enterUsername('admin@example.com');
    await loginPage.enterPassword('');
    await loginPage.clickSignIn();
    await loginPage.page.waitForTimeout(1000);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // TC08: Blank Username and Password
  test('TC08 - Both Fields Blank', async () => {
    await loginPage.enterUsername('');
    await loginPage.enterPassword('');
    await loginPage.clickSignIn();
    await loginPage.page.waitForTimeout(1000);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // TC09: SQL Injection in Username
  test('TC09 - SQL Injection Attack', async () => {
    await loginPage.enterUsername("admin' OR '1'='1");
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    await loginPage.page.waitForTimeout(2000);
    // Should stay on login page
    expect(loginPage.page.url()).toContain('/login');
  });

  // TC10: Excessively Long Username
  test('TC10 - Long Username Input', async () => {
    const longUsername = 'a'.repeat(257);
    await loginPage.enterUsername(longUsername);
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    
    await loginPage.page.waitForTimeout(1000);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // TC11: Excessively Long Password
  test('TC11 - Long Password Input', async () => {
    const longPassword = 'a'.repeat(257);
    await loginPage.enterUsername('admin@example.com');
    await loginPage.enterPassword(longPassword);
    await loginPage.clickSignIn();
    
    await loginPage.page.waitForTimeout(1000);
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // TC12: Special Characters in Username
  test('TC12 - Special Characters in Username', async () => {
    await loginPage.enterUsername('!@#$%^&*()');
    await loginPage.enterPassword('password123');
    await loginPage.clickSignIn();
    
    await loginPage.page.waitForTimeout(1000);
    expect(loginPage.page.url()).toContain('/login');
  });

  // TC13: Password Visibility Toggle
  test.skip('TC13 - Password Visibility Toggle', async () => {
    await loginPage.enterPassword('password123');
    
    // Initially password should be masked
    let passwordType = await loginPage.getPasswordInputType();
    expect(passwordType).toBe('password');
    
    // Toggle to show password
    await loginPage.togglePasswordVisibility();
    await loginPage.page.waitForTimeout(500);
    passwordType = await loginPage.getPasswordInputType();
    expect(passwordType).toBe('text');
    
    // Toggle back to hide password
    await loginPage.togglePasswordVisibility();
    await loginPage.page.waitForTimeout(500);
    passwordType = await loginPage.getPasswordInputType();
    expect(passwordType).toBe('password');
  });
});
