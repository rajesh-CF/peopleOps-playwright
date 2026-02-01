const { test, expect } = require('@playwright/test');

test.describe('Example Tests', () => {
  test('basic test - navigate to Playwright website', async ({ page }) => {
    // Navigate to Playwright website
    await page.goto('https://playwright.dev/');
    
    // Verify the page title
    await expect(page).toHaveTitle(/Playwright/);
    
    // Click on 'Get started' link
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // Verify we're on the docs page
    await expect(page).toHaveURL(/.*intro/);
  });

  test('check search functionality', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Click search button
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Type in search
    await page.getByPlaceholder('Search docs').fill('test');
    
    // Wait for results
    await page.waitForTimeout(1000);
  });

  test('example - check Google homepage', async ({ page }) => {
    await page.goto('https://www.google.com');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/Google/);
    
    // Check search box exists
    const searchBox = page.getByRole('combobox', { name: /search/i });
    await expect(searchBox).toBeVisible();
  });
});
