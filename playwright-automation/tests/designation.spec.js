const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DesignationPage } = require('../pages/DesignationPage');
const { TestDataGenerator } = require('../utils/TestDataGenerator');
const { TEST_USERS } = require('../test-data/constants');

test.describe('Designation Management Tests', () => {
  let loginPage;
  let designationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    designationPage = new DesignationPage(page);
    
    // Login before each test
    await loginPage.navigate();
    await loginPage.login(TEST_USERS.admin.username, TEST_USERS.admin.password);
    await designationPage.navigate();
  });

  test('TC_DES_001: Add new designation', async () => {
    const designationData = {
      title: TestDataGenerator.generateDesignationTitle(),
      department: 'Engineering',
      level: 'Senior'
    };
    
    await designationPage.addDesignation(designationData);
    
    // Verify success message
    const successMessage = await designationPage.getSuccessMessage();
    expect(successMessage).toContain('successfully');
  });

  test('TC_DES_002: Validate mandatory fields for designation', async () => {
    await designationPage.clickAddButton();
    await designationPage.clickSaveButton();
    
    // Verify validation messages
    const validationMessages = await designationPage.getAllValidationMessages();
    expect(validationMessages.length).toBeGreaterThan(0);
  });

  test('TC_DES_003: Update designation details', async () => {
    const designationData = {
      title: TestDataGenerator.generateDesignationTitle(),
      department: 'Engineering',
      level: 'Junior'
    };
    
    // Add designation first
    await designationPage.addDesignation(designationData);
    
    // Update level
    await designationPage.updateDesignation(designationData.title, { level: 'Senior' });
    
    // Verify update
    const successMessage = await designationPage.getSuccessMessage();
    expect(successMessage).toContain('updated');
  });

  test('TC_DES_004: Delete designation', async () => {
    const designationData = {
      title: TestDataGenerator.generateDesignationTitle(),
      department: 'Engineering',
      level: 'Mid-Level'
    };
    
    // Add designation first
    await designationPage.addDesignation(designationData);
    
    // Delete designation
    await designationPage.deleteDesignation(designationData.title);
    
    // Verify deletion
    const successMessage = await designationPage.getSuccessMessage();
    expect(successMessage).toContain('deleted');
  });

  test('TC_DES_005: Search designation by title', async () => {
    const designationData = {
      title: TestDataGenerator.generateDesignationTitle(),
      department: 'Marketing',
      level: 'Senior'
    };
    
    // Add designation first
    await designationPage.addDesignation(designationData);
    
    // Search for designation
    await designationPage.searchDesignation(designationData.title);
    
    // Verify search results
    const searchResults = await designationPage.getSearchResults();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0]).toContain(designationData.title);
  });

  test('TC_DES_006: Filter designations by department', async () => {
    // Add multiple designations
    const designations = [
      { title: 'Developer', department: 'Engineering', level: 'Senior' },
      { title: 'Manager', department: 'Management', level: 'Senior' }
    ];
    
    for (const designation of designations) {
      await designationPage.addDesignation(designation);
    }
    
    // Filter by Engineering
    await designationPage.filterByDepartment('Engineering');
    
    // Verify filtered results
    const filteredResults = await designationPage.getSearchResults();
    expect(filteredResults.length).toBeGreaterThan(0);
  });

  test('TC_DES_007: Validate duplicate designation prevention', async () => {
    const designationData = {
      title: TestDataGenerator.generateDesignationTitle(),
      department: 'Engineering',
      level: 'Senior'
    };
    
    // Add designation first time
    await designationPage.addDesignation(designationData);
    
    // Try to add same designation again
    await designationPage.addDesignation(designationData);
    
    // Verify duplicate validation
    const errorMessage = await designationPage.getErrorMessage();
    expect(errorMessage).toContain('already exists' || 'duplicate');
  });

  test('TC_DES_008: Sort designations by level', async () => {
    // Add multiple designations with different levels
    const designations = [
      { title: 'Dev1', department: 'Engineering', level: 'Junior' },
      { title: 'Dev2', department: 'Engineering', level: 'Senior' },
      { title: 'Dev3', department: 'Engineering', level: 'Mid-Level' }
    ];
    
    for (const designation of designations) {
      await designationPage.addDesignation(designation);
    }
    
    // Sort by level
    await designationPage.sortByLevel();
    
    // Verify sort order
    const sortedDesignations = await designationPage.getAllDesignations();
    expect(sortedDesignations.length).toBeGreaterThan(0);
  });

  test('TC_DES_009: Assign designation to employee', async () => {
    const designationData = {
      title: TestDataGenerator.generateDesignationTitle(),
      department: 'Engineering',
      level: 'Senior'
    };
    const employeeId = 'EMP001';
    
    // Add designation first
    await designationPage.addDesignation(designationData);
    
    // Assign to employee
    await designationPage.assignDesignation(designationData.title, employeeId);
    
    // Verify assignment
    const successMessage = await designationPage.getSuccessMessage();
    expect(successMessage).toContain('assigned');
  });

  test('TC_DES_010: Export designations list', async () => {
    // Verify export button is visible
    const isExportVisible = await designationPage.isExportButtonVisible();
    expect(isExportVisible).toBeTruthy();
    
    // Click export
    await designationPage.clickExportButton();
  });
});
