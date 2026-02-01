// Page Object for Leave Module
export class LeavePage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.leaveMenu = 'a[href="#/leave"]';
        this.applyTab = 'a[href="#/leave/applyLeave"]';
        this.myLeaveTab = 'a[href="#/leave/myLeaveList"]';
        this.leaveRequestsTab = 'a[href="#/leave/leaveRequestList"]';
        this.entitlementsTab = 'a[href="#/leave/viewLeaveEntitlements"]';
        
        // Apply Leave Form
        this.leaveTypeDropdown = '.oxd-select-text-input';
        this.leaveTypeOption = (type) => `//span[text()="${type}"]`;
        this.fromDateInput = '(//input[@placeholder="yyyy-mm-dd"])[1]';
        this.toDateInput = '(//input[@placeholder="yyyy-mm-dd"])[2]';
        this.commentBox = 'textarea.oxd-textarea';
        this.applyButton = 'button[type="submit"]';
        this.cancelButton = 'button:has-text("Cancel")';
        
        // Validation Messages
        this.successMessage = '.oxd-toast-content';
        this.errorMessage = '.oxd-text--toast-message';
        this.requiredErrorField = '.oxd-form-field-error';
        
        // Leave List Elements
        this.leaveTable = '.oxd-table';
        this.leaveTableRows = '.oxd-table-body >> .oxd-table-row';
        this.leaveStatusBadge = '.oxd-status-badge';
        this.approveButton = 'button:has-text("Approve")';
        this.rejectButton = 'button:has-text("Reject")';
        this.actionButtons = '.oxd-table-cell-action-space >> button';
        
        // Filters
        this.leaveTypeFilter = '(//div[@class="oxd-select-text-input"])[1]';
        this.statusFilter = '(//div[@class="oxd-select-text-input"])[2]';
        this.fromDateFilter = '(//input[@placeholder="yyyy-mm-dd"])[1]';
        this.toDateFilter = '(//input[@placeholder="yyyy-mm-dd"])[2]';
        this.searchButton = 'button:has-text("Search")';
        this.resetButton = 'button:has-text("Reset")';
        
        // Leave Details Modal
        this.leaveDetailsModal = '.oxd-dialog';
        this.reasonField = 'textarea[name="reason"]';
        this.durationField = '.oxd-input';
        this.totalDaysLabel = '.oxd-text';
        this.modalCloseButton = 'button[class*="--cancel"]';
        
        // Entitlements Section
        this.leaveBalanceTable = '.oxd-table';
        this.leaveTypeNameCell = '.oxd-table-cell:first-child';
        this.balanceCell = '.oxd-table-cell';
        this.usedCell = '.oxd-table-cell';
    }

    async navigateToLeave() {
        await this.page.click(this.leaveMenu);
    }

    async openApplyLeavePage() {
        await this.page.click(this.applyTab);
    }

    async openMyLeavePage() {
        await this.page.click(this.myLeaveTab);
    }

    async openLeaveRequestsPage() {
        await this.page.click(this.leaveRequestsTab);
    }

    async openEntitlementsPage() {
        await this.page.click(this.entitlementsTab);
    }

    async selectLeaveType(type) {
        await this.page.locator(this.leaveTypeDropdown).first().click();
        await this.page.waitForSelector(this.leaveTypeOption(type));
        await this.page.click(this.leaveTypeOption(type));
    }

    async fillFromDate(date) {
        await this.page.fill(this.fromDateInput, date);
    }

    async fillToDate(date) {
        await this.page.fill(this.toDateInput, date);
    }

    async fillComment(comment) {
        await this.page.fill(this.commentBox, comment);
    }

    async clickApplyButton() {
        await this.page.click(this.applyButton);
    }

    async clickCancelButton() {
        await this.page.click(this.cancelButton);
    }

    async applyLeave(leaveType, fromDate, toDate, comment = '') {
        await this.selectLeaveType(leaveType);
        await this.fillFromDate(fromDate);
        await this.fillToDate(toDate);
        if (comment) {
            await this.fillComment(comment);
        }
        await this.clickApplyButton();
    }

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

    async getFieldErrorMessage(fieldNumber = 1) {
        const errors = await this.page.locator(this.requiredErrorField).allTextContents();
        return errors[fieldNumber - 1] || '';
    }

    async getLeaveTableRowCount() {
        return await this.page.locator(this.leaveTableRows).count();
    }

    async getLeaveStatus(rowIndex) {
        const cells = await this.page.locator(this.leaveTableRows).nth(rowIndex).locator('.oxd-table-cell');
        return await cells.last().textContent();
    }

    async approveLeaveRequest(rowIndex) {
        await this.page.locator(this.leaveTableRows).nth(rowIndex).locator(this.approveButton).click();
    }

    async rejectLeaveRequest(rowIndex) {
        await this.page.locator(this.leaveTableRows).nth(rowIndex).locator(this.rejectButton).click();
    }

    async filterByLeaveType(leaveType) {
        await this.page.click(this.leaveTypeFilter);
        await this.page.click(this.leaveTypeOption(leaveType));
    }

    async filterByStatus(status) {
        const statusOptions = {
            'Pending': 'Pending Approval',
            'Approved': 'Approved',
            'Rejected': 'Rejected',
            'Cancelled': 'Cancelled'
        };
        await this.page.click(this.statusFilter);
        await this.page.click(`//span[text()="${statusOptions[status]}"]`);
    }

    async filterByDateRange(fromDate, toDate) {
        await this.page.fill(this.fromDateFilter, fromDate);
        await this.page.fill(this.toDateFilter, toDate);
    }

    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    async clickReset() {
        await this.page.click(this.resetButton);
    }

    async getLeaveBalance(leaveTypeName) {
        const rows = await this.page.locator(this.leaveTableRows).allTextContents();
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].includes(leaveTypeName)) {
                return rows[i];
            }
        }
        return null;
    }

    async isApplyFormDisplayed() {
        return await this.page.isVisible(this.leaveTypeDropdown);
    }

    async isLeaveTableDisplayed() {
        return await this.page.isVisible(this.leaveTable);
    }

    async clickLeaveTableRow(rowIndex) {
        await this.page.locator(this.leaveTableRows).nth(rowIndex).click();
    }

    async isModalDisplayed() {
        return await this.page.isVisible(this.leaveDetailsModal);
    }

    async closeModal() {
        await this.page.click(this.modalCloseButton);
    }

    async verifyFormValidation() {
        const errors = await this.page.locator(this.requiredErrorField).count();
        return errors > 0;
    }

    async getFromDateValue() {
        return await this.page.inputValue(this.fromDateInput);
    }

    async getToDateValue() {
        return await this.page.inputValue(this.toDateInput);
    }

    async clearFromDate() {
        await this.page.locator(this.fromDateInput).clear();
    }

    async clearToDate() {
        await this.page.locator(this.toDateInput).clear();
    }

    async clearComment() {
        await this.page.locator(this.commentBox).clear();
    }

    async getCommentValue() {
        return await this.page.inputValue(this.commentBox);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async isFromDateFieldRequired() {
        const ariaRequired = await this.page.locator(this.fromDateInput).getAttribute('aria-required');
        return ariaRequired === 'true';
    }

    async isToDateFieldRequired() {
        const ariaRequired = await this.page.locator(this.toDateInput).getAttribute('aria-required');
        return ariaRequired === 'true';
    }

    async getLeaveTypeDropdownOptions() {
        await this.page.locator(this.leaveTypeDropdown).first().click();
        const options = await this.page.locator('//div[@role="option"]').allTextContents();
        return options;
    }

    async selectMultipleDays(fromDate, toDate) {
        await this.fillFromDate(fromDate);
        await this.fillToDate(toDate);
    }

    async getCalculatedTotalDays() {
        return await this.page.textContent(this.totalDaysLabel);
    }
}
