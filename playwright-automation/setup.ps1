# RETS Automation Framework - Installation & Setup Script
# Run this script in PowerShell to set up the framework

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RETS Automation Framework Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is NOT installed!" -ForegroundColor Red
    Write-Host "Please install Node.js v18 or higher from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm installation
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is NOT installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing Playwright browsers..." -ForegroundColor Yellow
npx playwright install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Playwright browsers installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install Playwright browsers" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Setting up environment configuration..." -ForegroundColor Yellow
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file from template" -ForegroundColor Green
    Write-Host "⚠ Please edit .env file with your application URL and credentials" -ForegroundColor Yellow
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file with your application URL and credentials" -ForegroundColor White
Write-Host "2. Run tests: npm test" -ForegroundColor White
Write-Host "3. View report: npm run report" -ForegroundColor White
Write-Host ""
Write-Host "Available Commands:" -ForegroundColor Cyan
Write-Host "  npm test              - Run all tests" -ForegroundColor White
Write-Host "  npm run test:headed   - Run tests with browser UI" -ForegroundColor White
Write-Host "  npm run test:ui       - Open Playwright UI mode" -ForegroundColor White
Write-Host "  npm run test:portfolio - Run Portfolio Company tests" -ForegroundColor White
Write-Host "  npm run test:project   - Run Project tests" -ForegroundColor White
Write-Host "  npm run test:engagement - Run Engagement tests" -ForegroundColor White
Write-Host "  npm run test:allocation - Run Allocation tests" -ForegroundColor White
Write-Host "  npm run report        - View test report" -ForegroundColor White
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Cyan
Write-Host "  README.md                    - Main documentation" -ForegroundColor White
Write-Host "  TEST-EXECUTION-GUIDE.md       - Test execution guide" -ForegroundColor White
Write-Host "  PAGE-OBJECT-MODEL-GUIDE.md    - POM guidelines" -ForegroundColor White
Write-Host "  FRAMEWORK-SUMMARY.md          - Complete summary" -ForegroundColor White
Write-Host ""
Write-Host "Happy Testing! 🚀" -ForegroundColor Green
