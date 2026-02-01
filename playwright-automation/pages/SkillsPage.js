const { BasePage } = require('./BasePage');

/**
 * Skills Page Object Model
 * Handles employee skill management operations
 */
class SkillsPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Initialize skill form locators
    this.skillNameInput = page.locator('input[name="skillName"], input[id="skillName"], select[name="skill"]');
    this.proficiencyInput = page.locator('input[name="proficiency"], input[id="proficiency"], select[name="proficiency"]');
    this.experienceYearsInput = page.locator('input[name="experience"], input[id="experience"], input[name="yearsOfExperience"]');
    this.lastUsedDateInput = page.locator('input[name="lastUsedDate"], input[id="lastUsedDate"]');
    this.addSkillButton = page.locator('button:has-text("Add Skill"), button:has-text("+ Skill")');
    this.saveSkillButton = page.locator('button:has-text("Save"), button[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    
    // Initialize table locators
    this.skillsTable = page.locator('table.skills-table, .skills-list, [data-testid="skills-table"]');
    this.skillSearchInput = page.locator('input[placeholder*="Search skill"]');
    
    // Initialize messages
    this.successMessage = page.locator('.success, .alert-success, [role="alert"]:has-text("success")');
    this.errorMessage = page.locator('.error, .alert-error, .alert-danger, [role="alert"]:has-text("error")');
    this.validationError = page.locator('.validation-error, .field-error, .invalid-feedback');
    this.warningMessage = page.locator('.warning, .alert-warning');
    
    // Initialize freshness evaluation locators
    this.evaluateFreshnessButton = page.locator('button:has-text("Evaluate"), button:has-text("Freshness Check")');
    this.rustySkillsIndicator = page.locator('.rusty-skill, [data-status="rusty"], .skill-warning');
    this.freshnessOverrideInput = page.locator('input[name="freshnessOverride"], input[id="freshnessOverride"]');
  }

  /**
   * Navigate to employee skills page
   */
  async navigateToSkillsPage(employeeCode) {
    await this.navigate(`/employees/${employeeCode}/skills`);
    await this.waitForPageLoad();
  }

  /**
   * Click Add Skill button
   */
  async clickAddSkill() {
    await this.clickElement(this.addSkillButton);
  }

  /**
   * Fill skill name
   */
  async fillSkillName(skillName) {
    await this.fillInput(this.skillNameInput, skillName);
  }

  /**
   * Select skill name from dropdown (if dropdown)
   */
  async selectSkillName(skillName) {
    await this.selectDropdownByLabel(this.skillNameInput, skillName);
  }

  /**
   * Fill proficiency level (0-4)
   */
  async fillProficiency(proficiency) {
    await this.fillInput(this.proficiencyInput, proficiency);
  }

  /**
   * Select proficiency level from dropdown
   */
  async selectProficiency(proficiency) {
    await this.selectDropdownByValue(this.proficiencyInput, proficiency);
  }

  /**
   * Fill years of experience
   */
  async fillExperienceYears(years) {
    await this.fillInput(this.experienceYearsInput, years);
  }

  /**
   * Fill last used date
   */
  async fillLastUsedDate(date) {
    await this.fillInput(this.lastUsedDateInput, date);
  }

  /**
   * Click Save Skill button
   */
  async clickSaveSkill() {
    await this.clickElement(this.saveSkillButton);
  }

  /**
   * Add a single skill with all details
   */
  async addSkill(skillData) {
    await this.clickAddSkill();
    await this.fillSkillName(skillData.name);
    await this.fillProficiency(skillData.proficiency);
    await this.fillExperienceYears(skillData.experience);
    
    if (skillData.lastUsedDate) {
      await this.fillLastUsedDate(skillData.lastUsedDate);
    }
    
    await this.clickSaveSkill();
  }

  /**
   * Add multiple skills
   */
  async addMultipleSkills(skills) {
    for (const skill of skills) {
      await this.addSkill(skill);
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Update existing skill
   */
  async updateSkill(skillName, newData) {
    await this.clickEditSkillByName(skillName);
    
    if (newData.proficiency) {
      await this.fillProficiency(newData.proficiency);
    }
    
    if (newData.experience) {
      await this.fillExperienceYears(newData.experience);
    }
    
    if (newData.lastUsedDate) {
      await this.fillLastUsedDate(newData.lastUsedDate);
    }
    
    await this.clickSaveSkill();
  }

  /**
   * Click edit button for specific skill
   */
  async clickEditSkillByName(skillName) {
    const editButton = this.page.locator(`tr:has-text("${skillName}") button:has-text("Edit"), tr:has-text("${skillName}") [aria-label="Edit"]`);
    await this.clickElement(editButton);
  }

  /**
   * Delete skill
   */
  async deleteSkill(skillName) {
    const deleteButton = this.page.locator(`tr:has-text("${skillName}") button:has-text("Delete"), tr:has-text("${skillName}") [aria-label="Delete"]`);
    await this.clickElement(deleteButton);
  }

  /**
   * Check if skill exists in table
   */
  async isSkillInTable(skillName) {
    const skillRow = this.page.locator(`tr:has-text("${skillName}")`);
    return await skillRow.isVisible();
  }

  /**
   * Run skill freshness evaluation
   */
  async evaluateSkillFreshness() {
    await this.clickElement(this.evaluateFreshnessButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if skill is flagged as rusty
   */
  async isSkillFlaggedAsRusty(skillName) {
    const rustySkill = this.page.locator(`tr:has-text("${skillName}") .rusty-skill, tr:has-text("${skillName}") [data-status="rusty"]`);
    return await rustySkill.isVisible();
  }

  /**
   * Set freshness override threshold
   */
  async setFreshnessOverride(months) {
    await this.fillInput(this.freshnessOverrideInput, months);
  }

  /**
   * Get all rusty skills count
   */
  async getRustySkillsCount() {
    const rustySkills = await this.rustySkillsIndicator.count();
    return rustySkills;
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
   * Get error message text
   */
  async getErrorMessage() {
    return await this.getTextContent(this.errorMessage);
  }

  /**
   * Get validation error text
   */
  async getValidationError() {
    return await this.getTextContent(this.validationError);
  }

  /**
   * Get warning message text
   */
  async getWarningMessage() {
    return await this.getTextContent(this.warningMessage);
  }
}

module.exports = { SkillsPage };
