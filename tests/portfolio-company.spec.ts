import { test, expect } from '@playwright/test';
import { PortfolioCompanyPage } from '../pages/PortfolioCompanyPage';

test.describe('Portfolio Company & Project Management', () => {
  let portcoPage: PortfolioCompanyPage;

  test.beforeEach(async ({ page }) => {
    portcoPage = new PortfolioCompanyPage(page);
    await portcoPage.goto();
  });

  test('Create Portfolio Company with mandatory fields', async () => {
    await portcoPage.createPortfolioCompany({ name: 'Acme Corp', code: 'ACME001', startDate: '2026-02-01', endDate: '2027-02-01' });
    expect(await portcoPage.isPortfolioCompanyCreated('Acme Corp')).toBeTruthy();
  });

  test('Create Portfolio Company with optional fields', async () => {
    await portcoPage.createPortfolioCompany({ name: 'Beta Corp', code: 'BETA001', startDate: '2026-03-01', endDate: '2027-03-01' });
    expect(await portcoPage.isPortfolioCompanyCreated('Beta Corp')).toBeTruthy();
  });

  test('Prevent duplicate Portfolio Company code', async () => {
    await portcoPage.createPortfolioCompany({ name: 'Dup Corp', code: 'DUP001', startDate: '2026-04-01', endDate: '2027-04-01' });
    await portcoPage.createPortfolioCompany({ name: 'Dup Corp 2', code: 'DUP001', startDate: '2026-05-01', endDate: '2027-05-01' });
    expect(await portcoPage.getErrorMessage()).toContain('already exists');
  });

  test('Missing mandatory Portfolio Company field', async () => {
    await portcoPage.createPortfolioCompany({ code: 'MISS001', startDate: '2026-06-01', endDate: '2027-06-01' });
    expect(await portcoPage.getErrorMessage()).toContain('required');
  });

  test('Contract End Date earlier than Start Date', async () => {
    await portcoPage.createPortfolioCompany({ name: 'Date Corp', code: 'DATE001', startDate: '2026-07-01', endDate: '2026-06-01' });
    expect(await portcoPage.getErrorMessage()).toContain('End Date');
  });

  test('Inactivate Portfolio Company', async () => {
    await portcoPage.createPortfolioCompany({ name: 'Inactive Corp', code: 'INACT001', startDate: '2026-08-01', endDate: '2027-08-01' });
    await portcoPage.inactivatePortfolioCompany('Inactive Corp');
    expect(await portcoPage.getErrorMessage()).not.toBe('');
  });

  test('Create Project under inactive Portfolio Company', async () => {
    await portcoPage.createPortfolioCompany({ name: 'InactiveProjCo', code: 'INPROJ001', startDate: '2026-10-01', endDate: '2027-10-01' });
    await portcoPage.inactivatePortfolioCompany('InactiveProjCo');
    await portcoPage.createProject({ portcoName: 'InactiveProjCo', projectName: 'Inactive Project' });
    expect(await portcoPage.getErrorMessage()).toContain('restricted');
  });

  test('Duplicate Project Code within same PortCo', async () => {
    await portcoPage.createPortfolioCompany({ name: 'DupProjCo', code: 'DUPPROJ001', startDate: '2026-11-01', endDate: '2027-11-01' });
    await portcoPage.createProject({ portcoName: 'DupProjCo', projectName: 'Project Y', code: 'PY001' });
    await portcoPage.createProject({ portcoName: 'DupProjCo', projectName: 'Project Y2', code: 'PY001' });
    expect(await portcoPage.getErrorMessage()).toContain('Error');
  });

  test('Same Project Code across different PortCo', async () => {
    await portcoPage.createPortfolioCompany({ name: 'PortCoA', code: 'PCA001', startDate: '2026-12-01', endDate: '2027-12-01' });
    await portcoPage.createPortfolioCompany({ name: 'PortCoB', code: 'PCB001', startDate: '2026-12-01', endDate: '2027-12-01' });
    await portcoPage.createProject({ portcoName: 'PortCoA', projectName: 'Project Z', code: 'PZ001' });
    await portcoPage.createProject({ portcoName: 'PortCoB', projectName: 'Project Z2', code: 'PZ001' });
    expect(await portcoPage.isPortfolioCompanyCreated('PortCoB')).toBeTruthy(); // Should succeed
  });

  test('Missing Project Start Date', async () => {
    await portcoPage.createPortfolioCompany({ name: 'NoStartProjCo', code: 'NSPC001', startDate: '2027-01-01', endDate: '2028-01-01' });
    await portcoPage.createProject({ portcoName: 'NoStartProjCo', projectName: 'No Start Project' });
    expect(await portcoPage.getErrorMessage()).toContain('required');
  });
});