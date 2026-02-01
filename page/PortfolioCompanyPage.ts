import { Page, expect, Locator } from '@playwright/test';

export class PortfolioCompanyPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly codeInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly saveButton: Locator;
  readonly errorMessage: Locator;
  // Add more selectors as needed

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByTestId('portco-name');
    this.codeInput = page.getByTestId('portco-code');
    this.startDateInput = page.getByTestId('portco-start-date');
    this.endDateInput = page.getByTestId('portco-end-date');
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/portfolio-company');
    await expect(this.page).toHaveURL(/portfolio-company/);
  }

  async fillMandatoryFields({ name, code, startDate, endDate }: { name: string; code: string; startDate: string; endDate: string }) {
    await this.nameInput.fill(name);
    await this.codeInput.fill(code);
    await this.startDateInput.fill(startDate);
    await this.endDateInput.fill(endDate);
  }

  async save() {
    await this.saveButton.click();
  }

  async assertSuccessMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async assertErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async isPortfolioCompanyCreated(name: string) {
    return this.page.getByText(name).isVisible();
  }

  // ...existing and additional methods for project, engagement, allocation, etc.
}
}
