import { test, expect } from '@playwright/test';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { recruitmentTestData } from '../test-data/recruitmentTestData';

// RE_001: Auto-create requisition when position unfilled

test.describe('Recruitment Engine', () => {
  test('RE_001: Auto-create requisition when position unfilled', async ({ page }) => {
    const recruitmentPage = new RecruitmentPage(page);
    // Precondition: Position exists without employee assigned and engagement is active
    await recruitmentPage.navigateToRecruitment();
    await recruitmentPage.activateEngagement(recruitmentTestData.position);
    // Assertion: Requisition created automatically with correct details
    await expect(recruitmentPage.getRequisitionDetails(recruitmentTestData.position)).resolves.toMatchObject({
      position: recruitmentTestData.position,
      status: 'Open',
    });
  });
});
