class DashboardPage {
  constructor(page) {
    this.page = page;
    
    // Header Elements
    this.pageTitle = page.locator('text=PeopleOps Platform');
    this.pageSubtitle = page.locator('text=Enterprise HR and Operations Management System');
    this.searchBar = page.locator('input[placeholder*="Search"]');
    this.darkModeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="dark"]').first();
    this.notificationBell = page.locator('button[aria-label*="notification"]').first();
    this.userProfile = page.locator('text=AU').last();
    
    // Sidebar Menu Items
    this.sidebar = page.locator('nav, [role="navigation"], aside').first();
    this.dashboardMenu = this.sidebar.locator('text=Dashboard').first();
    this.analyticsMenu = this.sidebar.locator('text=Analytics').first();
    this.identityAccessMenu = this.sidebar.locator('text=Identity & Access').first();
    this.masterDataMenu = this.sidebar.locator('text=Master Data').first();
    this.recruitmentMenu = this.sidebar.locator('text=Recruitment').first();
    this.staffingMenu = this.sidebar.locator('text=Staffing').first();
    this.settingsMenu = this.sidebar.locator('text=Settings').first();
    
    // Service Cards
    this.identityManagementCard = page.locator('text=Identity Management').first();
    this.masterDataCard = page.locator('text=Master Data').first();
    this.recruitmentCard = page.locator('text=Recruitment').first();
    this.staffingCard = page.locator('text=Staffing').first();
    this.billingCard = page.locator('text=Billing').first();
    this.deliveryCard = page.locator('text=Delivery').first();
    this.documentsCard = page.locator('text=Documents').first();
    this.notificationsCard = page.locator('text=Notifications').first();
    this.reportingCard = page.locator('text=Reporting').first();
    
    // Service Access Buttons
    this.accessIdentityBtn = page.locator('button:has-text("Access Identity Management")');
    this.accessMasterDataBtn = page.locator('button:has-text("Access Master Data")');
    this.accessRecruitmentBtn = page.locator('button:has-text("Access Recruitment")');
    this.accessStaffingBtn = page.locator('button:has-text("Access Staffing")');
    this.accessBillingBtn = page.locator('button:has-text("Access Billing")');
    this.accessDeliveryBtn = page.locator('button:has-text("Access Delivery")');
    this.accessDocumentsBtn = page.locator('button:has-text("Access Documents")');
    this.accessNotificationsBtn = page.locator('button:has-text("Access Notifications")');
    this.accessReportingBtn = page.locator('button:has-text("Access Reporting")');
    
    // Statistics
    this.totalUsersValue = page.locator('text=Total Users').locator('..').locator('text=/^[0-9,]+$/');
    this.activeServicesValue = page.locator('text=Active Services').locator('..').locator('text=/^[0-9]+$/');
    this.activeJobsValue = page.locator('text=Active Jobs').locator('..').locator('text=/^[0-9]+$/');
    this.monthlyRevenueValue = page.locator('text=Monthly Revenue').locator('..').locator('text=/^\\$[0-9,]+$/');
    
    // Issue Notification
    this.issueNotification = page.locator('text=/\\d+ Issue/');
  }

  async navigate() {
    await this.page.goto('/dashboard');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isPageLoaded() {
    try {
      await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getCurrentURL() {
    return this.page.url();
  }

  // Header Actions
  async clickSearch() {
    await this.searchBar.click();
  }

  async searchFor(text) {
    await this.searchBar.fill(text);
    await this.searchBar.press('Enter');
  }

  async toggleDarkMode() {
    await this.darkModeToggle.click();
  }

  async clickNotificationBell() {
    await this.notificationBell.click();
  }

  async clickUserProfile() {
    await this.userProfile.click();
  }

  async logout() {
    await this.clickUserProfile();
    await this.page.waitForTimeout(500);
    await this.page.locator('text=Logout').click();
  }

  // Navigation Methods
  async clickDashboardMenu() {
    await this.dashboardMenu.click();
  }

  async clickAnalyticsMenu() {
    await this.analyticsMenu.click();
  }

  async expandMenu(menuName) {
    await this.page.locator(`text=${menuName}`).first().click();
  }

  async isMenuExpanded(menuName) {
    const menu = this.page.locator(`text=${menuName}`).first().locator('..');
    const expanded = await menu.getAttribute('aria-expanded');
    return expanded === 'true';
  }

  // Service Access Methods
  async clickAccessButton(serviceName) {
    const button = this.page.locator(`button:has-text("Access ${serviceName}")`);
    await button.click();
  }

  async accessIdentityManagement() {
    await this.accessIdentityBtn.click();
  }

  async accessMasterData() {
    await this.accessMasterDataBtn.click();
  }

  async accessRecruitment() {
    await this.accessRecruitmentBtn.click();
  }

  async accessStaffing() {
    await this.accessStaffingBtn.click();
  }

  async accessBilling() {
    await this.accessBillingBtn.click();
  }

  async accessDelivery() {
    await this.accessDeliveryBtn.click();
  }

  async accessDocuments() {
    await this.accessDocumentsBtn.click();
  }

  async accessNotifications() {
    await this.accessNotificationsBtn.click();
  }

  async accessReporting() {
    await this.accessReportingBtn.click();
  }

  // Verification Methods
  async isServiceCardVisible(serviceName) {
    const card = this.page.locator(`text=${serviceName}`).first();
    return await card.isVisible();
  }

  async getAllServiceCards() {
    return [
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
  }

  async verifyAllServiceCardsVisible() {
    const services = await this.getAllServiceCards();
    const results = {};
    
    for (const service of services) {
      results[service] = await this.isServiceCardVisible(service);
    }
    
    return results;
  }

  async getTotalUsers() {
    const text = await this.page.locator('text=Total Users').locator('..').textContent();
    const match = text.match(/([0-9,]+)/);
    return match ? match[1] : null;
  }

  async getActiveServices() {
    const text = await this.page.locator('text=Active Services').locator('..').textContent();
    const match = text.match(/(\d+)/);
    return match ? match[1] : null;
  }

  async getActiveJobs() {
    const text = await this.page.locator('text=Active Jobs').locator('..').textContent();
    const match = text.match(/(\d+)/);
    return match ? match[1] : null;
  }

  async getMonthlyRevenue() {
    const text = await this.page.locator('text=Monthly Revenue').locator('..').textContent();
    const match = text.match(/\$([0-9,]+)/);
    return match ? match[1] : null;
  }

  async getStatistics() {
    return {
      totalUsers: await this.getTotalUsers(),
      activeServices: await this.getActiveServices(),
      activeJobs: await this.getActiveJobs(),
      monthlyRevenue: await this.getMonthlyRevenue()
    };
  }

  async clickIssueNotification() {
    await this.issueNotification.click();
  }

  async getIssueCount() {
    const text = await this.issueNotification.textContent();
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // Sidebar Verification
  async isSidebarVisible() {
    return await this.dashboardMenu.isVisible();
  }

  async getSidebarSections() {
    return {
      overview: await this.page.locator('text=OVERVIEW').isVisible(),
      coreServices: await this.page.locator('text=CORE SERVICES').isVisible(),
      hrOperations: await this.page.locator('text=HR OPERATIONS').isVisible(),
      businessServices: await this.page.locator('text=BUSINESS SERVICES').isVisible(),
      communication: await this.page.locator('text=COMMUNICATION & REPORTING').isVisible(),
      system: await this.page.locator('text=SYSTEM').isVisible()
    };
  }

  // Search Results
  async hasSearchResults() {
    const noResults = await this.page.locator('text=/No results|No matches/i').isVisible().catch(() => false);
    return !noResults;
  }

  async getSearchResultsCount() {
    const results = await this.page.locator('[class*="search-result"]').count();
    return results;
  }

  async clearSearch() {
    await this.searchBar.fill('');
  }

  // Theme Verification
  async isDarkModeActive() {
    const html = this.page.locator('html');
    const classes = await html.getAttribute('class');
    return classes ? classes.includes('dark') : false;
  }

  // Notification Badge
  async getNotificationCount() {
    try {
      const badge = await this.notificationBell.locator('[class*="badge"]').textContent();
      return parseInt(badge);
    } catch {
      return 0;
    }
  }

  async hasUnreadNotifications() {
    const indicator = await this.notificationBell.locator('[class*="dot"], [class*="indicator"]').isVisible().catch(() => false);
    return indicator;
  }
}

module.exports = { DashboardPage };
