import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for Bench & Analytics Dashboard - Bench View
 * Handles interactions with bench employee list and filtering
 */
export class BenchDashboardPage extends BasePage {
  // Locators
  private readonly benchDashboardLink: Locator;
  private readonly benchTableRows: Locator;
  private readonly employeeNameColumn: string;
  private readonly utilizationColumn: string;
  private readonly skillsColumn: string;
  private readonly availableFromColumn: string;
  private readonly statusColumn: string;
  private readonly searchInput: Locator;
  private readonly filterButton: Locator;
  private readonly refreshButton: Locator;
  private readonly emptyStateMessage: Locator;
  private readonly loadingSpinner: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators using smart selectors
    this.benchDashboardLink = page.getByRole('link', { name: /bench.*dashboard/i });
    this.benchTableRows = page.locator('table tbody tr');
    this.employeeNameColumn = '[data-testid="employee-name"], td:nth-child(1)';
    this.utilizationColumn = '[data-testid="utilization"], td:nth-child(2)';
    this.skillsColumn = '[data-testid="skills"], td:nth-child(3)';
    this.availableFromColumn = '[data-testid="available-from"], td:nth-child(4)';
    this.statusColumn = '[data-testid="status"], td:nth-child(5)';
    this.searchInput = page.getByPlaceholder(/search/i);
    this.filterButton = page.getByRole('button', { name: /filter/i });
    this.refreshButton = page.getByRole('button', { name: /refresh/i });
    this.emptyStateMessage = page.locator('[data-testid="empty-state"], .empty-message');
    this.loadingSpinner = page.locator('[data-testid="loading"], .spinner, .loading');
  }

  /**
   * Navigate to Bench Dashboard
   */
  async navigateToBenchDashboard(): Promise<void> {
    await this.navigate('/bench-dashboard');
    await this.waitForDashboardLoad();
  }

  /**
   * Wait for dashboard to load completely
   */
  async waitForDashboardLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    // Wait for loading spinner to disappear
    if (await this.loadingSpinner.isVisible().catch(() => false)) {
      await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 });
    }
  }

  /**
   * Get all bench employees displayed
   */
  async getAllBenchEmployees(): Promise<Array<{
    name: string;
    utilization: string;
    skills: string;
    availableFrom: string;
    status: string;
  }>> {
    const rows = await this.benchTableRows.all();
    const employees = [];

    for (const row of rows) {
      const name = await row.locator(this.employeeNameColumn).textContent() || '';
      const utilization = await row.locator(this.utilizationColumn).textContent() || '';
      const skills = await row.locator(this.skillsColumn).textContent() || '';
      const availableFrom = await row.locator(this.availableFromColumn).textContent() || '';
      const status = await row.locator(this.statusColumn).textContent() || '';

      employees.push({
        name: name.trim(),
        utilization: utilization.trim(),
        skills: skills.trim(),
        availableFrom: availableFrom.trim(),
        status: status.trim()
      });
    }

    return employees;
  }

  /**
   * Get bench employee count
   */
  async getBenchEmployeeCount(): Promise<number> {
    return await this.benchTableRows.count();
  }

  /**
   * Search for employee by name
   */
  async searchEmployee(employeeName: string): Promise<void> {
    await this.searchInput.fill(employeeName);
    await this.page.keyboard.press('Enter');
    await this.waitForDashboardLoad();
  }

  /**
   * Check if employee is displayed in bench list
   */
  async isEmployeeDisplayed(employeeName: string): Promise<boolean> {
    const employeeRow = this.page.locator(`tr:has-text("${employeeName}")`);
    return await employeeRow.isVisible().catch(() => false);
  }

  /**
   * Get employee utilization percentage
   */
  async getEmployeeUtilization(employeeName: string): Promise<number> {
    const employeeRow = this.page.locator(`tr:has-text("${employeeName}")`);
    const utilizationText = await employeeRow.locator(this.utilizationColumn).textContent() || '0';
    const utilization = utilizationText.replace(/[^0-9.]/g, '');
    return parseFloat(utilization);
  }

  /**
   * Get employee skills
   */
  async getEmployeeSkills(employeeName: string): Promise<string[]> {
    const employeeRow = this.page.locator(`tr:has-text("${employeeName}")`);
    const skillsText = await employeeRow.locator(this.skillsColumn).textContent() || '';
    return skillsText.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  }

  /**
   * Get employee available from date
   */
  async getEmployeeAvailableFrom(employeeName: string): Promise<string> {
    const employeeRow = this.page.locator(`tr:has-text("${employeeName}")`);
    return await employeeRow.locator(this.availableFromColumn).textContent() || '';
  }

  /**
   * Get employee status
   */
  async getEmployeeStatus(employeeName: string): Promise<string> {
    const employeeRow = this.page.locator(`tr:has-text("${employeeName}")`);
    return await employeeRow.locator(this.statusColumn).textContent() || '';
  }

  /**
   * Filter bench employees by utilization range
   */
  async filterByUtilization(minUtilization: number, maxUtilization: number): Promise<void> {
    await this.filterButton.click();
    await this.page.locator('[data-testid="min-utilization"]').fill(minUtilization.toString());
    await this.page.locator('[data-testid="max-utilization"]').fill(maxUtilization.toString());
    await this.page.getByRole('button', { name: /apply/i }).click();
    await this.waitForDashboardLoad();
  }

  /**
   * Filter bench employees by skills
   */
  async filterBySkills(skills: string[]): Promise<void> {
    await this.filterButton.click();
    for (const skill of skills) {
      await this.page.locator('[data-testid="skill-filter"]').fill(skill);
      await this.page.keyboard.press('Enter');
    }
    await this.page.getByRole('button', { name: /apply/i }).click();
    await this.waitForDashboardLoad();
  }

  /**
   * Verify all displayed employees have utilization less than specified value
   */
  async verifyAllEmployeesHaveUtilizationLessThan(maxUtilization: number): Promise<boolean> {
    const employees = await this.getAllBenchEmployees();
    for (const employee of employees) {
      const utilization = parseFloat(employee.utilization.replace(/[^0-9.]/g, ''));
      if (utilization >= maxUtilization) {
        return false;
      }
    }
    return true;
  }

  /**
   * Verify employee skills are displayed correctly
   */
  async verifyEmployeeSkillsDisplayed(employeeName: string): Promise<boolean> {
    const skills = await this.getEmployeeSkills(employeeName);
    return skills.length > 0 && skills.every(skill => skill.length > 0);
  }

  /**
   * Check if empty state message is displayed
   */
  async isEmptyStateDisplayed(): Promise<boolean> {
    return await this.emptyStateMessage.isVisible().catch(() => false);
  }

  /**
   * Get empty state message text
   */
  async getEmptyStateMessage(): Promise<string> {
    return await this.emptyStateMessage.textContent() || '';
  }

  /**
   * Refresh bench dashboard
   */
  async refreshDashboard(): Promise<void> {
    await this.refreshButton.click();
    await this.waitForDashboardLoad();
  }

  /**
   * Verify inactive employees are excluded
   */
  async verifyNoInactiveEmployees(): Promise<boolean> {
    const employees = await this.getAllBenchEmployees();
    for (const employee of employees) {
      if (employee.status.toLowerCase().includes('inactive')) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get employees with zero utilization
   */
  async getEmployeesWithZeroUtilization(): Promise<string[]> {
    const employees = await this.getAllBenchEmployees();
    return employees
      .filter(emp => parseFloat(emp.utilization.replace(/[^0-9.]/g, '')) === 0)
      .map(emp => emp.name);
  }

  /**
   * Get employees with future availability
   */
  async getEmployeesWithFutureAvailability(): Promise<Array<{ name: string; availableFrom: string }>> {
    const employees = await this.getAllBenchEmployees();
    return employees
      .filter(emp => emp.availableFrom && emp.availableFrom.length > 0)
      .map(emp => ({ name: emp.name, availableFrom: emp.availableFrom }));
  }
}
