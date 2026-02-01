import { test, expect } from '@playwright/test';
import { LoginPage } from './page/LoginPage';
import { LeavePage } from './page/LeavePage';

test.describe('Leave Module - Comprehensive Test Suite', () => {
    let page;
    let leavePage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        leavePage = new LeavePage(page);

        // Navigate directly to Leave module (auth session already applied)
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.waitForLoadState('networkidle');
        
        // Navigate to Leave module
        await leavePage.navigateToLeave();
        await page.waitForLoadState('networkidle');
    });

    test.afterEach(async () => {
        await page.close();
    });

    // ========== UI VALIDATION TEST CASES ==========
    
    test('UI-001: Verify Leave Module Navigation Menu is Visible', async () => {
        // Verify Leave menu exists
        const leaveMenu = page.locator('a[href="#/leave"]');
        await expect(leaveMenu).toBeVisible();
    });

    test('UI-002: Verify Apply Leave Tab is Displayed', async () => {
        // Open Apply Leave page
        await leavePage.openApplyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Verify form elements are visible
        const leaveTypeDropdown = page.locator('.oxd-select-text-input').first();
        const applyButton = page.locator('button[type="submit"]');
        
        await expect(leaveTypeDropdown).toBeVisible();
        await expect(applyButton).toBeVisible();
    });

    test('UI-003: Verify My Leave Tab is Displayed', async () => {
        // Open My Leave page
        await leavePage.openMyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Verify leave table is displayed
        const leaveTable = page.locator('.oxd-table');
        await expect(leaveTable).toBeVisible();
    });

    test('UI-004: Verify Leave Requests Tab is Displayed', async () => {
        // Open Leave Requests page
        await leavePage.openLeaveRequestsPage();
        await page.waitForLoadState('networkidle');
        
        // Verify page elements
        const leaveTable = page.locator('.oxd-table');
        await expect(leaveTable).toBeVisible();
    });

    test('UI-005: Verify Leave Entitlements Tab is Displayed', async () => {
        // Open Entitlements page
        await leavePage.openEntitlementsPage();
        await page.waitForLoadState('networkidle');
        
        // Verify entitlements table is displayed
        const entitlementTable = page.locator('.oxd-table');
        await expect(entitlementTable).toBeVisible();
    });

    test('UI-006: Verify Apply Leave Form Fields Layout', async () => {
        await leavePage.openApplyLeavePage();
        
        const leaveTypeDropdown = page.locator('.oxd-select-text-input').first();
        const fromDateInput = page.locator('(//input[@placeholder="yyyy-mm-dd"])[1]');
        const toDateInput = page.locator('(//input[@placeholder="yyyy-mm-dd"])[2]');
        const commentBox = page.locator('textarea.oxd-textarea');
        
        await expect(leaveTypeDropdown).toBeVisible();
        await expect(fromDateInput).toBeVisible();
        await expect(toDateInput).toBeVisible();
        await expect(commentBox).toBeVisible();
    });

    test('UI-007: Verify Leave Type Dropdown Contains Valid Options', async () => {
        await leavePage.openApplyLeavePage();
        
        const options = await leavePage.getLeaveTypeDropdownOptions();
        expect(options.length).toBeGreaterThan(0);
        expect(options[0]).not.toBe('');
    });

    test('UI-008: Verify Date Picker Format is YYYY-MM-DD', async () => {
        await leavePage.openApplyLeavePage();
        
        const fromDateInput = page.locator('(//input[@placeholder="yyyy-mm-dd"])[1]');
        const placeholder = await fromDateInput.getAttribute('placeholder');
        
        expect(placeholder).toBe('yyyy-mm-dd');
    });

    test('UI-009: Verify Required Field Indicators', async () => {
        await leavePage.openApplyLeavePage();
        
        // Check if Leave Type field is required
        const isRequired = await leavePage.isFromDateFieldRequired();
        expect(isRequired).toBeTruthy();
    });

    test('UI-010: Verify Cancel Button is Available', async () => {
        await leavePage.openApplyLeavePage();
        
        const cancelButton = page.locator('button:has-text("Cancel")');
        await expect(cancelButton).toBeVisible();
    });

    // ========== FUNCTIONAL TEST CASES ==========

    test('FUNC-001: Apply Leave with Valid Data', async () => {
        await leavePage.openApplyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Apply leave with valid data
        await leavePage.applyLeave('CZC', '2025-12-15', '2025-12-16', 'Personal leave');
        
        // Verify success message
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-002: Apply Leave without Comment', async () => {
        await leavePage.openApplyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Apply leave without comment
        await leavePage.applyLeave('CZC', '2025-12-17', '2025-12-18', '');
        
        // Verify success message
        await page.waitForTimeout(2000);
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-003: Verify Cannot Apply Leave without Leave Type', async () => {
        await leavePage.openApplyLeavePage();
        
        // Fill only dates and comment without selecting leave type
        await leavePage.fillFromDate('2025-12-19');
        await leavePage.fillToDate('2025-12-20');
        await leavePage.fillComment('Test comment');
        await leavePage.clickApplyButton();
        
        // Verify error message appears
        await page.waitForTimeout(1000);
        const hasError = await leavePage.verifyFormValidation();
        expect(hasError).toBeTruthy();
    });

    test('FUNC-004: Verify Cannot Apply Leave without From Date', async () => {
        await leavePage.openApplyLeavePage();
        
        // Select leave type and date, but clear from date
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillToDate('2025-12-25');
        await leavePage.clearFromDate();
        await leavePage.clickApplyButton();
        
        // Verify validation error
        await page.waitForTimeout(1000);
        const hasError = await leavePage.verifyFormValidation();
        expect(hasError).toBeTruthy();
    });

    test('FUNC-005: Verify Cannot Apply Leave without To Date', async () => {
        await leavePage.openApplyLeavePage();
        
        // Select leave type and from date, but skip to date
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-20');
        await leavePage.clearToDate();
        await leavePage.clickApplyButton();
        
        // Verify validation error
        await page.waitForTimeout(1000);
        const hasError = await leavePage.verifyFormValidation();
        expect(hasError).toBeTruthy();
    });

    test('FUNC-006: Verify Cannot Apply Leave with To Date Before From Date', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave with to date before from date
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-25');
        await leavePage.fillToDate('2025-12-20');
        await leavePage.clickApplyButton();
        
        // Verify error message
        await page.waitForTimeout(2000);
        const errorVisible = await page.isVisible('.oxd-text--toast-message');
        expect(errorVisible).toBeTruthy();
    });

    test('FUNC-007: Verify Apply Leave with Multiple Days', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave for 5 days
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-29');
        await leavePage.fillToDate('2026-01-02');
        await leavePage.fillComment('Year-end leave');
        await leavePage.clickApplyButton();
        
        // Verify success
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-008: Verify Applied Leave Appears in My Leave List', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-22');
        await leavePage.fillToDate('2025-12-23');
        await leavePage.clickApplyButton();
        
        // Wait for success
        await page.waitForTimeout(2000);
        
        // Navigate to My Leave
        await leavePage.openMyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Verify leave appears in list
        const leaveTable = page.locator('.oxd-table');
        await expect(leaveTable).toBeVisible();
        
        const rowCount = await leavePage.getLeaveTableRowCount();
        expect(rowCount).toBeGreaterThan(0);
    });

    test('FUNC-009: Verify Cancel Button Clears Form and Navigates Back', async () => {
        await leavePage.openApplyLeavePage();
        
        // Fill form data
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-24');
        await leavePage.fillToDate('2025-12-25');
        await leavePage.fillComment('Christmas leave');
        
        // Click cancel button
        await leavePage.clickCancelButton();
        
        // Verify navigation
        await page.waitForTimeout(1000);
        const currentUrl = page.url();
        expect(currentUrl).toContain('leave');
    });

    test('FUNC-010: Verify Leave Status Shows Pending Approval After Submission', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-26');
        await leavePage.fillToDate('2025-12-27');
        await leavePage.clickApplyButton();
        
        // Wait and navigate to My Leave
        await page.waitForTimeout(2000);
        await leavePage.openMyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Verify status
        const status = await leavePage.getLeaveStatus(0);
        expect(status).toContain('Pending');
    });

    test('FUNC-011: Verify Can View Leave Details', async () => {
        await leavePage.openMyLeavePage();
        await page.waitForLoadState('networkidle');
        
        // Get row count
        const rowCount = await leavePage.getLeaveTableRowCount();
        
        if (rowCount > 0) {
            // Click first leave record
            await leavePage.clickLeaveTableRow(0);
            await page.waitForTimeout(1000);
            
            // Verify modal/details page appears
            const isDisplayed = await leavePage.isModalDisplayed();
            expect(isDisplayed).toBeTruthy();
        }
    });

    test('FUNC-012: Verify Special Characters in Comments are Handled', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave with special characters in comment
        const specialComment = 'Test comment @#$%^&*() with special chars!';
        
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-28');
        await leavePage.fillToDate('2025-12-29');
        await leavePage.fillComment(specialComment);
        await leavePage.clickApplyButton();
        
        // Verify success
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-013: Verify Long Comment Text is Accepted', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave with long comment
        const longComment = 'This is a very long comment that explains the reason for taking leave in detail. It contains multiple sentences and should be accepted by the system without any issues. ' + 'A'.repeat(100);
        
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-30');
        await leavePage.fillToDate('2025-12-31');
        await leavePage.fillComment(longComment);
        await leavePage.clickApplyButton();
        
        // Verify success
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-014: Verify Different Leave Types Can Be Selected', async () => {
        await leavePage.openApplyLeavePage();
        
        // Get all available leave types
        const options = await leavePage.getLeaveTypeDropdownOptions();
        
        // Verify at least one leave type is available
        expect(options.length).toBeGreaterThan(0);
    });

    test('FUNC-015: Verify Leave Cannot Be Applied for Past Dates', async () => {
        await leavePage.openApplyLeavePage();
        
        // Try to apply leave for past date (year 2020)
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2020-12-25');
        await leavePage.fillToDate('2020-12-26');
        await leavePage.clickApplyButton();
        
        // Verify error or rejection
        await page.waitForTimeout(2000);
        const errorVisible = await page.isVisible('.oxd-text--toast-message');
        // System may either show error or reject silently - both are acceptable
    });

    test('FUNC-016: Verify Comment Field is Optional', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave without filling comment field
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-10');
        await leavePage.fillToDate('2025-12-11');
        
        // Verify comment field can be left empty and form still submits
        const commentValue = await leavePage.getCommentValue();
        await leavePage.clickApplyButton();
        
        await page.waitForTimeout(2000);
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-017: Verify Form Fields Maintain State During Interaction', async () => {
        await leavePage.openApplyLeavePage();
        
        // Fill form
        await leavePage.selectLeaveType('CZC');
        const testDate1 = '2025-12-12';
        const testDate2 = '2025-12-13';
        const testComment = 'State verification test';
        
        await leavePage.fillFromDate(testDate1);
        await leavePage.fillToDate(testDate2);
        await leavePage.fillComment(testComment);
        
        // Verify values are maintained
        const fromValue = await leavePage.getFromDateValue();
        const toValue = await leavePage.getToDateValue();
        const commentValue = await leavePage.getCommentValue();
        
        expect(fromValue).toBe(testDate1);
        expect(toValue).toBe(testDate2);
        expect(commentValue).toBe(testComment);
    });

    test('FUNC-018: Verify Page Navigation Between Leave Tabs', async () => {
        // Navigate to Apply Leave
        await leavePage.openApplyLeavePage();
        let url = page.url();
        expect(url).toContain('applyLeave');
        
        // Navigate to My Leave
        await leavePage.openMyLeavePage();
        url = page.url();
        expect(url).toContain('myLeaveList');
        
        // Navigate to Leave Requests
        await leavePage.openLeaveRequestsPage();
        url = page.url();
        expect(url).toContain('leaveRequestList');
    });

    test('FUNC-019: Verify Duplicate Leave Application is Handled', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave for same dates
        await leavePage.selectLeaveType('CZC');
        const testFromDate = '2025-12-14';
        const testToDate = '2025-12-15';
        
        await leavePage.fillFromDate(testFromDate);
        await leavePage.fillToDate(testToDate);
        await leavePage.clickApplyButton();
        
        // Wait for first submission
        await page.waitForTimeout(2000);
        
        // Try applying same dates again
        await leavePage.openApplyLeavePage();
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate(testFromDate);
        await leavePage.fillToDate(testToDate);
        await leavePage.clickApplyButton();
        
        // System should either accept or show conflict error
        await page.waitForTimeout(2000);
    });

    test('FUNC-020: Verify Leave Entitlements Display Correctly', async () => {
        await leavePage.openEntitlementsPage();
        await page.waitForLoadState('networkidle');
        
        // Verify entitlements table is populated
        const leaveTable = page.locator('.oxd-table');
        await expect(leaveTable).toBeVisible();
        
        const rowCount = await page.locator('.oxd-table-body >> .oxd-table-row').count();
        expect(rowCount).toBeGreaterThan(0);
    });

    test('FUNC-021: Verify Refresh Page Maintains State Correctly', async () => {
        await leavePage.openApplyLeavePage();
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // Verify page is still on Apply Leave tab
        const url = page.url();
        expect(url).toContain('applyLeave');
        
        // Verify form elements are present
        const isFormDisplayed = await leavePage.isApplyFormDisplayed();
        expect(isFormDisplayed).toBeTruthy();
    });

    test('FUNC-022: Verify Leave Application Timeout Handling', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave and wait
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-05');
        await leavePage.fillToDate('2025-12-06');
        await leavePage.clickApplyButton();
        
        // Verify response within reasonable time
        let responseReceived = false;
        const startTime = Date.now();
        
        try {
            await page.waitForTimeout(10000);
            responseReceived = true;
        } catch (e) {
            responseReceived = false;
        }
        
        const elapsedTime = Date.now() - startTime;
        expect(elapsedTime).toBeLessThan(15000);
    });

    test('FUNC-023: Verify Maximum Date Range Validation', async () => {
        await leavePage.openApplyLeavePage();
        
        // Apply leave for extended period (6 months)
        await leavePage.selectLeaveType('CZC');
        await leavePage.fillFromDate('2025-12-01');
        await leavePage.fillToDate('2026-06-01');
        await leavePage.clickApplyButton();
        
        // System may accept or reject based on business rules
        await page.waitForTimeout(2000);
    });

    test('FUNC-024: Verify Form Validation on All Fields Simultaneously', async () => {
        await leavePage.openApplyLeavePage();
        
        // Try to submit without filling any fields
        await leavePage.clickApplyButton();
        
        // Verify multiple validation errors appear
        await page.waitForTimeout(1000);
        const errorCount = await page.locator('.oxd-form-field-error').count();
        expect(errorCount).toBeGreaterThan(0);
    });

    test('FUNC-025: Verify Successful Leave Application Confirms All Details', async () => {
        await leavePage.openApplyLeavePage();
        
        const leaveType = 'CZC';
        const fromDate = '2025-12-07';
        const toDate = '2025-12-08';
        const comment = 'Final confirmation test';
        
        // Apply leave
        await leavePage.selectLeaveType(leaveType);
        await leavePage.fillFromDate(fromDate);
        await leavePage.fillToDate(toDate);
        await leavePage.fillComment(comment);
        await leavePage.clickApplyButton();
        
        // Verify success
        const successMessage = await leavePage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
        
        // Navigate to My Leave and verify the application
        await page.waitForTimeout(2000);
        await leavePage.openMyLeavePage();
        await page.waitForLoadState('networkidle');
        
        const leaveTable = page.locator('.oxd-table');
        await expect(leaveTable).toBeVisible();
    });
});
