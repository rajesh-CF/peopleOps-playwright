// Page Object for Time Module
export class TimePage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.timeMenu = 'a[href="#/time"]';
        this.timesheetTab = 'a[href="#/time/viewEmployeeTimesheet"]';
        this.attendanceTab = 'a[href="#/time/attendance"]';
        this.projectsTab = 'a[href="#/time/projects"]';
        this.activitiesTab = 'a[href="#/time/activity"]';
        
        // Timesheet Section
        this.addTimesheetButton = 'button:has-text("Add")';
        this.editButton = 'button[class*="edit"]';
        this.deleteButton = 'button[class*="delete"]';
        this.submitButton = 'button:has-text("Submit")';
        this.approveButton = 'button:has-text("Approve")';
        this.rejectButton = 'button:has-text("Reject")';
        this.cancelButton = 'button:has-text("Cancel")';
        this.saveButton = 'button[type="submit"]';
        
        // Timesheet Form Fields
        this.employeeNameInput = 'input[placeholder="Type for hints..."]';
        this.projectDropdown = '.oxd-select-text-input';
        this.activityTypeDropdown = '(//div[@class="oxd-select-text-input"])[2]';
        this.projectActivityDropdown = '(//div[@class="oxd-select-text-input"])[3]';
        this.timesheetDateInput = '(//input[@placeholder="yyyy-mm-dd"])[1]';
        this.hoursInputs = 'input[placeholder="0.00"]';
        this.commentBox = 'textarea';
        this.workItemIdInput = 'input[placeholder="Work item ID"]';
        
        // Date Range
        this.fromDateInput = '(//input[@placeholder="yyyy-mm-dd"])[1]';
        this.toDateInput = '(//input[@placeholder="yyyy-mm-dd"])[2]';
        this.dateRangeInputs = 'input[placeholder="yyyy-mm-dd"]';
        
        // Status and States
        this.statusDropdown = '.oxd-select-text-input';
        this.statusFilter = '(//div[@class="oxd-select-text-input"])[1]';
        this.projectFilter = '(//div[@class="oxd-select-text-input"])[2]';
        
        // Table Elements
        this.timesheetTable = '.oxd-table';
        this.tableRows = '.oxd-table-body >> .oxd-table-row';
        this.tableCell = '.oxd-table-cell';
        this.statusBadge = '.oxd-status-badge';
        this.totalHoursCell = '.oxd-table-cell';
        
        // Attendance Section
        this.checkInButton = 'button:has-text("Check In")';
        this.checkOutButton = 'button:has-text("Check Out")';
        this.attendanceTable = '.oxd-table';
        this.attendanceRows = '.oxd-table-body >> .oxd-table-row';
        this.attendanceStatusBadge = '.oxd-status-badge';
        
        // Project Management
        this.projectNameInput = 'input[placeholder="Project Name"]';
        this.projectDescriptionInput = 'textarea[placeholder*="Description"]';
        this.projectClientDropdown = '.oxd-select-text-input';
        this.projectTable = '.oxd-table';
        
        // Activity Section
        this.activityNameInput = 'input[placeholder*="Activity"]';
        this.activityDescriptionInput = 'textarea';
        this.activityTable = '.oxd-table';
        
        // Search and Filter
        this.searchButton = 'button:has-text("Search")';
        this.resetButton = 'button:has-text("Reset")';
        this.searchInputField = 'input[placeholder="Search"]';
        
        // Messages
        this.successMessage = '.oxd-toast-content';
        this.errorMessage = '.oxd-text--toast-message';
        this.requiredFieldError = '.oxd-form-field-error';
        this.warningMessage = '.oxd-text--toast-message-warning';
        
        // Modals and Dialogs
        this.modalDialog = '.oxd-dialog';
        this.modalTitle = '.oxd-dialog-title';
        this.modalCloseButton = 'button[class*="--cancel"]';
        this.confirmDeleteButton = 'button:has-text("Yes, Delete")';
        
        // Dashboard Elements
        this.timesheetStatus = '.oxd-text';
        this.employeeInfoBox = '.oxd-grid-item';
        this.totalHoursDisplay = '.oxd-text';
        this.noDataMessage = '.oxd-empty-state';
        
        // Common Elements
        this.pageTitle = 'h2';
        this.breadcrumb = '.oxd-text-page-title';
        this.pageHeading = '[class*="page-title"]';
    }

    async navigateToTime() {
        await this.page.click(this.timeMenu);
    }

    async openTimesheetTab() {
        await this.page.click(this.timesheetTab);
    }

    async openAttendanceTab() {
        await this.page.click(this.attendanceTab);
    }

    async openProjectsTab() {
        await this.page.click(this.projectsTab);
    }

    async openActivitiesTab() {
        await this.page.click(this.activitiesTab);
    }

    // Timesheet Management
    async clickAddTimesheet() {
        await this.page.click(this.addTimesheetButton);
    }

    async enterEmployeeName(name) {
        await this.page.fill(this.employeeNameInput, name);
    }

    async selectEmployeeFromDropdown(employeeName) {
        await this.page.click(this.employeeNameInput);
        await this.page.waitForSelector(`//span[text()="${employeeName}"]`);
        await this.page.click(`//span[text()="${employeeName}"]`);
    }

    async selectProject(projectName) {
        await this.page.locator(this.projectDropdown).first().click();
        await this.page.waitForSelector(`//span[text()="${projectName}"]`);
        await this.page.click(`//span[text()="${projectName}"]`);
    }

    async selectActivityType(activityType) {
        await this.page.locator(this.activityTypeDropdown).click();
        await this.page.waitForSelector(`//span[text()="${activityType}"]`);
        await this.page.click(`//span[text()="${activityType}"]`);
    }

    async enterTimesheetDate(date) {
        await this.page.fill(this.timesheetDateInput, date);
    }

    async enterHoursForDay(dayIndex, hours) {
        const inputs = await this.page.locator(this.hoursInputs).all();
        if (inputs[dayIndex]) {
            await inputs[dayIndex].fill(hours.toString());
        }
    }

    async enterComments(comment) {
        await this.page.fill(this.commentBox, comment);
    }

    async clickSubmitTimesheet() {
        await this.page.click(this.submitButton);
    }

    async clickSaveButton() {
        await this.page.click(this.saveButton);
    }

    async clickCancelButton() {
        await this.page.click(this.cancelButton);
    }

    async clickApproveButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.approveButton).click();
    }

    async clickRejectButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.rejectButton).click();
    }

    async clickEditButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.editButton).click();
    }

    async clickDeleteButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.deleteButton).click();
    }

    // Date Range Selection
    async selectDateRange(fromDate, toDate) {
        await this.page.fill(this.fromDateInput, fromDate);
        await this.page.fill(this.toDateInput, toDate);
    }

    async enterFromDate(fromDate) {
        await this.page.fill(this.fromDateInput, fromDate);
    }

    async enterToDate(toDate) {
        await this.page.fill(this.toDateInput, toDate);
    }

    // Search and Filter
    async filterByStatus(status) {
        await this.page.locator(this.statusFilter).first().click();
        const statusOptions = {
            'Draft': 'Draft',
            'Submitted': 'Submitted',
            'Approved': 'Approved',
            'Rejected': 'Rejected'
        };
        await this.page.click(`//span[text()="${statusOptions[status]}"]`);
    }

    async filterByProject(projectName) {
        await this.page.locator(this.projectFilter).click();
        await this.page.click(`//span[text()="${projectName}"]`);
    }

    async clickSearchButton() {
        await this.page.click(this.searchButton);
    }

    async clickResetButton() {
        await this.page.click(this.resetButton);
    }

    async enterSearchText(searchText) {
        await this.page.fill(this.searchInputField, searchText);
    }

    // Table Interactions
    async getTimesheetTableRowCount() {
        return await this.page.locator(this.tableRows).count();
    }

    async getTableCellText(rowIndex, cellIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        const cell = await row.locator(this.tableCell).nth(cellIndex);
        return await cell.textContent();
    }

    async getTimesheetStatus(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        const statusBadge = await row.locator(this.statusBadge);
        return await statusBadge.textContent();
    }

    async clickTableRow(rowIndex) {
        await this.page.locator(this.tableRows).nth(rowIndex).click();
    }

    async getFirstRowData() {
        if (await this.getTimesheetTableRowCount() > 0) {
            return await this.getTableCellText(0, 0);
        }
        return null;
    }

    // Attendance Check-In/Out
    async clickCheckInButton() {
        await this.page.click(this.checkInButton);
    }

    async clickCheckOutButton() {
        await this.page.click(this.checkOutButton);
    }

    async getAttendanceTableRowCount() {
        return await this.page.locator(this.attendanceRows).count();
    }

    async getAttendanceStatus(rowIndex) {
        const row = await this.page.locator(this.attendanceRows).nth(rowIndex);
        const statusBadge = await row.locator(this.attendanceStatusBadge);
        return await statusBadge.textContent();
    }

    // Project Management
    async clickAddProject() {
        await this.page.click(this.addTimesheetButton);
    }

    async enterProjectName(projectName) {
        await this.page.fill(this.projectNameInput, projectName);
    }

    async enterProjectDescription(description) {
        await this.page.fill(this.projectDescriptionInput, description);
    }

    async selectProjectClient(clientName) {
        await this.page.locator(this.projectClientDropdown).click();
        await this.page.click(`//span[text()="${clientName}"]`);
    }

    async isProjectTableDisplayed() {
        return await this.page.isVisible(this.projectTable);
    }

    // Activity Management
    async clickAddActivity() {
        await this.page.click(this.addTimesheetButton);
    }

    async enterActivityName(activityName) {
        await this.page.fill(this.activityNameInput, activityName);
    }

    async enterActivityDescription(description) {
        await this.page.fill(this.activityDescriptionInput, description);
    }

    async isActivityTableDisplayed() {
        return await this.page.isVisible(this.activityTable);
    }

    // Message Verification
    async getSuccessMessage() {
        await this.page.waitForSelector(this.successMessage, { timeout: 5000 });
        return await this.page.textContent(this.successMessage);
    }

    async isSuccessMessageVisible() {
        return await this.page.isVisible(this.successMessage);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }

    async getFieldErrorMessages() {
        const errors = await this.page.locator(this.requiredFieldError).allTextContents();
        return errors;
    }

    async hasFieldErrors() {
        return (await this.page.locator(this.requiredFieldError).count()) > 0;
    }

    // Modal Interactions
    async isModalDisplayed() {
        return await this.page.isVisible(this.modalDialog);
    }

    async getModalTitle() {
        return await this.page.textContent(this.modalTitle);
    }

    async closeModal() {
        await this.page.click(this.modalCloseButton);
    }

    async confirmDelete() {
        await this.page.click(this.confirmDeleteButton);
    }

    // Page Status Checks
    async isTimesheetTableDisplayed() {
        return await this.page.isVisible(this.timesheetTable);
    }

    async isAttendanceTableDisplayed() {
        return await this.page.isVisible(this.attendanceTable);
    }

    async getPageTitle() {
        return await this.page.textContent(this.pageTitle);
    }

    async isNoDataMessageDisplayed() {
        return await this.page.isVisible(this.noDataMessage);
    }

    // Form Validation
    async verifyFieldIsRequired(fieldLocator) {
        const ariaRequired = await this.page.locator(fieldLocator).getAttribute('aria-required');
        return ariaRequired === 'true';
    }

    async clearEmployeeNameInput() {
        await this.page.locator(this.employeeNameInput).clear();
    }

    async getEmployeeNameValue() {
        return await this.page.inputValue(this.employeeNameInput);
    }

    // Navigation Verification
    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async isTimeMenuVisible() {
        return await this.page.isVisible(this.timeMenu);
    }

    // Timesheet Hours Calculation
    async getTotalHoursValue() {
        const cells = await this.page.locator(this.totalHoursCell).allTextContents();
        return cells.length > 0 ? cells[cells.length - 1] : '0';
    }

    async getHoursEntryCount() {
        return await this.page.locator(this.hoursInputs).count();
    }

    // Advanced Operations
    async createTimesheet(employeeName, projectName, hoursMap = {}) {
        await this.clickAddTimesheet();
        await this.selectEmployeeFromDropdown(employeeName);
        await this.selectProject(projectName);
        
        // Enter hours for days if provided
        for (const [dayIndex, hours] of Object.entries(hoursMap)) {
            await this.enterHoursForDay(parseInt(dayIndex), hours);
        }
        
        await this.clickSaveButton();
    }

    async submitTimesheet(rowIndex) {
        await this.clickEditButton(rowIndex);
        await this.page.waitForTimeout(1000);
        await this.clickSubmitTimesheet();
    }

    async searchAndFilter(fromDate, toDate, status = null) {
        await this.selectDateRange(fromDate, toDate);
        if (status) {
            await this.filterByStatus(status);
        }
        await this.clickSearchButton();
    }

    async refreshPage() {
        await this.page.reload();
        await this.waitForPageLoad();
    }

    async getTimesheetStatusCount(status) {
        const rows = await this.page.locator(this.tableRows).allTextContents();
        return rows.filter(row => row.includes(status)).length;
    }

    async getAllTableData() {
        const rows = await this.page.locator(this.tableRows).count();
        const data = [];
        
        for (let i = 0; i < rows; i++) {
            const rowText = await this.getTableCellText(i, 0);
            data.push(rowText);
        }
        
        return data;
    }

    async verifyTimeRangeValidation(fromDate, toDate) {
        try {
            await this.enterFromDate(fromDate);
            await this.enterToDate(toDate);
            await this.clickSearchButton();
            await this.page.waitForTimeout(1000);
            return true;
        } catch (e) {
            return false;
        }
    }

    async isFormFieldsDisplayed() {
        const employeeInput = await this.page.isVisible(this.employeeNameInput).catch(() => false);
        const projectDropdown = await this.page.isVisible(this.projectDropdown).catch(() => false);
        return employeeInput || projectDropdown;
    }

    async getTotalHoursDisplayed() {
        try {
            return await this.getTotalHoursValue();
        } catch (e) {
            return null;
        }
    }

    async getTimesheetEntryCount() {
        return await this.getTimesheetTableRowCount();
    }

    async waitForTimesheetLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async verifyTimesheetEditable(rowIndex) {
        try {
            await this.clickEditButton(rowIndex);
            await this.page.waitForTimeout(500);
            return await this.isFormFieldsDisplayed();
        } catch (e) {
            return false;
        }
    }
}
