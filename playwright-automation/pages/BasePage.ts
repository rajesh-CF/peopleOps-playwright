import { Page, Locator } from '@playwright/test';

/**
 * Base Page class with common functionality for all page objects
 * Provides reusable methods following DRY principles
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click element with auto-waiting
   */
  async clickElement(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
  }

  /**
   * Fill input field with auto-waiting
   */
  async fillInput(locator: string | Locator, value: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(value);
  }

  /**
   * Get text content from element
   */
  async getElementText(locator: string | Locator): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  /**
   * Select option from dropdown
   */
  async selectDropdown(locator: string | Locator, value: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: string | Locator, timeout: number = 30000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get all elements matching locator
   */
  async getAllElements(locator: string): Promise<Locator[]> {
    return await this.page.locator(locator).all();
  }

  /**
   * Get element count
   */
  async getElementCount(locator: string): Promise<number> {
    return await this.page.locator(locator).count();
  }
}
