class AdminPage {
  constructor(page) {
    this.page = page;

    // Headers
    this.adminHeader = this.page.getByRole('heading', { name: 'Admin' });

    // Buttons
    this.addBtn = this.page.getByRole("button", { name: "Add" });
    this.searchBtn = this.page.getByRole("button", { name: "Search" });
    this.resetBtn = this.page.getByRole("button", { name: "Reset" });
    this.saveBtn = this.page.getByRole("button", { name: "Save" });
    this.saveBtn = this.page.getByRole("button", { name: "Save" });
    this.cancelBtn = this.page.getByRole("button", { name: "Cancel" });
    this.deleteFirstUserBtn = this.page.locator(".oxd-icon.bi-trash").first();
    this.editFirstUserBtn = this.page.locator(".oxd-table-cell-actions button").first();

    // Form Fields
    this.usernameSearchInput = this.page.getByPlaceholder("Type for hints...");
    this.usernameInput = 'input[autocomplete="off"]';
    this.passwordInputs = (index) => this.page.locator('input[type="password"]').nth(index);

    // Dropdowns
    this.roleDropdown = this.page.locator(".oxd-select-text").nth(0);
    this.statusDropdown = this.page.locator(".oxd-select-text").nth(1);

    // Table Items
    this.tableRows = this.page.locator(".oxd-table-body");
    this.deleteIcons = this.page.locator(".oxd-icon.bi-trash");
    this.editIcons = this.page.locator(".oxd-table-cell-actions button");

    // Popup
    this.confirmDeleteBtn = this.page.getByRole("button", { name: "Yes, Delete" });
  }

  // Verify admin page loaded
  async verifyAdminPageLoaded() {
    await this.adminHeader.waitFor();
  }

  // Click Add user
  async clickAddUser() {
    await this.addBtn.click();
  }

  // Select User Role
  async selectUserRole(roleName) {
    await this.roleDropdown.click();
    await this.page.getByRole("option", { name: roleName }).click();
  }

  // Select Status
  async selectStatus(statusName) {
    await this.statusDropdown.click();
    await this.page.getByRole("option", { name: statusName }).click();
  }

  // Fill Add User Form
  async fillUserForm(data) {
    await this.selectUserRole(data.role);
    await this.page.getByPlaceholder("Type for hints...").fill(data.employee);
    await this.selectStatus(data.status);
    await this.page.locator(this.usernameInput).nth(1).fill(data.username);
    await this.passwordInputs(0).fill(data.password);
    await this.passwordInputs(1).fill(data.password);
  }

  // Search User
  async searchUser(username) {
    await this.usernameSearchInput.fill(username);
    await this.searchBtn.click();
  }

  // Click edit user
  async clickEditFirstUser() {
    await this.editIcons.first().click();
  }

  // Delete first user
  async deleteFirstUser() {
    await this.deleteIcons.first().click();
    await this.confirmDeleteBtn.click();
  }
}

module.exports = { AdminPage };
