/**
 * Test Data Generator Utility
 * Generates random and realistic test data for employee management
 */

class TestDataGenerator {
  /**
   * Generate random employee code
   */
  static generateEmployeeCode() {
    const prefix = 'EMP';
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}${randomNum}`;
  }

  /**
   * Generate random first name
   */
  static generateFirstName() {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah',
      'Robert', 'Jennifer', 'William', 'Jessica', 'James', 'Lisa'
    ];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  /**
   * Generate random last name
   */
  static generateLastName() {
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia',
      'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez'
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  /**
   * Generate random email
   */
  static generateEmail(firstName, lastName) {
    const first = firstName || this.generateFirstName();
    const last = lastName || this.generateLastName();
    const domain = 'testcompany.com';
    return `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`;
  }

  /**
   * Generate date in YYYY-MM-DD format
   */
  static generateDate(daysOffset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
  }

  /**
   * Generate hire date (past date)
   */
  static generateHireDate(daysAgo = 365) {
    return this.generateDate(-daysAgo);
  }

  /**
   * Generate exit date (future date)
   */
  static generateExitDate(daysAhead = 30) {
    return this.generateDate(daysAhead);
  }

  /**
   * Generate random skill name
   */
  static generateSkillName() {
    const skills = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C#',
      'React', 'Angular', 'Vue.js', 'Node.js', 'Express',
      'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure',
      'Docker', 'Kubernetes', 'Jenkins', 'Git', 'Agile'
    ];
    return skills[Math.floor(Math.random() * skills.length)];
  }

  /**
   * Generate random proficiency level (0-4)
   */
  static generateProficiency() {
    return Math.floor(Math.random() * 5).toString();
  }

  /**
   * Generate random years of experience (0-20)
   */
  static generateExperienceYears() {
    return Math.floor(Math.random() * 21).toString();
  }

  /**
   * Generate random designation
   */
  static generateDesignation() {
    const designations = [
      'Software Engineer', 'Senior Software Engineer', 'Lead Engineer',
      'Technical Architect', 'QA Engineer', 'DevOps Engineer',
      'Product Manager', 'Project Manager', 'Business Analyst'
    ];
    return designations[Math.floor(Math.random() * designations.length)];
  }

  /**
   * Generate complete employee data
   */
  static generateEmployeeData() {
    const firstName = this.generateFirstName();
    const lastName = this.generateLastName();
    
    return {
      code: this.generateEmployeeCode(),
      firstName,
      lastName,
      email: this.generateEmail(firstName, lastName),
      hireDate: this.generateHireDate(),
      status: 'Active',
      internalDesignation: this.generateDesignation(),
      billingDesignation: this.generateDesignation(),
    };
  }

  /**
   * Generate complete skill data
   */
  static generateSkillData() {
    return {
      name: this.generateSkillName(),
      proficiency: this.generateProficiency(),
      experience: this.generateExperienceYears(),
      lastUsedDate: this.generateDate(-30),
    };
  }

  /**
   * Generate multiple unique skill data
   */
  static generateMultipleSkills(count) {
    const skills = new Set();
    const skillsArray = [];
    
    while (skills.size < count) {
      const skillName = this.generateSkillName();
      if (!skills.has(skillName)) {
        skills.add(skillName);
        skillsArray.push({
          name: skillName,
          proficiency: this.generateProficiency(),
          experience: this.generateExperienceYears(),
          lastUsedDate: this.generateDate(-Math.floor(Math.random() * 365)),
        });
      }
    }
    
    return skillsArray;
  }
}

module.exports = { TestDataGenerator };
