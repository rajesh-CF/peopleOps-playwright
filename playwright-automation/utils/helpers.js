// Reusable utility functions for test automation

/**
 * Wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 */
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a timestamp string
 * @returns {string} Timestamp
 */
function getTimestamp() {
  return new Date().getTime().toString();
}

/**
 * Generate a random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function generateRandomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format a number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Clear browser storage
 * @param {Page} page - Playwright page object
 */
async function clearBrowserStorage(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Get local storage item
 * @param {Page} page - Playwright page object
 * @param {string} key - Storage key
 * @returns {string|null} Storage value
 */
async function getLocalStorageItem(page, key) {
  return await page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * Set local storage item
 * @param {Page} page - Playwright page object
 * @param {string} key - Storage key
 * @param {string} value - Storage value
 */
async function setLocalStorageItem(page, key, value) {
  await page.evaluate(
    ({ k, v }) => localStorage.setItem(k, v),
    { k: key, v: value }
  );
}

/**
 * Take a screenshot with timestamp
 * @param {Page} page - Playwright page object
 * @param {string} name - Screenshot name
 */
async function takeScreenshot(page, name) {
  const timestamp = getTimestamp();
  await page.screenshot({ 
    path: `screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in ms
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await wait(delay * Math.pow(2, i));
    }
  }
}

/**
 * Check if element is in viewport
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @returns {boolean} True if in viewport
 */
async function isElementInViewport(page, selector) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Scroll to element
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 */
async function scrollToElement(page, selector) {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, selector);
}

/**
 * Get all console messages
 * @param {Page} page - Playwright page object
 * @returns {Array} Console messages
 */
function setupConsoleListener(page) {
  const messages = [];
  page.on('console', msg => {
    messages.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    });
  });
  return messages;
}

/**
 * Get all network requests
 * @param {Page} page - Playwright page object
 * @returns {Array} Network requests
 */
function setupNetworkListener(page) {
  const requests = [];
  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      timestamp: new Date().toISOString()
    });
  });
  return requests;
}

/**
 * Check if page has errors
 * @param {Page} page - Playwright page object
 * @returns {Array} Page errors
 */
function setupErrorListener(page) {
  const errors = [];
  page.on('pageerror', error => {
    errors.push({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  });
  return errors;
}

/**
 * Wait for network idle
 * @param {Page} page - Playwright page object
 * @param {number} timeout - Timeout in ms
 */
async function waitForNetworkIdle(page, timeout = 10000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Login helper function
 * @param {Page} page - Playwright page object
 * @param {string} username - Username
 * @param {string} password - Password
 */
async function login(page, username = 'admin', password = 'password123') {
  await page.goto('/login');
  await page.fill('input#email', username);
  await page.fill('input#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard', { timeout: 10000 });
}

/**
 * Verify URL contains path
 * @param {string} url - Current URL
 * @param {string} path - Expected path
 * @returns {boolean} True if URL contains path
 */
function urlContains(url, path) {
  return url.includes(path);
}

/**
 * Verify element is visible
 * @param {Locator} element - Playwright locator
 * @returns {boolean} True if visible
 */
async function isVisible(element) {
  try {
    await element.waitFor({ state: 'visible', timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get page performance metrics
 * @param {Page} page - Playwright page object
 * @returns {Object} Performance metrics
 */
async function getPerformanceMetrics(page) {
  return await page.evaluate(() => {
    const perfData = window.performance.timing;
    return {
      loadTime: perfData.loadEventEnd - perfData.navigationStart,
      domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      responseTime: perfData.responseEnd - perfData.requestStart
    };
  });
}

/**
 * Generate test data
 * @param {string} type - Type of data (user, email, phone, etc.)
 * @returns {string} Generated data
 */
function generateTestData(type) {
  const timestamp = Date.now();
  switch (type) {
    case 'email':
      return `test${timestamp}@example.com`;
    case 'username':
      return `user${timestamp}`;
    case 'phone':
      return `555${Math.floor(Math.random() * 10000000)}`;
    case 'name':
      return `Test User ${timestamp}`;
    default:
      return `test_${timestamp}`;
  }
}

module.exports = {
  wait,
  getTimestamp,
  generateRandomString,
  generateRandomNumber,
  formatNumberWithCommas,
  clearBrowserStorage,
  getLocalStorageItem,
  setLocalStorageItem,
  takeScreenshot,
  retryWithBackoff,
  isElementInViewport,
  scrollToElement,
  setupConsoleListener,
  setupNetworkListener,
  setupErrorListener,
  waitForNetworkIdle,
  login,
  urlContains,
  isVisible,
  getPerformanceMetrics,
  generateTestData
};
