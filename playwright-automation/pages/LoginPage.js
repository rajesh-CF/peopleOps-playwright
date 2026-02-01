class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Updated to match actual page
    this.usernameInput = page.locator('input#email');
    this.passwordInput = page.locator('input#password');
    this.signInButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error, .error-message, [class*="error"], [role="alert"], .text-red-500, .text-danger');
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.passwordToggle = page.locator('button[aria-label*="password"], [class*="password-toggle"], [class*="show-password"]');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async isErrorVisible() {
    // Check multiple possible error locations
    const errorSelectors = [
      this.errorMessage,
      this.page.locator('text=/login failed/i'),
      this.page.locator('text=/invalid credentials/i'),
      this.page.locator('text=/error/i'),
      this.page.getByText(/login failed/i),
      this.page.getByText(/invalid/i)
    ];
    
    for (const selector of errorSelectors) {
      try {
        if (await selector.isVisible({ timeout: 1000 })) {
          return true;
        }
      } catch (e) {
        continue;
      }
    }
    return false;
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async checkRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  async isRememberMeChecked() {
    return await this.rememberMeCheckbox.isChecked();
  }

  async togglePasswordVisibility() {
    await this.passwordToggle.click();
  }

  async getPasswordInputType() {
    return await this.passwordInput.getAttribute('type');
  }
}

module.exports = { LoginPage };
