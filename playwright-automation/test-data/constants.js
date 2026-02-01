/**
 * Test Data Constants
 * Centralized test data for consistent usage across tests
 */

const TEST_USERS = {
  RESOURCE_MANAGER: {
    username: 'admin',
    password: 'password123',
    role: 'Resource Manager',
  },
  EMPLOYEE: {
    username: 'employee',
    password: 'employee123',
    role: 'Employee',
  },
};

const EMPLOYEE_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  EXITED: 'Exited',
  ON_LEAVE: 'On Leave',
};

const PROFICIENCY_LEVELS = {
  BEGINNER: '0',
  BASIC: '1',
  INTERMEDIATE: '2',
  ADVANCED: '3',
  EXPERT: '4',
};

const SKILL_FRESHNESS_THRESHOLD = {
  DEFAULT_MONTHS: 12,
  WARNING_MONTHS: 9,
  CRITICAL_MONTHS: 18,
};

const VALIDATION_MESSAGES = {
  EMPLOYEE: {
    REQUIRED_FIRST_NAME: 'First Name is required',
    REQUIRED_LAST_NAME: 'Last Name is required',
    REQUIRED_EMAIL: 'Email is required',
    REQUIRED_HIRE_DATE: 'Hire Date is required',
    DUPLICATE_CODE: 'Employee code already exists',
    INVALID_DATE_RANGE: 'Exit Date cannot be before Hire Date',
    ALLOCATED_TO_ENGAGEMENT: 'Cannot change status - employee allocated to engagement',
  },
  SKILL: {
    REQUIRED_SKILL_NAME: 'Skill name is required',
    REQUIRED_PROFICIENCY: 'Proficiency is required',
    INVALID_PROFICIENCY: 'Proficiency must be between 0 and 4',
    NEGATIVE_EXPERIENCE: 'Experience cannot be negative',
    FUTURE_LAST_USED: 'Last Used Date cannot be in the future',
    DUPLICATE_SKILL: 'Skill already exists',
  },
  DESIGNATION: {
    REQUIRED_DESIGNATION: 'Designation is required',
    REQUIRED_EFFECTIVE_DATE: 'Effective Date is required',
  },
};

const SAMPLE_EMPLOYEES = {
  EMPLOYEE_1: {
    code: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@testcompany.com',
    hireDate: '2023-01-15',
    status: EMPLOYEE_STATUS.ACTIVE,
    internalDesignation: 'Software Engineer',
    billingDesignation: 'Senior Software Engineer',
  },
  EMPLOYEE_2: {
    code: 'EMP002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@testcompany.com',
    hireDate: '2022-06-01',
    status: EMPLOYEE_STATUS.ACTIVE,
    internalDesignation: 'Senior Developer',
    billingDesignation: 'Technical Lead',
  },
};

const SAMPLE_SKILLS = {
  JAVASCRIPT: {
    name: 'JavaScript',
    proficiency: PROFICIENCY_LEVELS.ADVANCED,
    experience: '5',
    lastUsedDate: '2024-01-15',
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    proficiency: PROFICIENCY_LEVELS.EXPERT,
    experience: '3',
    lastUsedDate: '2024-02-01',
  },
  PYTHON: {
    name: 'Python',
    proficiency: PROFICIENCY_LEVELS.INTERMEDIATE,
    experience: '2',
    lastUsedDate: '2023-06-15',
  },
};

module.exports = {
  TEST_USERS,
  EMPLOYEE_STATUS,
  PROFICIENCY_LEVELS,
  SKILL_FRESHNESS_THRESHOLD,
  VALIDATION_MESSAGES,
  SAMPLE_EMPLOYEES,
  SAMPLE_SKILLS
};
