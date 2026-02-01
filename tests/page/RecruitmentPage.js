// Page Object for Recruitment Module
export class RecruitmentPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.recruitmentMenu = 'a[href="#/recruitment"]';
        this.jobsTab = 'a[href="#/recruitment/jobs"]';
        this.candidatesTab = 'a[href="#/recruitment/candidates"]';
        this.vacanciesTab = 'a[href="#/recruitment/vacancies"]';
        
        // Job Section
        this.addJobButton = 'button:has-text("Add")';
        this.jobTitleInput = 'input[name="jobTitle"]';
        this.jobDescriptionInput = 'textarea[placeholder*="Description"]';
        this.jobSpecificationInput = 'textarea[placeholder*="Specification"]';
        this.hiringManagerDropdown = '.oxd-select-text-input';
        this.numberOfPositionsInput = 'input[type="number"]';
        this.activeToggle = 'input[type="checkbox"]';
        this.saveButton = 'button[type="submit"]';
        this.cancelButton = 'button:has-text("Cancel")';
        
        // Candidates Section
        this.firstNameInput = 'input[placeholder="First Name"]';
        this.middleNameInput = 'input[placeholder="Middle Name"]';
        this.lastNameInput = 'input[placeholder="Last Name"]';
        this.emailInput = 'input[type="email"]';
        this.phoneInput = 'input[type="text"][placeholder*="Phone"]';
        this.jobTitleFilterDropdown = '(//div[@class="oxd-select-text-input"])[1]';
        this.candidateStatusFilter = '(//div[@class="oxd-select-text-input"])[2]';
        this.sourceFilter = '(//div[@class="oxd-select-text-input"])[3]';
        
        // Vacancy Management
        this.vacancyNameInput = 'input[placeholder="Vacancy Name"]';
        this.vacancyJobTitleDropdown = '.oxd-select-text-input';
        this.numberOfPositionsField = 'input[type="number"]';
        this.hireDateInput = '(//input[@placeholder="yyyy-mm-dd"])[1]';
        this.salaryFromInput = 'input[placeholder="From"]';
        this.salaryToInput = 'input[placeholder="To"]';
        this.currencyDropdown = '(//div[@class="oxd-select-text-input"])[last()]';
        
        // File Upload
        this.fileUploadInput = 'input[type="file"]';
        this.attachmentLabel = 'label:has-text("Attachment")';
        
        // Table Elements
        this.dataTable = '.oxd-table';
        this.tableRows = '.oxd-table-body >> .oxd-table-row';
        this.tableCell = '.oxd-table-cell';
        this.editButton = 'button[class*="edit"]';
        this.deleteButton = 'button[class*="delete"]';
        this.viewButton = 'button:has-text("View")';
        this.deleteConfirmButton = 'button:has-text("Yes, Delete")';
        
        // Search and Filter
        this.searchButton = 'button:has-text("Search")';
        this.resetButton = 'button:has-text("Reset")';
        this.searchInputField = 'input[placeholder="Search"]';
        
        // Messages
        this.successMessage = '.oxd-toast-content';
        this.errorMessage = '.oxd-text--toast-message';
        this.requiredFieldError = '.oxd-form-field-error';
        this.formFieldError = '.oxd-input--error';
        
        // Modals and Dialogs
        this.modalDialog = '.oxd-dialog';
        this.modalTitle = '.oxd-dialog-title';
        this.modalCloseButton = 'button[class*="--cancel"]';
        this.confirmDialog = '.orangehrm-dialog';
        
        // Interview Section
        this.interviewDateInput = '(//input[@placeholder="yyyy-mm-dd"])[1]';
        this.interviewerInput = 'input[placeholder="Type for hints..."]';
        this.interviewNotesInput = 'textarea';
        this.interviewOutcomeDropdown = '.oxd-select-text-input';
        
        // Common Elements
        this.breadcrumb = '.oxd-text-page-title';
        this.pageTitle = 'h2';
        this.noDataMessage = '.oxd-empty-state';
    }

    async navigateToRecruitment() {
        await this.page.click(this.recruitmentMenu);
    }

    async openJobsTab() {
        await this.page.click(this.jobsTab);
    }

    async openCandidatesTab() {
        await this.page.click(this.candidatesTab);
    }

    async openVacanciesTab() {
        await this.page.click(this.vacanciesTab);
    }

    // Job Management Methods
    async clickAddJob() {
        await this.page.click(this.addJobButton);
    }

    async enterJobTitle(title) {
        await this.page.fill(this.jobTitleInput, title);
    }

    async enterJobDescription(description) {
        await this.page.fill(this.jobDescriptionInput, description);
    }

    async enterJobSpecification(specification) {
        await this.page.fill(this.jobSpecificationInput, specification);
    }

    async selectHiringManager(managerName) {
        await this.page.locator(this.hiringManagerDropdown).first().click();
        await this.page.click(`//span[text()="${managerName}"]`);
    }

    async enterNumberOfPositions(count) {
        await this.page.fill(this.numberOfPositionsInput, count.toString());
    }

    async toggleActiveStatus() {
        await this.page.click(this.activeToggle);
    }

    async isActiveStatusChecked() {
        return await this.page.isChecked(this.activeToggle);
    }

    async clickSaveButton() {
        await this.page.click(this.saveButton);
    }

    async clickCancelButton() {
        await this.page.click(this.cancelButton);
    }

    // Candidate Management Methods
    async enterFirstName(firstName) {
        await this.page.fill(this.firstNameInput, firstName);
    }

    async enterMiddleName(middleName) {
        await this.page.fill(this.middleNameInput, middleName);
    }

    async enterLastName(lastName) {
        await this.page.fill(this.lastNameInput, lastName);
    }

    async enterEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async enterPhone(phone) {
        await this.page.fill(this.phoneInput, phone);
    }

    async selectJobTitleForCandidate(jobTitle) {
        await this.page.locator(this.jobTitleFilterDropdown).first().click();
        await this.page.click(`//span[text()="${jobTitle}"]`);
    }

    async uploadResumeFile(filePath) {
        await this.page.locator(this.fileUploadInput).first().setInputFiles(filePath);
    }

    // Vacancy Management Methods
    async enterVacancyName(vacancyName) {
        await this.page.fill(this.vacancyNameInput, vacancyName);
    }

    async selectVacancyJobTitle(jobTitle) {
        await this.page.locator(this.vacancyJobTitleDropdown).first().click();
        await this.page.click(`//span[text()="${jobTitle}"]`);
    }

    async enterVacancyPositions(count) {
        await this.page.fill(this.numberOfPositionsField, count.toString());
    }

    async enterHireDate(date) {
        await this.page.fill(this.hireDateInput, date);
    }

    async enterSalaryRange(salaryFrom, salaryTo) {
        await this.page.fill(this.salaryFromInput, salaryFrom);
        await this.page.fill(this.salaryToInput, salaryTo);
    }

    async selectCurrency(currency) {
        await this.page.locator(this.currencyDropdown).click();
        await this.page.click(`//span[text()="${currency}"]`);
    }

    // Search and Filter Methods
    async filterByJobTitle(jobTitle) {
        await this.page.locator(this.jobTitleFilterDropdown).first().click();
        await this.page.click(`//span[text()="${jobTitle}"]`);
    }

    async filterByCandidateStatus(status) {
        await this.page.locator(this.candidateStatusFilter).click();
        const statusOptions = {
            'Application Initiated': 'Application Initiated',
            'Shortlisted': 'Shortlisted',
            'Interview': 'Interview',
            'Offered': 'Offered',
            'Rejected': 'Rejected',
            'Hired': 'Hired'
        };
        await this.page.click(`//span[text()="${statusOptions[status]}"]`);
    }

    async filterBySource(source) {
        await this.page.locator(this.sourceFilter).click();
        await this.page.click(`//span[text()="${source}"]`);
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
    async getTableRowCount() {
        return await this.page.locator(this.tableRows).count();
    }

    async getTableCellText(rowIndex, cellIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        const cell = await row.locator(this.tableCell).nth(cellIndex);
        return await cell.textContent();
    }

    async clickTableRow(rowIndex) {
        await this.page.locator(this.tableRows).nth(rowIndex).click();
    }

    async clickEditButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.editButton).click();
    }

    async clickDeleteButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.deleteButton).click();
    }

    async clickViewButton(rowIndex) {
        const row = await this.page.locator(this.tableRows).nth(rowIndex);
        await row.locator(this.viewButton).click();
    }

    async confirmDelete() {
        await this.page.click(this.deleteConfirmButton);
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

    // Page Status Checks
    async isJobsTableDisplayed() {
        return await this.page.isVisible(this.dataTable);
    }

    async isCandidatesTableDisplayed() {
        return await this.page.isVisible(this.dataTable);
    }

    async isVacanciesTableDisplayed() {
        return await this.page.isVisible(this.dataTable);
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

    async clearJobTitleInput() {
        await this.page.locator(this.jobTitleInput).clear();
    }

    async clearFirstNameInput() {
        await this.page.locator(this.firstNameInput).clear();
    }

    async clearLastNameInput() {
        await this.page.locator(this.lastNameInput).clear();
    }

    async clearEmailInput() {
        await this.page.locator(this.emailInput).clear();
    }

    async getJobTitleValue() {
        return await this.page.inputValue(this.jobTitleInput);
    }

    async getFirstNameValue() {
        return await this.page.inputValue(this.firstNameInput);
    }

    async getLastNameValue() {
        return await this.page.inputValue(this.lastNameInput);
    }

    async getEmailValue() {
        return await this.page.inputValue(this.emailInput);
    }

    // Navigation Verification
    async getCurrentUrl() {
        return this.page.url();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async isRecruitmentMenuVisible() {
        return await this.page.isVisible(this.recruitmentMenu);
    }

    // Interview Management
    async enterInterviewDate(date) {
        await this.page.fill(this.interviewDateInput, date);
    }

    async enterInterviewer(interviewerName) {
        await this.page.fill(this.interviewerInput, interviewerName);
    }

    async selectInterviewerFromDropdown(interviewerName) {
        await this.page.click(this.interviewerInput);
        await this.page.click(`//span[text()="${interviewerName}"]`);
    }

    async enterInterviewNotes(notes) {
        await this.page.fill(this.interviewNotesInput, notes);
    }

    async selectInterviewOutcome(outcome) {
        await this.page.locator(this.interviewOutcomeDropdown).last().click();
        await this.page.click(`//span[text()="${outcome}"]`);
    }

    // Advanced Operations
    async createNewJob(jobTitle, description, specification) {
        await this.clickAddJob();
        await this.enterJobTitle(jobTitle);
        await this.enterJobDescription(description);
        await this.enterJobSpecification(specification);
        await this.clickSaveButton();
    }

    async createNewCandidate(firstName, lastName, email, phone, jobTitle) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPhone(phone);
        await this.selectJobTitleForCandidate(jobTitle);
        await this.clickSaveButton();
    }

    async createNewVacancy(vacancyName, jobTitle, positions, hireDate) {
        await this.enterVacancyName(vacancyName);
        await this.selectVacancyJobTitle(jobTitle);
        await this.enterVacancyPositions(positions);
        await this.enterHireDate(hireDate);
        await this.clickSaveButton();
    }

    async searchAndFilter(filterType, filterValue) {
        if (filterType === 'jobTitle') {
            await this.filterByJobTitle(filterValue);
        } else if (filterType === 'status') {
            await this.filterByCandidateStatus(filterValue);
        } else if (filterType === 'source') {
            await this.filterBySource(filterValue);
        }
        await this.clickSearchButton();
    }

    async getFirstRowData() {
        if (await this.getTableRowCount() > 0) {
            return await this.getTableCellText(0, 0);
        }
        return null;
    }

    async refreshPage() {
        await this.page.reload();
        await this.waitForPageLoad();
    }
}
