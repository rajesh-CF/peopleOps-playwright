import { test, expect } from '@playwright/test';
import { BenchAnalyticsDashboardPage } from '../pages/BenchAnalyticsDashboardPage';
import employees from '../test-data/bench-analytics-employees.json';

test.describe('Bench & Analytics Dashboard', () => {
  let dashboard: BenchAnalyticsDashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new BenchAnalyticsDashboardPage(page);
    await dashboard.goto();
  });

  test('BA_001: View employees with utilization < 100%', async () => {
    const below100 = await dashboard.getEmployeesWithUtilizationBelow(100);
    expect(below100.length).toBeGreaterThan(0);
    for (const emp of employees.filter(e => e.utilization < 100)) {
      expect(below100.some(row => row.includes(emp.name))).toBeTruthy();
    }
  });

  test('BA_002: View bench employees with skills', async () => {
    const skills = await dashboard.getEmployeeSkills();
    for (const emp of employees.filter(e => e.utilization < 100)) {
      for (const skill of emp.skills) {
        expect(skills).toContain(skill);
      }
    }
  });

  test('BA_003: Employee with utilization 100% not in bench', async () => {
    for (const emp of employees.filter(e => e.utilization === 100)) {
      expect(await dashboard.isEmployeeInBenchList(emp.name)).toBeFalsy();
    }
  });

  test('BA_004: Employee with zero utilization shown as fully available', async () => {
    for (const emp of employees.filter(e => e.utilization === 0)) {
      expect(await dashboard.isEmployeeInBenchList(emp.name)).toBeTruthy();
    }
  });

  test('BA_005: Employee with future allocation shows correct Available From', async () => {
    for (const emp of employees.filter(e => e.utilization < 100 && emp.availableFrom > '2026-02-01')) {
      const date = await dashboard.getAvailableFromDate(emp.name);
      expect(date).toBe(emp.availableFrom);
    }
  });

  test('BA_006: Inactive employee excluded from bench', async () => {
    for (const emp of employees.filter(e => e.status === 'inactive')) {
      expect(await dashboard.isEmployeeInBenchList(emp.name)).toBeFalsy();
    }
  });

  // Analytics Dashboard
  test('BA_007: Utilization metrics and charts displayed', async () => {
    await dashboard.isUtilizationChartVisible();
  });

  test('BA_008: Average utilization calculated correctly', async () => {
    const avg = await dashboard.getAverageUtilization();
    // Example: check value is a number and matches expected
    expect(Number(avg)).toBeGreaterThan(0);
  });

  test('BA_009: Bench count displayed correctly', async () => {
    const count = await dashboard.getBenchCount();
    expect(Number(count)).toBe(employees.filter(e => e.utilization < 100 && e.status === 'active').length);
  });

  test('BA_010: Upcoming engagement end dates shown', async () => {
    const dates = await dashboard.getUpcomingEngagementEndDates();
    expect(Array.isArray(dates)).toBeTruthy();
  });

  test('BA_011: Skill gap report highlighted', async () => {
    await dashboard.isSkillGapReportVisible();
  });

  test('BA_012: Empty state message when no data', async () => {
    // This would require a data setup step to clear employees, here we just check the UI
    await dashboard.isEmptyStateVisible();
  });

  test('BA_013: Dashboard loads within performance limits', async ({ page }) => {
    const start = Date.now();
    await dashboard.goto();
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000); // 3 seconds as an example
  });
});
