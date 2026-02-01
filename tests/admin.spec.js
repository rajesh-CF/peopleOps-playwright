import { test, expect } from '@playwright/test';

test.describe('Admin Module', () => {
test.beforeEach(async ({ page }) => {

    // Navigate to login
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  // Login
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Verify Dashboard
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Go to Admin page
  await page.getByRole("link", { name: "Admin" }).click();

  // Verify Admin Page
  await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
});


TC 01 - Verify Admin Page Loads
test("TC01 - Verify Admin Page Loads", async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
});

// TC 02 - Verify Add User Button Visibility
test("TC02 - Verify Add User button exists", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
});

// TC 03 - Add User With Valid Data
test("TC03 - Add user with valid data", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await page.locator(".oxd-select-text").nth(0).click();
  await page.getByRole("option", { name: "Admin" }).click();
  await page.locator(".oxd-autocomplete-text-input > input").fill("Orange  Test");
  await page.locator(".oxd-select-text").nth(1).click();
  await page.getByRole("option", { name: "Enabled" }).click();
  await page.getByPlaceholder("Type for hints...").fill("testuser321");
  await page.locator('input[type="password"]').nth(0).fill("Password@123");
  await page.locator('input[type="password"]').nth(1).fill("Password@123");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Success")).toBeVisible();
});


// TC 04 - Add User Without Mandatory Fields
test("TC04 - Add user without mandatory fields", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Required")).toBeVisible();
  await expect(page.getByText("Should have at least 5 characters")).toBeVisible();
  await expect(page.getByText("Passwords do not match")).toBeVisible();
  await expect(page.getByText("Invalid")).toBeVisible();
  await expect(page.getByText("Required")).toBeVisible();
  await expect(page.getByText("Required")).toBeVisible();
  await expect(page.getByText("Required")).toBeVisible();
});


// TC 05 - Search User by Username
test("TC05 - Search user by username", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("Admin");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Admin")).toBeVisible();
  await expect(page.locator(".oxd-table-body .oxd-table-row")).toHaveCount(1);
  
});

// TC 06 - Search by Role
test("TC06 - Search user by role", async ({ page }) => {
  await page.locator(".oxd-select-text").nth(0).click();
  await page.getByRole("option", { name: "Admin" }).click();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Admin")).toBeVisible();
});

// TC 07 - Search by Status
test("TC07 - Search user by status", async ({ page }) => {
  await page.locator(".oxd-select-text").nth(1).click();
  await page.getByRole("option", { name: "Enabled" }).click();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Enabled")).toBeVisible();
});

// TC 08 - Reset Search Filter
test("TC08 - Reset search filters", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("Test");
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByPlaceholder("Type for hints...")).toHaveValue("");
});

// TC 09 - Edit Existing User
test("TC09 - Edit existing user", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("Admin");
  await page.getByRole("button", { name: "Search" }).click();
  await page.locator(".oxd-table-cell-actions button").nth(0).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Success")).toBeVisible();
});

// TC 10 - Delete Single User
test("TC10 - Delete single user", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("Admin");
  await page.getByRole("button", { name: "Search" }).click();
  await page.locator(".oxd-icon.bi-trash").nth(0).click();
  await page.getByRole("button", { name: "Yes, Delete" }).click();
  await expect(page.getByText("Success")).toBeVisible();
});

// TC 11 - Delete Multiple Users
test("TC11 - Delete multiple users", async ({ page }) => {
  await page.locator(".oxd-checkbox-input").nth(1).click();
  await page.locator(".oxd-checkbox-input").nth(2).click();
  await page.locator("button:has-text('Delete Selected')").click();
  await page.getByRole("button", { name: "Yes, Delete" }).click();
  await expect(page.getByText("Success")).toBeVisible();
});

// TC 12 - Pagination Test
test("TC12 - Verify pagination exists", async ({ page }) => {
  await expect(page.locator(".oxd-pagination-page-item")).toBeVisible();
});

// TC 13 - Sort by Username Column
test("TC13 - Sort users by username", async ({ page }) => {
  await page.getByText("Username").click();
  await expect(page.getByText("Username")).toBeVisible();
});

// TC 14 - Validate Invalid Username Format
test("TC14 - Invalid username format", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByPlaceholder("Type for hints...").fill("@@##$$");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Invalid")).toBeVisible();
});

// TC 15 - Verify User Role Dropdown Values
test("TC15 - Verify role dropdown values", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await page.locator(".oxd-select-text").nth(0).click();
  await expect(page.getByRole("option", { name: "Admin" })).toBeVisible();
  await expect(page.getByRole("option", { name: "ESS" })).toBeVisible();
});

// TC 16 - Status Field Options
test("TC16 - Verify status dropdown values", async ({ page }) => {
  await page.getByRole("button", { name: "Add" }).click();
  await page.locator(".oxd-select-text").nth(1).click();

  await expect(page.getByRole("option", { name: "Enabled" })).toBeVisible();
  await expect(page.getByRole("option", { name: "Disabled" })).toBeVisible();
});

// TC 17 - No User Found
test("TC17 - No Records Found message", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("asdasd123123");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("No Records Found")).toBeVisible();
});

// TC 18 - Change User Status
test("TC18 - Change user status", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("Admin");
  await page.getByRole("button", { name: "Search" }).click();
  await page.locator(".oxd-table-cell-actions button").nth(0).click();
  await page.locator(".oxd-select-text").nth(1).click();
  await page.getByRole("option", { name: "Disabled" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Success")).toBeVisible();
});

// TC 19 - Admin User Cannot Be Deleted
test("TC19 - Super Admin cannot be deleted", async ({ page }) => {
  await page.getByPlaceholder("Type for hints...").fill("Admin");
  await page.getByRole("button", { name: "Search" }).click();

  const isDeleteVisible = await page.locator(".oxd-icon.bi-trash").nth(0).isVisible();
  expect(isDeleteVisible).toBeFalsy();
});

// TC 20 - Non-Admin cannot access Admin Page
test("TC20 - Non-admin should not see Admin page", async ({ browser }) => {
  const page = await browser.newPage();

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.fill('input[name="username"]', 'ESS');
  await page.fill('input[name="password"]', 'ESS123');
  await page.click('button[type="submit"]');
  const adminMenu = await page.getByRole("link", { name: "Admin" }).isVisible();
  expect(adminMenu).toBeFalsy();
});
})
