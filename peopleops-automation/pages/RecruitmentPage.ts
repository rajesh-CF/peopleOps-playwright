import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecruitmentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToRecruitment() {
    // Example navigation, update selector as needed
    await this.page.goto('/recruitment');
    await expect(this.page).toHaveURL(/.*recruitment.*/);
  }

  async activateEngagement(position: string) {
    // Example: Find position row and activate engagement
    await this.page.getByRole('row', { name: position }).getByRole('button', { name: 'Activate Engagement' }).click();
    await expect(this.page.getByText('Engagement Active')).toBeVisible();
  }

  async getRequisitionDetails(position: string) {
    // Example: Return requisition details for a position
    const row = this.page.getByRole('row', { name: position });
    const status = await row.getByTestId('requisition-status').textContent();
    return {
      position,
      status: status?.trim() || '',
    };
  }
}
