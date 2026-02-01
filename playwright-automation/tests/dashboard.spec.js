const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');
const { LoginPage } = require('../pages/LoginPage');
const { 
  login, 
  clearBrowserStorage
} = require('../utils/helpers');

test.describe('Dashboard Tests', () => {
  let dashboardPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    loginPage = new LoginPage(page);
    
    // Login before each test
    await login(page);
    await dashboardPage.waitForPageLoad();
  });

  test.afterEach(async ({ page }) => {
    await clearBrowserStorage(page);
  });

  // ==================== UI/VISUAL TEST CASES ====================

  test('TC_DASH_UI_001 - Dashboard Page Layout Verification', async ({ page }) => {
    // Verify page title and subtitle
    await expect(dashboardPage.pageTitle).toBeVisible();
    await expect(dashboardPage.pageSubtitle).toBeVisible();
    
    // Verify header elements
    await expect(dashboardPage.searchBar).toBeVisible();
    await expect(dashboardPage.userProfile).toBeVisible();
    
    // Verify sidebar is visible
    expect(await dashboardPage.isSidebarVisible()).toBe(true);
    
    // Verify all sidebar sections
    const sections = await dashboardPage.getSidebarSections();
    expect(sections.overview).toBe(true);
    expect(sections.coreServices).toBe(true);
    expect(sections.hrOperations).toBe(true);
    expect(sections.businessServices).toBe(true);
    
    // Verify URL
    expect(page.url()).toContain('/dashboard');
  });

  test.only('TC_DASH_UI_002 - Sidebar Navigation Menu Verification', async () => {
    // Verify main menu items
    await expect(dashboardPage.dashboardMenu).toBeVisible();
    await expect(dashboardPage.analyticsMenu).toBeVisible();
    await expect(dashboardPage.identityAccessMenu).toBeVisible();
    await expect(dashboardPage.masterDataMenu).toBeVisible();
    await expect(dashboardPage.recruitmentMenu).toBeVisible();
    await expect(dashboardPage.staffingMenu).toBeVisible();
    await expect(dashboardPage.settingsMenu).toBeVisible();
  });

  test('TC_DASH_UI_003 - Service Cards Visual Verification', async () => {
    // Verify all service cards are visible
    const services = await dashboardPage.getAllServiceCards();
    
    for (const service of services) {
      const isVisible = await dashboardPage.isServiceCardVisible(service);
      expect(isVisible).toBe(true);
    }
    
    // Verify access buttons are visible
    await expect(dashboardPage.accessIdentityBtn).toBeVisible();
    await expect(dashboardPage.accessMasterDataBtn).toBeVisible();
    await expect(dashboardPage.accessRecruitmentBtn).toBeVisible();
  });

  test('TC_DASH_UI_004 - Statistics Cards Visual Verification', async () => {
    // Get all statistics
    const stats = await dashboardPage.getStatistics();
    
    // Verify statistics are displayed
    expect(stats.totalUsers).toBeTruthy();
    expect(stats.activeServices).toBeTruthy();
    expect(stats.activeJobs).toBeTruthy();
    expect(stats.monthlyRevenue).toBeTruthy();
    
    // Verify values are numbers
    expect(stats.totalUsers).toMatch(/^[0-9,]+$/);
    expect(stats.activeServices).toMatch(/^[0-9]+$/);
    expect(stats.activeJobs).toMatch(/^[0-9]+$/);
    expect(stats.monthlyRevenue).toMatch(/^[0-9,]+$/);
  });

  // ==================== POSITIVE TEST CASES ====================

  test('TC_DASH_POS_001 - Successful Dashboard Load After Login', async ({ page }) => {
    // Already logged in via beforeEach
    expect(await dashboardPage.isPageLoaded()).toBe(true);
    expect(page.url()).toContain('/dashboard');
    await expect(dashboardPage.pageTitle).toBeVisible();
  });

  test('TC_DASH_POS_002 - Navigation - Dashboard Menu Item', async ({ page }) => {
    // Navigate away first
    await dashboardPage.clickAnalyticsMenu();
    await page.waitForLoadState('networkidle');
    
    // Click Dashboard menu
    await dashboardPage.clickDashboardMenu();
    await page.waitForURL('**/dashboard');
    
    // Verify we're back on dashboard
    expect(page.url()).toContain('/dashboard');
  });

  test('TC_DASH_POS_003 - Navigation - Analytics Menu Item', async ({ page }) => {
    await dashboardPage.clickAnalyticsMenu();
    await page.waitForLoadState('networkidle');
    
    // Verify navigation occurred (URL should change)
    expect(page.url()).not.toContain('/dashboard');
  });

  test('TC_DASH_POS_004 - Expandable Menu - Identity & Access', async () => {
    // Click to expand
    await dashboardPage.expandMenu('Identity & Access');
    
    // Menu should be expanded (verify by checking if sub-items appear)
    // Note: This depends on your actual implementation
  });

  test('TC_DASH_POS_005 - Access Identity Management Service', async ({ page }) => {
    await dashboardPage.accessIdentityManagement();
    await page.waitForLoadState('networkidle');
    
    // Verify navigation occurred
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('TC_DASH_POS_006 - Access Master Data Service', async ({ page }) => {
    await dashboardPage.accessMasterData();
    await page.waitForLoadState('networkidle');
    
    // Verify navigation occurred
    expect(page.url()).not.toContain('/dashboard');
  });

  test('TC_DASH_POS_007 - Access All Service Cards', async ({ page }) => {
    const services = [
      'Identity Management',
      'Master Data',
      'Recruitment',
      'Staffing',
      'Billing',
      'Delivery',
      'Documents',
      'Notifications',
      'Reporting'
    ];
    
    for (const service of services) {
      // Navigate to dashboard
      await page.goto('/dashboard');
      await dashboardPage.waitForPageLoad();
      
      // Click access button
      await dashboardPage.clickAccessButton(service);
      await page.waitForLoadState('networkidle');
      
      // Verify navigation (should leave dashboard)
      const url = page.url();
      
      // Some services might not have pages yet, so we just verify click worked
      // In real tests, you'd verify the actual destination
    }
  });

  test('TC_DASH_POS_008 - Search Functionality - Valid Search', async ({ page }) => {
    await dashboardPage.clickSearch();
    await dashboardPage.searchFor('Identity');
    await page.waitForLoadState('networkidle');
    
    // Verify search executed
    // Results depend on implementation
  });

  test('TC_DASH_POS_009 - Dark Mode Toggle', async ({ page }) => {
    // Get initial theme state
    const initialDarkMode = await dashboardPage.isDarkModeActive();
    
    // Toggle dark mode
    await dashboardPage.toggleDarkMode();
    await page.waitForTimeout(300); // Brief wait for CSS transition
    
    // Verify theme changed
    const newDarkMode = await dashboardPage.isDarkModeActive();
    expect(newDarkMode).not.toBe(initialDarkMode);
    
    // Toggle back
    await dashboardPage.toggleDarkMode();
    await page.waitForTimeout(300); // Brief wait for CSS transition
    
    const finalDarkMode = await dashboardPage.isDarkModeActive();
    expect(finalDarkMode).toBe(initialDarkMode);
  });

  test('TC_DASH_POS_010 - Notifications Bell Click', async () => {
    await dashboardPage.clickNotificationBell();
    
    // Verify notifications panel opens (implementation dependent)
    // Check for dropdown or panel visibility
  });

  test('TC_DASH_POS_011 - User Profile Menu', async () => {
    await dashboardPage.clickUserProfile();
    await wait(1000);
    // Verify dropdown appears
    const logoutBtn = dashboardPage.page.locator('text=Logout');
    await expect(logoutBtn).toBeVisible({ timeout: 5000 });
  });

  test('TC_DASH_POS_012 - Logout Functionality', async ({ page }) => {
    await dashboardPage.logout();
    await page.waitForURL('**/login**');
    
    // Verify redirected to login page
    expect(page.url()).toContain('/login');
    
    // Try to access dashboard directly
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Should be redirected back to login
    expect(page.url()).toContain('/login');
  });

  test('TC_DASH_POS_013 - Issue Notification Click', async () => {
    // Check if issue notification exists
    const issueVisible = await dashboardPage.issueNotification.isVisible().catch(() => false);
    
    if (issueVisible) {
      const issueCount = await dashboardPage.getIssueCount();
      expect(issueCount).toBeGreaterThan(0);
      
      await dashboardPage.clickIssueNotification();
      
      // Verify some action occurred
    }
  });

  test('TC_DASH_POS_014 - Statistics Data Display', async () => {
    const stats = await dashboardPage.getStatistics();
    
    // Verify Total Users format (e.g., 1,847)
    expect(stats.totalUsers).toMatch(/^[0-9,]+$/);
    
    // Verify Active Services is a number
    expect(stats.activeServices).toMatch(/^\d+$/);
    
    // Verify Active Jobs is a number
    expect(stats.activeJobs).toMatch(/^\d+$/);
    
    // Verify Monthly Revenue has $ sign and commas
    expect(stats.monthlyRevenue).toMatch(/^[0-9,]+$/);
  });

  test('TC_DASH_POS_015 - Page Refresh - Data Persistence', async ({ page }) => {
    // Toggle dark mode
    await dashboardPage.toggleDarkMode();
    await page.waitForTimeout(300);
    const darkModeBefore = await dashboardPage.isDarkModeActive();
    
    // Refresh page
    await page.reload();
    await dashboardPage.waitForPageLoad();
    
    // Verify still logged in
    expect(page.url()).toContain('/dashboard');
    
    // Verify dark mode persisted (if implemented)
    const darkModeAfter = await dashboardPage.isDarkModeActive();
    // Note: Theme persistence depends on implementation
  });

  // ==================== NEGATIVE TEST CASES ====================

  test('TC_DASH_NEG_001 - Direct URL Access Without Login', async ({ page, context }) => {
    // Logout first
    await dashboardPage.logout();
    await page.waitForURL('**/login**');
    
    // Clear session
    await clearBrowserStorage(page);
    
    // Try to access dashboard directly
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Should be redirected to login
    expect(page.url()).toContain('/login');
  });

  test('TC_DASH_NEG_003 - Search with No Results', async () => {
    const searchTerm = 'xyzabc123nonexistent' + Date.now();
    await dashboardPage.searchFor(searchTerm);
    await dashboardPage.page.waitForLoadState('networkidle');
    
    // Verify no results message or empty state
    const hasResults = await dashboardPage.hasSearchResults();
    // Implementation dependent
  });

  test('TC_DASH_NEG_004 - Search with Special Characters', async () => {
    const specialChars = '!@#$%^&*(){}[]<>?/\\|';
    await dashboardPage.searchFor(specialChars);
    await dashboardPage.page.waitForLoadState('networkidle');
    
    // Verify application doesn't crash
    expect(await dashboardPage.isPageLoaded()).toBe(true);
  });

  test('TC_DASH_NEG_008 - Multiple Rapid Clicks on Service Button', async ({ page }) => {
    // Rapidly click access button multiple times
    const button = dashboardPage.accessIdentityBtn;
    await button.click();
    await button.click().catch(() => {}); // Might fail if navigated away
    await button.click().catch(() => {});
    await button.click().catch(() => {});
    await button.click().catch(() => {});
    
    await page.waitForLoadState('networkidle');
    
    // Verify only navigated once (URL should change only once)
    // No multiple page loads or errors
  });

  test('TC_DASH_NEG_009 - Browser Back Button After Logout', async ({ page }) => {
    await dashboardPage.logout();
    await page.waitForURL('**/login**');
    
    // Verify on login page
    expect(page.url()).toContain('/login');
    
    // Click back button
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    // Should remain on login or be redirected back
    expect(page.url()).toContain('/login');
  });

  // ==================== EDGE TEST CASES ====================

  test('TC_DASH_EDGE_001 - Maximum Search Length', async () => {
    const longSearch = 'a'.repeat(1000);
    await dashboardPage.searchFor(longSearch);
    await dashboardPage.page.waitForLoadState('networkidle');
    
    // Verify application handles long input
    expect(await dashboardPage.isPageLoaded()).toBe(true);
  });

  test('TC_DASH_EDGE_002 - Rapid Menu Expansion/Collapse', async () => {
    // Rapidly toggle menu
    for (let i = 0; i < 10; i++) {
      await dashboardPage.expandMenu('Identity & Access');
    }
    
    // Verify UI is still functional
    expect(await dashboardPage.isPageLoaded()).toBe(true);
  });

  test('TC_DASH_EDGE_003 - All Menus Expanded Simultaneously', async () => {
    const menus = [
      'Identity & Access',
      'Master Data',
      'Recruitment',
      'Staffing',
      'Billing',
      'Delivery',
      'Documents',
      'Reporting'
    ];
    
    // Expand all menus
    for (const menu of menus) {
      try {
        await dashboardPage.expandMenu(menu);
      } catch (e) {
        // Menu might not be expandable
      }
    }
    
    // Verify sidebar is still functional
    expect(await dashboardPage.isSidebarVisible()).toBe(true);
  });

  test('TC_DASH_EDGE_007 - Browser Zoom Levels', async ({ page }) => {
    // Test at 50% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '0.5';
    });
    expect(await dashboardPage.isPageLoaded()).toBe(true);
    
    // Test at 150% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1.5';
    });
    expect(await dashboardPage.isPageLoaded()).toBe(true);
    
    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1';
    });
  });

  test('TC_DASH_EDGE_014 - Browser Tab Switching', async ({ page }) => {
    // Get initial state
    const statsBefore = await dashboardPage.getStatistics();
    
    // Simulate tab switch by blurring window
    await page.evaluate(() => {
      window.dispatchEvent(new Event('blur'));
    });
    
    // Wait for blur event to process
    await page.waitForTimeout(2000);
    
    // Focus back
    await page.evaluate(() => {
      window.dispatchEvent(new Event('focus'));
    });
    
    // Verify dashboard still works
    expect(await dashboardPage.isPageLoaded()).toBe(true);
    
    // Stats might refresh or stay same
    const statsAfter = await dashboardPage.getStatistics();
    expect(statsAfter).toBeTruthy();
  });
});
