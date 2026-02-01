/**
 * Base Page class containing common functionality for all page objects
 * Follows Single Responsibility Principle - handles only page-level operations
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator) {
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(locator) {
    return await locator.isEnabled();
  }

  /**
   * Fill input field
   */
  async fillInput(locator, value) {
    await locator.fill(value);
  }

  /**
   * Click element
   */
  async clickElement(locator) {
    await locator.click();
  }

  /**
   * Get text content of element
   */
  async getTextContent(locator) {
    return (await locator.textContent()) || '';
  }

  /**
   * Select dropdown option by value
   */
  async selectDropdownByValue(locator, value) {
    await locator.selectOption(value);
  }

  /**
   * Select dropdown option by label
   */
  async selectDropdownByLabel(locator, label) {
    await locator.selectOption({ label });
  }

  /**
   * Clear and fill input
   */
  async clearAndFill(locator, value) {
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Wait for specific URL pattern
   */
  async waitForUrlPattern(pattern) {
    await this.page.waitForURL(pattern);
  }
}

module.exports = { BasePage };
