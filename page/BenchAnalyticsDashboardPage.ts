import { Page, Locator, expect } from '@playwright/test';

export class BenchAnalyticsDashboardPage {
  readonly page: Page;
  readonly utilizationRows: Locator;
  readonly employeeSkillCells: Locator;
  readonly benchList: Locator;
  readonly availableFromCells: Locator;
  readonly statusCells: Locator;
  readonly utilizationChart: Locator;
  readonly averageUtilization: Locator;
  readonly benchCount: Locator;
  readonly engagementEndDates: Locator;
  readonly skillGapReport: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.utilizationRows = page.locator('[data-testid="utilization-row"]');
    this.employeeSkillCells = page.locator('[data-testid="employee-skill"]');
    this.benchList = page.locator('[data-testid="bench-list"]');
    this.availableFromCells = page.locator('[data-testid="available-from"]');
    this.statusCells = page.locator('[data-testid="employee-status"]');
    this.utilizationChart = page.locator('[data-testid="utilization-chart"]');
    this.averageUtilization = page.locator('[data-testid="average-utilization"]');
    this.benchCount = page.locator('[data-testid="bench-count"]');
    this.engagementEndDates = page.locator('[data-testid="engagement-end-date"]');
    this.skillGapReport = page.locator('[data-testid="skill-gap-report"]');
    this.emptyState = page.locator('[data-testid="empty-state"]');
  }

  async goto() {
    await this.page.goto('/bench-analytics');
    await expect(this.page).toHaveURL(/bench-analytics/);
  }

  async getEmployeesWithUtilizationBelow(percent: number) {
    const rows = this.utilizationRows;
    const count = await rows.count();
    const employees = [];
    for (let i = 0; i < count; i++) {
      const utilization = await rows.nth(i).locator('[data-testid="utilization"]').innerText();
      if (parseInt(utilization) < percent) {
        employees.push(await rows.nth(i).innerText());
      }
    }
    return employees;
  }

  async getEmployeeSkills() {
    const count = await this.employeeSkillCells.count();
    const skills = [];
    for (let i = 0; i < count; i++) {
      skills.push(await this.employeeSkillCells.nth(i).innerText());
    }
    return skills;
  }

  async isEmployeeInBenchList(employeeName: string) {
    return await this.benchList.locator(`text=${employeeName}`).count() > 0;
  }

  async getAvailableFromDate(employeeName: string) {
    const cell = this.availableFromCells.locator(`text=${employeeName}`);
    if (await cell.count() > 0) {
      return await cell.first().innerText();
    }
    return null;
  }

  async isEmployeeInactive(employeeName: string) {
    const cell = this.statusCells.locator(`text=${employeeName}`);
    if (await cell.count() > 0) {
      return (await cell.first().innerText()).toLowerCase() === 'inactive';
    }
    return false;
  }

  async isUtilizationChartVisible() {
    await expect(this.utilizationChart).toBeVisible();
  }

  async getAverageUtilization() {
    return await this.averageUtilization.innerText();
  }

  async getBenchCount() {
    return await this.benchCount.innerText();
  }

  async getUpcomingEngagementEndDates() {
    const count = await this.engagementEndDates.count();
    const dates = [];
    for (let i = 0; i < count; i++) {
      dates.push(await this.engagementEndDates.nth(i).innerText());
    }
    return dates;
  }

  async isSkillGapReportVisible() {
    await expect(this.skillGapReport).toBeVisible();
  }

  async isEmptyStateVisible() {
    await expect(this.emptyState).toBeVisible();
  }
}
