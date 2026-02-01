const BasePage = require('./BasePage');

class DesignationPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.addButton = 'button:has-text("Add Designation")';
    this.titleInput = '#designationTitle';
    this.departmentDropdown = '#department';
    this.levelDropdown = '#level';
    this.saveButton = 'button:has-text("Save")';
    this.cancelButton = 'button:has-text("Cancel")';
    this.searchInput = 'input[placeholder*="Search"]';
    this.searchButton = 'button:has-text("Search")';
    this.deleteButton = 'button:has-text("Delete")';
    this.editButton = 'button:has-text("Edit")';
    this.exportButton = 'button:has-text("Export")';
    this.filterButton = 'button:has-text("Filter")';
    this.sortButton = 'button:has-text("Sort")';
    this.assignButton = 'button:has-text("Assign")';
    this.tableRows = 'table tbody tr';
    this.successMessage = '.success-message, .alert-success';
    this.errorMessage = '.error-message, .alert-danger';
    this.validationMessage = '.validation-message, .error';
  }

  async navigate() {
    await this.page.goto('/designations');
    await this.waitForPageLoad();
  }

  async clickAddButton() {
    await this.clickElement(this.addButton);
  }

  async fillDesignationForm(designationData) {
    if (designationData.title) {
      await this.fillInput(this.titleInput, designationData.title);
    }
    if (designationData.department) {
      await this.selectDropdown(this.departmentDropdown, designationData.department);
    }
    if (designationData.level) {
      await this.selectDropdown(this.levelDropdown, designationData.level);
    }
  }

  async clickSaveButton() {
    await this.clickElement(this.saveButton);
  }

  async clickCancelButton() {
    await this.clickElement(this.cancelButton);
  }

  async addDesignation(designationData) {
    await this.clickAddButton();
    await this.fillDesignationForm(designationData);
    await this.clickSaveButton();
    await this.page.waitForTimeout(1000);
  }

  async updateDesignation(title, updates) {
    await this.searchDesignation(title);
    await this.clickElement(this.editButton);
    await this.fillDesignationForm(updates);
    await this.clickSaveButton();
    await this.page.waitForTimeout(1000);
  }

  async deleteDesignation(title) {
    await this.searchDesignation(title);
    await this.clickElement(this.deleteButton);
    await this.confirmDialog();
    await this.page.waitForTimeout(1000);
  }

  async searchDesignation(title) {
    await this.fillInput(this.searchInput, title);
    await this.clickElement(this.searchButton);
    await this.page.waitForTimeout(500);
  }

  async filterByDepartment(department) {
    await this.clickElement(this.filterButton);
    await this.selectDropdown('#filterDepartment', department);
    await this.clickElement('button:has-text("Apply")');
    await this.page.waitForTimeout(500);
  }

  async sortByLevel() {
    await this.clickElement(this.sortButton);
    await this.clickElement('option:has-text("Level")');
    await this.page.waitForTimeout(500);
  }

  async assignDesignation(title, employeeId) {
    await this.searchDesignation(title);
    await this.clickElement(this.assignButton);
    await this.fillInput('#employeeId', employeeId);
    await this.clickElement('button:has-text("Confirm")');
    await this.page.waitForTimeout(1000);
  }

  async getSearchResults() {
    const rows = await this.page.locator(this.tableRows).all();
    const results = [];
    for (const row of rows) {
      const text = await row.textContent();
      results.push(text);
    }
    return results;
  }

  async getAllDesignations() {
    return await this.getSearchResults();
  }

  async getSuccessMessage() {
    return await this.getElementText(this.successMessage);
  }

  async getErrorMessage() {
    return await this.getElementText(this.errorMessage);
  }

  async getAllValidationMessages() {
    const messages = await this.page.locator(this.validationMessage).all();
    const texts = [];
    for (const message of messages) {
      const text = await message.textContent();
      texts.push(text);
    }
    return texts;
  }

  async isExportButtonVisible() {
    return await this.isElementVisible(this.exportButton);
  }

  async clickExportButton() {
    await this.clickElement(this.exportButton);
  }
}

module.exports = { DesignationPage };
