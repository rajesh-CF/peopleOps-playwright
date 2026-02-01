const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { SkillsPage } = require('../pages/SkillsPage');
const { TestDataGenerator } = require('../utils/TestDataGenerator');
const { TEST_USERS, PROFICIENCY_LEVELS } = require('../test-data/constants');

test.describe('Skills Management Tests', () => {
  let loginPage;
  let skillsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    skillsPage = new SkillsPage(page);
    
    // Login before each test
    await loginPage.navigate();
    await loginPage.login(TEST_USERS.admin.username, TEST_USERS.admin.password);
    await skillsPage.navigate();
  });

  test('TC_SKL_001: Add new skill with mandatory fields', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.intermediate,
      experience: '2 years'
    };
    
    await skillsPage.addSkill(skillData);
    
    // Verify success message
    const successMessage = await skillsPage.getSuccessMessage();
    expect(successMessage).toContain('successfully');
  });

  test('TC_SKL_002: Add skill with all fields', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.expert,
      experience: '5 years',
      certifications: 'AWS Certified',
      lastUsed: '2024-01-01'
    };
    
    await skillsPage.addSkill(skillData);
    
    // Verify success message
    const successMessage = await skillsPage.getSuccessMessage();
    expect(successMessage).toContain('successfully');
  });

  test('TC_SKL_003: Validate mandatory fields for skill', async () => {
    await skillsPage.clickAddSkillButton();
    await skillsPage.clickSaveButton();
    
    // Verify validation messages
    const validationMessages = await skillsPage.getAllValidationMessages();
    expect(validationMessages.length).toBeGreaterThan(0);
  });

  test('TC_SKL_004: Add multiple skills to employee', async () => {
    const skills = [
      {
        skillName: 'JavaScript',
        proficiency: PROFICIENCY_LEVELS.expert,
        experience: '5 years'
      },
      {
        skillName: 'Python',
        proficiency: PROFICIENCY_LEVELS.intermediate,
        experience: '3 years'
      },
      {
        skillName: 'SQL',
        proficiency: PROFICIENCY_LEVELS.advanced,
        experience: '4 years'
      }
    ];
    
    await skillsPage.addMultipleSkills(skills);
    
    // Verify all skills are added
    const skillCount = await skillsPage.getSkillCount();
    expect(skillCount).toBe(skills.length);
  });

  test('TC_SKL_005: Update existing skill proficiency', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.beginner,
      experience: '1 year'
    };
    
    // Add skill first
    await skillsPage.addSkill(skillData);
    
    // Update proficiency
    await skillsPage.updateSkillProficiency(skillData.skillName, PROFICIENCY_LEVELS.intermediate);
    
    // Verify update
    const successMessage = await skillsPage.getSuccessMessage();
    expect(successMessage).toContain('updated');
  });

  test('TC_SKL_006: Delete skill from employee', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.intermediate,
      experience: '2 years'
    };
    
    // Add skill first
    await skillsPage.addSkill(skillData);
    
    // Delete skill
    await skillsPage.deleteSkill(skillData.skillName);
    
    // Verify deletion
    const successMessage = await skillsPage.getSuccessMessage();
    expect(successMessage).toContain('deleted');
  });

  test('TC_SKL_007: Search skills by name', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.advanced,
      experience: '3 years'
    };
    
    // Add skill first
    await skillsPage.addSkill(skillData);
    
    // Search for skill
    await skillsPage.searchSkill(skillData.skillName);
    
    // Verify search results
    const searchResults = await skillsPage.getSearchResults();
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0]).toContain(skillData.skillName);
  });

  test('TC_SKL_008: Filter skills by proficiency level', async () => {
    // Add multiple skills with different proficiency
    const skills = [
      {
        skillName: 'Skill1',
        proficiency: PROFICIENCY_LEVELS.beginner,
        experience: '1 year'
      },
      {
        skillName: 'Skill2',
        proficiency: PROFICIENCY_LEVELS.expert,
        experience: '5 years'
      }
    ];
    
    await skillsPage.addMultipleSkills(skills);
    
    // Filter by expert level
    await skillsPage.filterByProficiency(PROFICIENCY_LEVELS.expert);
    
    // Verify filtered results
    const filteredResults = await skillsPage.getSearchResults();
    expect(filteredResults.length).toBeGreaterThan(0);
  });

  test('TC_SKL_009: Validate duplicate skill prevention', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.intermediate,
      experience: '2 years'
    };
    
    // Add skill first time
    await skillsPage.addSkill(skillData);
    
    // Try to add same skill again
    await skillsPage.addSkill(skillData);
    
    // Verify duplicate validation
    const errorMessage = await skillsPage.getErrorMessage();
    expect(errorMessage).toContain('already exists' || 'duplicate');
  });

  test('TC_SKL_010: Export skills list', async () => {
    // Verify export button is visible
    const isExportVisible = await skillsPage.isExportButtonVisible();
    expect(isExportVisible).toBeTruthy();
    
    // Click export
    await skillsPage.clickExportButton();
  });

  test('TC_SKL_011: Validate skill name format', async () => {
    const invalidSkillData = {
      skillName: '123',  // Invalid - only numbers
      proficiency: PROFICIENCY_LEVELS.beginner,
      experience: '1 year'
    };
    
    await skillsPage.clickAddSkillButton();
    await skillsPage.fillSkillForm(invalidSkillData);
    await skillsPage.clickSaveButton();
    
    // Verify validation
    const validationMessage = await skillsPage.getSkillNameValidation();
    expect(validationMessage).toBeTruthy();
  });

  test('TC_SKL_012: Validate experience format', async () => {
    const invalidSkillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.expert,
      experience: 'invalid'
    };
    
    await skillsPage.clickAddSkillButton();
    await skillsPage.fillSkillForm(invalidSkillData);
    await skillsPage.clickSaveButton();
    
    // Verify validation
    const validationMessage = await skillsPage.getExperienceValidation();
    expect(validationMessage).toBeTruthy();
  });

  test('TC_SKL_013: Sort skills by proficiency', async () => {
    // Add multiple skills
    const skills = [
      { skillName: 'SkillA', proficiency: PROFICIENCY_LEVELS.intermediate, experience: '2 years' },
      { skillName: 'SkillB', proficiency: PROFICIENCY_LEVELS.expert, experience: '5 years' },
      { skillName: 'SkillC', proficiency: PROFICIENCY_LEVELS.beginner, experience: '1 year' }
    ];
    
    await skillsPage.addMultipleSkills(skills);
    
    // Sort by proficiency
    await skillsPage.sortByProficiency();
    
    // Verify sort order
    const sortedSkills = await skillsPage.getAllSkills();
    expect(sortedSkills.length).toBe(skills.length);
  });

  test('TC_SKL_014: Bulk delete skills', async () => {
    // Add multiple skills
    const skills = [
      { skillName: 'Skill1', proficiency: PROFICIENCY_LEVELS.intermediate, experience: '2 years' },
      { skillName: 'Skill2', proficiency: PROFICIENCY_LEVELS.advanced, experience: '3 years' }
    ];
    
    await skillsPage.addMultipleSkills(skills);
    
    // Select all and delete
    await skillsPage.selectAllSkills();
    await skillsPage.bulkDelete();
    
    // Verify deletion
    const successMessage = await skillsPage.getSuccessMessage();
    expect(successMessage).toContain('deleted');
  });

  test('TC_SKL_015: Validate skill freshness indicator', async () => {
    const skillData = {
      skillName: TestDataGenerator.generateSkillName(),
      proficiency: PROFICIENCY_LEVELS.expert,
      experience: '5 years',
      lastUsed: '2020-01-01'  // Old date
    };
    
    await skillsPage.addSkill(skillData);
    
    // Check freshness indicator
    const freshnessStatus = await skillsPage.evaluateSkillFreshness(skillData.skillName);
    expect(freshnessStatus).toBeTruthy();
  });
});
