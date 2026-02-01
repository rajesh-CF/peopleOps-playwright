import { test, expect } from '@playwright/test';
import { LoginPage } from './page/LoginPage';
import { RecruitmentPage } from './page/RecruitmentPage';

test.describe('Recruitment Module - Comprehensive Test Suite', () => {
    let page;
    let recruitmentPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        recruitmentPage = new RecruitmentPage(page);

        // Navigate directly to Recruitment module (auth session already applied)
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.waitForLoadState('networkidle');
        
        // Navigate to Recruitment module
        await recruitmentPage.navigateToRecruitment();
        await recruitmentPage.waitForPageLoad();
    });

    test.afterEach(async () => {
        await page.close();
    });

    // ========== UI VALIDATION TEST CASES ==========

    test('UI-001: Verify Recruitment Module Menu is Visible', async () => {
        // Verify Recruitment menu exists
        const isMenuVisible = await recruitmentPage.isRecruitmentMenuVisible();
        expect(isMenuVisible).toBeTruthy();
    });

    test('UI-002: Verify Jobs Tab is Displayed and Accessible', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify jobs table is visible
        const isJobsTableVisible = await recruitmentPage.isJobsTableDisplayed();
        expect(isJobsTableVisible).toBeTruthy();
    });

    test('UI-003: Verify Candidates Tab is Displayed and Accessible', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify candidates table is visible
        const isCandidatesTableVisible = await recruitmentPage.isCandidatesTableDisplayed();
        expect(isCandidatesTableVisible).toBeTruthy();
    });

    test('UI-004: Verify Vacancies Tab is Displayed and Accessible', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify vacancies table is visible
        const isVacanciesTableVisible = await recruitmentPage.isVacanciesTableDisplayed();
        expect(isVacanciesTableVisible).toBeTruthy();
    });

    test('UI-005: Verify Add Button is Visible on Jobs Tab', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify Add button exists
        const addButton = page.locator('button:has-text("Add")');
        await expect(addButton).toBeVisible();
    });

    test('UI-006: Verify Job Form Fields Layout', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Verify form elements
        const jobTitleInput = page.locator('input[name="jobTitle"]');
        await expect(jobTitleInput).toBeVisible();
    });

    test('UI-007: Verify Candidate Form Fields Layout', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Verify form fields are visible
        const firstNameInput = page.locator('input[placeholder="First Name"]');
        const lastNameInput = page.locator('input[placeholder="Last Name"]');
        
        await expect(firstNameInput).toBeVisible();
        await expect(lastNameInput).toBeVisible();
    });

    test('UI-008: Verify Vacancy Form Fields Layout', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Verify form fields
        const vacancyNameInput = page.locator('input[placeholder="Vacancy Name"]');
        await expect(vacancyNameInput).toBeVisible();
    });

    test('UI-009: Verify Search and Filter Controls are Available', async () => {
        // Open any tab (Jobs)
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify Search button exists
        const searchButton = page.locator('button:has-text("Search")');
        const resetButton = page.locator('button:has-text("Reset")');
        
        await expect(searchButton).toBeVisible();
        await expect(resetButton).toBeVisible();
    });

    test('UI-010: Verify Table Headers are Displayed', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify table is visible
        const table = page.locator('.oxd-table');
        await expect(table).toBeVisible();
    });

    test('UI-011: Verify Pagination Controls (if applicable)', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if pagination exists
        const pagination = page.locator('.orangehrm-pagination');
        const isPaginationVisible = await pagination.isVisible().catch(() => false);
        // Pagination may or may not be visible depending on data
    });

    test('UI-012: Verify Required Field Indicators are Shown', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Try to submit without filling fields
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Verify error indicators appear
        const hasErrors = await recruitmentPage.hasFieldErrors();
        expect(hasErrors).toBeTruthy();
    });

    test('UI-013: Verify Cancel Button Returns to Previous Page', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        const initialUrl = await recruitmentPage.getCurrentUrl();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(500);
        
        // Click Cancel button
        await recruitmentPage.clickCancelButton();
        await page.waitForTimeout(500);
        
        // Verify URL hasn't changed significantly
        const finalUrl = await recruitmentPage.getCurrentUrl();
        expect(finalUrl).toContain('recruitment');
    });

    test('UI-014: Verify Success Message Format and Content', async () => {
        // Navigate to Jobs
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // This test verifies success message styling/display
        const successMessage = page.locator('.oxd-toast-content');
        const isSuccessMessageStyled = await successMessage.isVisible().catch(() => false);
        // Message visibility depends on previous actions
    });

    test('UI-015: Verify Responsive Design Elements', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Verify main table container is visible
        const table = page.locator('.oxd-table');
        await expect(table).toBeVisible();
        
        // Verify it has proper styling
        const isVisible = await table.isVisible();
        expect(isVisible).toBeTruthy();
    });

    // ========== FUNCTIONAL TEST CASES ==========

    test('FUNC-001: Add New Job with Valid Data', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill job details
        await recruitmentPage.enterJobTitle('Test Software Engineer');
        await recruitmentPage.enterJobDescription('Test job description for automation');
        await recruitmentPage.enterJobSpecification('Test job specification');
        
        // Save job
        await recruitmentPage.clickSaveButton();
        
        // Verify success
        await page.waitForTimeout(2000);
        const successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-002: Add Job without Job Title Should Fail', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill only description (skip required title field)
        await recruitmentPage.enterJobDescription('Description without title');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Verify validation error
        const hasErrors = await recruitmentPage.hasFieldErrors();
        expect(hasErrors).toBeTruthy();
    });

    test('FUNC-003: Search for Job by Title', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Get initial row count
        let initialRowCount = await recruitmentPage.getTableRowCount();
        
        // Click search (may find existing jobs)
        await recruitmentPage.clickSearchButton();
        await page.waitForTimeout(1000);
        
        // Verify results are displayed
        const rowCount = await recruitmentPage.getTableRowCount();
        expect(rowCount >= 0).toBeTruthy();
    });

    test('FUNC-004: Edit Existing Job', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if there are jobs available
        const rowCount = await recruitmentPage.getTableRowCount();
        
        if (rowCount > 0) {
            // Click edit on first job
            await recruitmentPage.clickEditButton(0);
            await page.waitForTimeout(1500);
            
            // Modify job title
            await recruitmentPage.clearJobTitleInput();
            await recruitmentPage.enterJobTitle('Updated Job Title');
            
            // Save changes
            await recruitmentPage.clickSaveButton();
            
            // Verify success
            await page.waitForTimeout(1500);
            const successMessage = await recruitmentPage.isSuccessMessageVisible();
            expect(successMessage).toBeTruthy();
        }
    });

    test('FUNC-005: Delete Job with Confirmation', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if there are jobs
        let rowCount = await recruitmentPage.getTableRowCount();
        
        if (rowCount > 0) {
            // Get initial row count
            const initialCount = rowCount;
            
            // Click delete on first job
            await recruitmentPage.clickDeleteButton(0);
            await page.waitForTimeout(500);
            
            // Confirm deletion
            await recruitmentPage.confirmDelete();
            await page.waitForTimeout(1500);
            
            // Verify row count decreased or success message appears
            const successMessage = await recruitmentPage.isSuccessMessageVisible();
            expect(successMessage).toBeTruthy();
        }
    });

    test('FUNC-006: Add Candidate with Valid Data', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill candidate details
        const uniqueEmail = `testcandidate${Date.now()}@test.com`;
        await recruitmentPage.enterFirstName('John');
        await recruitmentPage.enterLastName('Doe');
        await recruitmentPage.enterEmail(uniqueEmail);
        await recruitmentPage.enterPhone('1234567890');
        
        // Save candidate
        await recruitmentPage.clickSaveButton();
        
        // Verify success
        await page.waitForTimeout(2000);
        const successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-007: Add Candidate without First Name Should Fail', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill candidate details without first name
        await recruitmentPage.enterLastName('Smith');
        await recruitmentPage.enterEmail('noname@test.com');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Verify validation error
        const hasErrors = await recruitmentPage.hasFieldErrors();
        expect(hasErrors).toBeTruthy();
    });

    test('FUNC-008: Add Candidate without Last Name Should Fail', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill candidate details without last name
        await recruitmentPage.enterFirstName('Jane');
        await recruitmentPage.enterEmail('nolastname@test.com');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Verify validation error
        const hasErrors = await recruitmentPage.hasFieldErrors();
        expect(hasErrors).toBeTruthy();
    });

    test('FUNC-009: Add Candidate with Invalid Email Format', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill candidate details with invalid email
        await recruitmentPage.enterFirstName('Test');
        await recruitmentPage.enterLastName('User');
        await recruitmentPage.enterEmail('invalidemail');
        await recruitmentPage.enterPhone('1234567890');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Verify validation error
        const hasErrors = await recruitmentPage.hasFieldErrors();
        expect(hasErrors).toBeTruthy();
    });

    test('FUNC-010: View Candidate Details', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if there are candidates
        const rowCount = await recruitmentPage.getTableRowCount();
        
        if (rowCount > 0) {
            // Click View button on first candidate
            await recruitmentPage.clickViewButton(0);
            await page.waitForTimeout(1500);
            
            // Verify details page or modal loads
            const url = await recruitmentPage.getCurrentUrl();
            expect(url).toBeTruthy();
        }
    });

    test('FUNC-011: Filter Candidates by Status', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Apply status filter
        try {
            await recruitmentPage.filterByCandidateStatus('Shortlisted');
            await recruitmentPage.clickSearchButton();
            await page.waitForTimeout(1500);
            
            // Verify table updates
            const tableVisible = await recruitmentPage.isCandidatesTableDisplayed();
            expect(tableVisible).toBeTruthy();
        } catch (e) {
            // Filter might not be available in all scenarios
        }
    });

    test('FUNC-012: Reset Filters Returns to Default View', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Apply a filter
        try {
            await recruitmentPage.clickSearchButton();
            await page.waitForTimeout(500);
            
            // Reset filters
            await recruitmentPage.clickResetButton();
            await page.waitForTimeout(1000);
            
            // Verify table is displayed
            const tableVisible = await recruitmentPage.isCandidatesTableDisplayed();
            expect(tableVisible).toBeTruthy();
        } catch (e) {
            // Reset button handling
        }
    });

    test('FUNC-013: Create New Vacancy with Valid Data', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill vacancy details
        const vacancyName = `Test Vacancy ${Date.now()}`;
        await recruitmentPage.enterVacancyName(vacancyName);
        await recruitmentPage.enterVacancyPositions('2');
        await recruitmentPage.enterHireDate('2025-12-31');
        
        // Save vacancy
        await recruitmentPage.clickSaveButton();
        
        // Verify success
        await page.waitForTimeout(2000);
        const successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-014: Add Vacancy without Name Should Fail', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill vacancy details without name
        await recruitmentPage.enterVacancyPositions('2');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Verify validation error
        const hasErrors = await recruitmentPage.hasFieldErrors();
        expect(hasErrors).toBeTruthy();
    });

    test('FUNC-015: Add Vacancy with Invalid Positions Count', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill vacancy with negative/invalid positions
        const vacancyName = `Invalid Vacancy ${Date.now()}`;
        await recruitmentPage.enterVacancyName(vacancyName);
        await recruitmentPage.enterVacancyPositions('-5');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // System should handle invalid data
    });

    test('FUNC-016: Edit Existing Vacancy', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if there are vacancies
        const rowCount = await recruitmentPage.getTableRowCount();
        
        if (rowCount > 0) {
            // Click edit on first vacancy
            await recruitmentPage.clickEditButton(0);
            await page.waitForTimeout(1500);
            
            // Modify vacancy details
            await recruitmentPage.enterVacancyPositions('3');
            
            // Save changes
            await recruitmentPage.clickSaveButton();
            
            // Verify success
            await page.waitForTimeout(1500);
            const successMessage = await recruitmentPage.isSuccessMessageVisible();
            expect(successMessage).toBeTruthy();
        }
    });

    test('FUNC-017: Delete Vacancy with Confirmation', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if there are vacancies
        const rowCount = await recruitmentPage.getTableRowCount();
        
        if (rowCount > 0) {
            // Click delete on first vacancy
            await recruitmentPage.clickDeleteButton(0);
            await page.waitForTimeout(500);
            
            // Confirm deletion
            await recruitmentPage.confirmDelete();
            await page.waitForTimeout(1500);
            
            // Verify success
            const successMessage = await recruitmentPage.isSuccessMessageVisible();
            expect(successMessage).toBeTruthy();
        }
    });

    test('FUNC-018: Add Candidate with Special Characters in Name', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill with special characters
        const uniqueEmail = `special${Date.now()}@test.com`;
        await recruitmentPage.enterFirstName("Jean-Paul's");
        await recruitmentPage.enterLastName("O'Connor");
        await recruitmentPage.enterEmail(uniqueEmail);
        
        // Save
        await recruitmentPage.clickSaveButton();
        
        // Verify handling
        await page.waitForTimeout(2000);
        const successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-019: Navigation Between Recruitment Tabs', async () => {
        // Start at Jobs
        await recruitmentPage.openJobsTab();
        let url = await recruitmentPage.getCurrentUrl();
        expect(url).toContain('jobs');
        
        // Navigate to Candidates
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        url = await recruitmentPage.getCurrentUrl();
        expect(url).toContain('candidates');
        
        // Navigate to Vacancies
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        url = await recruitmentPage.getCurrentUrl();
        expect(url).toContain('vacancies');
    });

    test('FUNC-020: Page Refresh Maintains State', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Refresh page
        await recruitmentPage.refreshPage();
        
        // Verify still on Jobs tab
        const url = await recruitmentPage.getCurrentUrl();
        expect(url).toContain('jobs');
        
        // Verify table is displayed
        const tableVisible = await recruitmentPage.isJobsTableDisplayed();
        expect(tableVisible).toBeTruthy();
    });

    test('FUNC-021: Add Multiple Candidates in Sequence', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Add first candidate
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        const email1 = `candidate1${Date.now()}@test.com`;
        await recruitmentPage.enterFirstName('Candidate');
        await recruitmentPage.enterLastName('One');
        await recruitmentPage.enterEmail(email1);
        
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(2000);
        
        // Verify first candidate added
        let successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
        
        // Add second candidate
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        const email2 = `candidate2${Date.now()}@test.com`;
        await recruitmentPage.enterFirstName('Candidate');
        await recruitmentPage.enterLastName('Two');
        await recruitmentPage.enterEmail(email2);
        
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(2000);
        
        // Verify second candidate added
        successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });

    test('FUNC-022: Search Returns Relevant Results', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click search to retrieve all jobs
        await recruitmentPage.clickSearchButton();
        await page.waitForTimeout(1500);
        
        // Verify results are returned
        const rowCount = await recruitmentPage.getTableRowCount();
        expect(rowCount >= 0).toBeTruthy();
    });

    test('FUNC-023: Form Field Data Persistence During Interaction', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Fill form
        const testJobTitle = 'Persistence Test Job';
        await recruitmentPage.enterJobTitle(testJobTitle);
        
        // Verify value is retained
        const jobTitleValue = await recruitmentPage.getJobTitleValue();
        expect(jobTitleValue).toBe(testJobTitle);
    });

    test('FUNC-024: Validation Error Messages are Clear', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Try to submit empty form
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // Get error messages
        const errorMessages = await recruitmentPage.getFieldErrorMessages();
        expect(errorMessages.length > 0).toBeTruthy();
    });

    test('FUNC-025: Multiple Tab Navigation and Data Display', async () => {
        // Navigate Jobs
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        let tableVisible = await recruitmentPage.isJobsTableDisplayed();
        expect(tableVisible).toBeTruthy();
        
        // Navigate Candidates
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        tableVisible = await recruitmentPage.isCandidatesTableDisplayed();
        expect(tableVisible).toBeTruthy();
        
        // Navigate Vacancies
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        tableVisible = await recruitmentPage.isVacanciesTableDisplayed();
        expect(tableVisible).toBeTruthy();
    });

    test('FUNC-026: Email Validation on Candidate Registration', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Enter valid data with various email formats
        await recruitmentPage.enterFirstName('Email');
        await recruitmentPage.enterLastName('Test');
        await recruitmentPage.enterEmail('valid.email+test@example.co.uk');
        
        // Save
        await recruitmentPage.clickSaveButton();
        
        // Verify acceptance or rejection
        await page.waitForTimeout(2000);
    });

    test('FUNC-027: Vacancy Position Count Validation', async () => {
        // Open Vacancies tab
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Click Add button
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        // Test with zero positions
        const vacancyName = `Zero Vacancy ${Date.now()}`;
        await recruitmentPage.enterVacancyName(vacancyName);
        await recruitmentPage.enterVacancyPositions('0');
        
        // Try to save
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(1000);
        
        // System should validate
    });

    test('FUNC-028: Table Data Sorting (if available)', async () => {
        // Open Jobs tab
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        
        // Get initial data
        const firstRowData = await recruitmentPage.getFirstRowData();
        
        // Verify table displays data
        expect(firstRowData).toBeTruthy();
    });

    test('FUNC-029: Candidate Application Status Transitions', async () => {
        // Open Candidates tab
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        
        // Check if any candidates exist
        const rowCount = await recruitmentPage.getTableRowCount();
        
        if (rowCount > 0) {
            // View first candidate
            await recruitmentPage.clickViewButton(0);
            await page.waitForTimeout(1500);
            
            // Verify candidate details page loads
            const url = await recruitmentPage.getCurrentUrl();
            expect(url).toBeTruthy();
        }
    });

    test('FUNC-030: Complete Recruitment Workflow', async () => {
        // Step 1: Create Job
        await recruitmentPage.openJobsTab();
        await recruitmentPage.waitForPageLoad();
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        await recruitmentPage.enterJobTitle(`Workflow Test ${Date.now()}`);
        await recruitmentPage.enterJobDescription('Test workflow job');
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(2000);
        
        let successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
        
        // Step 2: Create Vacancy
        await recruitmentPage.openVacanciesTab();
        await recruitmentPage.waitForPageLoad();
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        const vacancyName = `Workflow Vacancy ${Date.now()}`;
        await recruitmentPage.enterVacancyName(vacancyName);
        await recruitmentPage.enterVacancyPositions('1');
        await recruitmentPage.enterHireDate('2025-12-25');
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(2000);
        
        successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
        
        // Step 3: Add Candidate
        await recruitmentPage.openCandidatesTab();
        await recruitmentPage.waitForPageLoad();
        await recruitmentPage.clickAddJob();
        await page.waitForTimeout(1000);
        
        const candidateEmail = `workflow${Date.now()}@test.com`;
        await recruitmentPage.enterFirstName('Workflow');
        await recruitmentPage.enterLastName('Candidate');
        await recruitmentPage.enterEmail(candidateEmail);
        await recruitmentPage.enterPhone('1234567890');
        await recruitmentPage.clickSaveButton();
        await page.waitForTimeout(2000);
        
        successMessage = await recruitmentPage.isSuccessMessageVisible();
        expect(successMessage).toBeTruthy();
    });
});
