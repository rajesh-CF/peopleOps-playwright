import { Page, expect } from '@playwright/test';

export class PortfolioCompanyPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/portfolio-company');
    await expect(this.page).toHaveURL(/portfolio-company/);
  }

  async createPortfolioCompany({ name, code, startDate, endDate }: { name?: string; code?: string; startDate?: string; endDate?: string }) {
    if (name !== undefined) await this.page.getByTestId('portco-name').fill(name);
    if (code !== undefined) await this.page.getByTestId('portco-code').fill(code);
    if (startDate !== undefined) await this.page.getByTestId('portco-start-date').fill(startDate);
    if (endDate !== undefined) await this.page.getByTestId('portco-end-date').fill(endDate);
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async editPortfolioCompany(name: string, updates: { code?: string; startDate?: string; endDate?: string }) {
    await this.page.getByText(name).click();
    if (updates.code !== undefined) await this.page.getByTestId('portco-code').fill(updates.code);
    if (updates.startDate !== undefined) await this.page.getByTestId('portco-start-date').fill(updates.startDate);
    if (updates.endDate !== undefined) await this.page.getByTestId('portco-end-date').fill(updates.endDate);
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async inactivatePortfolioCompany(name: string) {
    await this.page.getByText(name).click();
    await this.page.getByRole('button', { name: /inactivate|inactive/i }).click();
  }

  async getErrorMessage() {
    return this.page.getByTestId('error-message').innerText();
  }

  async isPortfolioCompanyCreated(name: string) {
    return this.page.getByText(name).isVisible();
  }

  async createProject({ portcoName, projectName, code, startDate, endDate }: { portcoName: string; projectName: string; code?: string; startDate?: string; endDate?: string }) {
    await this.page.getByText(portcoName).click();
    await this.page.getByRole('button', { name: /add project/i }).click();
    await this.page.getByTestId('project-name').fill(projectName);
    if (code !== undefined) await this.page.getByTestId('project-code').fill(code);
    if (startDate !== undefined) await this.page.getByTestId('project-start-date').fill(startDate);
    if (endDate !== undefined) await this.page.getByTestId('project-end-date').fill(endDate);
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async closeProject(projectName: string) {
    await this.page.getByText(projectName).click();
    await this.page.getByRole('button', { name: /close project/i }).click();
  }

  async createEngagement({ projectName, engagementName, code, startDate, endDate, budget }: { projectName: string; engagementName: string; code?: string; startDate?: string; endDate?: string; budget?: string }) {
    await this.page.getByText(projectName).click();
    await this.page.getByRole('button', { name: /add engagement/i }).click();
    await this.page.getByTestId('engagement-name').fill(engagementName);
    if (code !== undefined) await this.page.getByTestId('engagement-code').fill(code);
    if (startDate !== undefined) await this.page.getByTestId('engagement-start-date').fill(startDate);
    if (endDate !== undefined) await this.page.getByTestId('engagement-end-date').fill(endDate);
    if (budget !== undefined) await this.page.getByTestId('engagement-budget').fill(budget);
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  async definePosition({ engagementName, positionName, proficiency, resourceCount }: { engagementName: string; positionName: string; proficiency?: string; resourceCount?: string }) {
    await this.page.getByText(engagementName).click();
    await this.page.getByRole('button', { name: /add position/i }).click();
    await this.page.getByTestId('position-name').fill(positionName);
    if (proficiency !== undefined) await this.page.getByTestId('position-proficiency').fill(proficiency);
    if (resourceCount !== undefined) await this.page.getByTestId('position-resource-count').fill(resourceCount);
    await this.page.getByRole('button', { name: /save/i }).click();
  }

  // Add more methods as needed for allocation, drag and drop, etc.
}
