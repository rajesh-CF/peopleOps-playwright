import { test, expect } from '@playwright/test';
import { EmployeePage } from '../pages/EmployeePage';

// You would also import SkillPage, DesignationPage, etc. for skill/designation scenarios

test.describe('Staffing Engine', () => {
  let employeePage: EmployeePage;

  test.beforeEach(async ({ page }) => {
    employeePage = new EmployeePage(page);
    await employeePage.goto();
  });

  test('ST_001: Create employee with mandatory fields', async () => {
    await employeePage.createEmployee({ firstName: 'John', code: 'E001', hireDate: '2026-02-01' });
    await employeePage.assertSuccess('Employee created successfully');
  });

  test('ST_002: Create employee with optional fields', async () => {
    await employeePage.createEmployee({ firstName: 'Jane', code: 'E002', hireDate: '2026-02-01', exitDate: '2027-02-01' });
    await employeePage.assertSuccess('Employee record saved with all details');
  });

  test('ST_003: Prevent duplicate Employee Code', async () => {
    await employeePage.createEmployee({ firstName: 'John', code: 'E003', hireDate: '2026-02-01' });
    await employeePage.createEmployee({ firstName: 'John', code: 'E003', hireDate: '2026-02-01' });
    await employeePage.assertError('Error message displayed');
  });

  test('ST_004: Missing mandatory employee field', async () => {
    await employeePage.createEmployee({ code: 'E004', hireDate: '2026-02-01' });
    await employeePage.assertError('Validation error displayed');
  });

  test('ST_005: Exit Date earlier than Hire Date', async () => {
    await employeePage.createEmployee({ firstName: 'John', code: 'E005', hireDate: '2026-02-01', exitDate: '2025-01-01' });
    await employeePage.assertError('Save blocked with error');
  });

  // ...continue for all other scenarios, using the same pattern
});
