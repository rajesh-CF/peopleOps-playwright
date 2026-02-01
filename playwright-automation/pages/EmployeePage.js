const { BasePage } = require('./BasePage');

/**
 * Employee Page Object Model
 * Handles employee creation, update, and management operations
 */
class EmployeePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Initialize form field locators
    this.employeeCodeInput = page.locator('input[name="employeeCode"], input[id="employeeCode"]');
    this.firstNameInput = page.locator('input[name="firstName"], input[id="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"], input[id="lastName"]');
    this.emailInput = page.locator('input[name="email"], input[id="email"]');
    this.hireDateInput = page.locator('input[name="hireDate"], input[id="hireDate"], input[type="date"]:has-text("Hire")');
    this.exitDateInput = page.locator('input[name="exitDate"], input[id="exitDate"]');
    this.statusDropdown = page.locator('select[name="status"], select[id="status"]');
    this.internalDesignationInput = page.locator('input[name="internalDesignation"], input[id="internalDesignation"]');
    this.billingDesignationInput = page.locator('input[name="billingDesignation"], input[id="billingDesignation"]');
    this.effectiveDateInput = page.locator('input[name="effectiveDate"], input[id="effectiveDate"]');
    
    // Initialize action buttons
    this.saveButton = page.locator('button:has-text("Save"), button[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.addEmployeeButton = page.locator('button:has-text("Add Employee"), button:has-text("Create Employee")');
    
    // Initialize messages
    this.successMessage = page.locator('.success, .alert-success, [role="alert"]:has-text("success")');
    this.errorMessage = page.locator('.error, .alert-error, .alert-danger, [role="alert"]:has-text("error")');
    this.validationError = page.locator('.validation-error, .field-error, .invalid-feedback');
    this.warningMessage = page.locator('.warning, .alert-warning');
    
    // Initialize table elements
    this.searchInput = page.locator('input[placeholder*="Search"], input[type="search"]');
    this.employeeTable = page.locator('table, .employee-list');
  }

  /**
   * Navigate to employee management page
   */
  async navigateToEmployeePage() {
    await this.navigate('/employees');
    await this.waitForPageLoad();
  }

  /**
   * Click Add Employee button
   */
  async clickAddEmployee() {
    await this.clickElement(this.addEmployeeButton);
  }

  /**
   * Fill employee code
   */
  async fillEmployeeCode(code) {
    await this.fillInput(this.employeeCodeInput, code);
  }

  /**
   * Fill first name
   */
  async fillFirstName(firstName) {
    await this.fillInput(this.firstNameInput, firstName);
  }

  /**
   * Fill last name
   */
  async fillLastName(lastName) {
    await this.fillInput(this.lastNameInput, lastName);
  }

  /**
   * Fill email
   */
  async fillEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Fill hire date
   */
  async fillHireDate(date) {
    await this.fillInput(this.hireDateInput, date);
  }

  /**
   * Fill exit date
   */
  async fillExitDate(date) {
    await this.fillInput(this.exitDateInput, date);
  }

  /**
   * Select employee status
   */
  async selectStatus(status) {
    await this.selectDropdownByValue(this.statusDropdown, status);
  }

  /**
   * Fill internal designation
   */
  async fillInternalDesignation(designation) {
    await this.fillInput(this.internalDesignationInput, designation);
  }

  /**
   * Fill billing designation
   */
  async fillBillingDesignation(designation) {
    await this.fillInput(this.billingDesignationInput, designation);
  }

  /**
   * Fill effective date for designation
   */
  async fillEffectiveDate(date) {
    await this.fillInput(this.effectiveDateInput, date);
  }

  /**
   * Click Save button
   */
  async clickSave() {
    await this.clickElement(this.saveButton);
  }

  /**
   * Click Cancel button
   */
  async clickCancel() {
    await this.clickElement(this.cancelButton);
  }

  /**
   * Create employee with mandatory fields only
   */
  async createEmployeeWithMandatoryFields(code, firstName, lastName, email, hireDate) {
    await this.fillEmployeeCode(code);
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillHireDate(hireDate);
    await this.clickSave();
  }

  /**
   * Create employee with all fields
   */
  async createEmployeeWithAllFields(employeeData) {
    await this.fillEmployeeCode(employeeData.code);
    await this.fillFirstName(employeeData.firstName);
    await this.fillLastName(employeeData.lastName);
    await this.fillEmail(employeeData.email);
    await this.fillHireDate(employeeData.hireDate);
    
    if (employeeData.exitDate) {
      await this.fillExitDate(employeeData.exitDate);
    }
    
    if (employeeData.status) {
      await this.selectStatus(employeeData.status);
    }
    
    if (employeeData.internalDesignation) {
      await this.fillInternalDesignation(employeeData.internalDesignation);
    }
    
    if (employeeData.billingDesignation) {
      await this.fillBillingDesignation(employeeData.billingDesignation);
    }
    
    await this.clickSave();
  }

  /**
   * Update employee status
   */
  async updateEmployeeStatus(employeeCode, newStatus) {
    await this.searchEmployee(employeeCode);
    await this.clickEditEmployeeByCode(employeeCode);
    await this.selectStatus(newStatus);
    await this.clickSave();
  }

  /**
   * Search for employee
   */
  async searchEmployee(searchTerm) {
    await this.fillInput(this.searchInput, searchTerm);
  }

  /**
   * Click edit button for specific employee
   */
  async clickEditEmployeeByCode(code) {
    const editButton = this.page.locator(`tr:has-text("${code}") button:has-text("Edit"), tr:has-text("${code}") [aria-label="Edit"]`);
    await this.clickElement(editButton);
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageDisplayed() {
    return await this.isElementVisible(this.successMessage);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed() {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Check if validation error is displayed
   */
  async isValidationErrorDisplayed() {
    return await this.isElementVisible(this.validationError);
  }

  /**
   * Check if warning message is displayed
   */
  async isWarningMessageDisplayed() {
    return await this.isElementVisible(this.warningMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage() {
    return await this.getTextContent(this.successMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.getTextContent(this.errorMessage);
  }

  /**
   * Get validation error message
   */
  async getValidationError() {
    return await this.getTextContent(this.validationError);
  }

  /**
   * Get warning message
   */
  async getWarningMessage() {
    return await this.getTextContent(this.warningMessage);
  }

  /**
   * Check if employee exists in table
   */
  async isEmployeeInTable(employeeCode) {
    const employeeRow = this.page.locator(`tr:has-text("${employeeCode}")`);
    return await employeeRow.isVisible();
  }

  /**
   * Check if Save button is enabled
   */
  async isSaveButtonEnabled() {
    return await this.isElementEnabled(this.saveButton);
  }

  /**
   * Mark employee as exited
   */
  async markEmployeeAsExited(employeeCode, exitDate) {
    await this.searchEmployee(employeeCode);
    await this.clickEditEmployeeByCode(employeeCode);
    await this.fillExitDate(exitDate);
    await this.selectStatus('Exited');
    await this.clickSave();
  }
}

module.exports = { EmployeePage };
