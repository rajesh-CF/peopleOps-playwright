const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmployeePage } = require('../pages/EmployeePage');
const { TestDataGenerator } = require('../utils/TestDataGenerator');
const { TEST_USERS } = require('../test-data/constants');

test.describe('Employee Management Tests', () => {
  let loginPage;
  let employeePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    employeePage = new EmployeePage(page);
    
    // Login before each test
    await loginPage.navigate();
    await loginPage.login(TEST_USERS.admin.username, TEST_USERS.admin.password);
    await employeePage.navigate();
  });

  test('TC_EMP_001: Create employee with mandatory fields only', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    
    await employeePage.createEmployeeWithMandatoryFields(employeeData);
    
    // Verify success message
    const successMessage = await employeePage.getSuccessMessage();
    expect(successMessage).toContain('successfully');
  });

  test('TC_EMP_002: Create employee with all fields', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    
    await employeePage.createEmployeeWithAllFields(employeeData);
    
    // Verify success message
    const successMessage = await employeePage.getSuccessMessage();
    expect(successMessage).toContain('successfully');
  });

  test('TC_EMP_003: Validate mandatory field validations', async () => {
    await employeePage.clickAddButton();
    await employeePage.clickSaveButton();
    
    // Verify validation messages
    const validationMessages = await employeePage.getAllValidationMessages();
    expect(validationMessages.length).toBeGreaterThan(0);
  });

  test('TC_EMP_004: Validate employee code format', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    employeeData.employeeCode = 'INVALID';
    
    await employeePage.clickAddButton();
    await employeePage.fillEmployeeCode(employeeData.employeeCode);
    await employeePage.clickSaveButton();
    
    // Verify format validation
    const validationMessage = await employeePage.getEmployeeCodeValidation();
    expect(validationMessage).toBeTruthy();
  });

  test('TC_EMP_005: Validate email format', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    employeeData.email = 'invalid-email';
    
    await employeePage.clickAddButton();
    await employeePage.fillEmployeeForm(employeeData);
    await employeePage.clickSaveButton();
    
    // Verify email validation
    const validationMessage = await employeePage.getEmailValidation();
    expect(validationMessage).toBeTruthy();
  });

  test('TC_EMP_006: Search employee by name', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    
    // Create employee first
    await employeePage.createEmployeeWithMandatoryFields(employeeData);
    
    // Search for the employee
    await employeePage.searchEmployee(employeeData.firstName);
    
    // Verify search results
    const searchResults = await employeePage.getSearchResults();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0]).toContain(employeeData.firstName);
  });

  test('TC_EMP_007: Update employee status', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    
    // Create employee first
    await employeePage.createEmployeeWithMandatoryFields(employeeData);
    
    // Update status
    await employeePage.updateEmployeeStatus(employeeData.employeeCode, 'Inactive');
    
    // Verify status update
    const successMessage = await employeePage.getSuccessMessage();
    expect(successMessage).toContain('updated');
  });

  test('TC_EMP_008: Delete employee', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    
    // Create employee first
    await employeePage.createEmployeeWithMandatoryFields(employeeData);
    
    // Delete employee
    await employeePage.deleteEmployee(employeeData.employeeCode);
    
    // Verify deletion
    const successMessage = await employeePage.getSuccessMessage();
    expect(successMessage).toContain('deleted');
  });

  test('TC_EMP_009: Validate duplicate employee code', async () => {
    const employeeData = TestDataGenerator.generateEmployeeData();
    
    // Create employee first time
    await employeePage.createEmployeeWithMandatoryFields(employeeData);
    
    // Try to create with same code
    await employeePage.createEmployeeWithMandatoryFields(employeeData);
    
    // Verify duplicate validation
    const errorMessage = await employeePage.getErrorMessage();
    expect(errorMessage).toContain('already exists' || 'duplicate');
  });

  test('TC_EMP_010: Export employee list', async () => {
    // Verify export button is visible and clickable
    const isExportVisible = await employeePage.isExportButtonVisible();
    expect(isExportVisible).toBeTruthy();
    
    // Click export and verify download starts
    await employeePage.clickExportButton();
  });
});
