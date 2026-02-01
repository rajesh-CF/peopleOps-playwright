# Dashboard Manual Test Cases
**Application:** PeopleOps Platform  
**Page URL:** http://localhost:3000/dashboard  
**Test Date:** January 31, 2026  
**Tester:** QA Team

---

## 1. UI/VISUAL TEST CASES

### TC_DASH_UI_001: Dashboard Page Layout Verification
**Objective:** Verify all UI elements are displayed correctly  
**Priority:** High  
**Preconditions:** User is logged in  
**Test Steps:**
1. Navigate to http://localhost:3000/dashboard
2. Verify page loads completely
3. Check all sections are visible

**Expected Results:**
- ✓ Page title displays "PeopleOps Platform"
- ✓ Subtitle shows "Enterprise HR and Operations Management System"
- ✓ Left sidebar with all menu items visible
- ✓ Search bar at top center
- ✓ Dark mode toggle, Notifications bell, User profile (AU) at top right
- ✓ All 9 service cards displayed (Identity Management, Master Data, Recruitment, Staffing, Billing, Delivery, Documents, Notifications, Reporting)
- ✓ Statistics section with 4 metrics visible
- ✓ Red "1 Issue" notification at bottom left

---

### TC_DASH_UI_002: Sidebar Navigation Menu Verification
**Objective:** Verify sidebar structure and sections  
**Priority:** High  
**Test Steps:**
1. Navigate to dashboard
2. Verify all sidebar sections

**Expected Results:**
- ✓ **OVERVIEW** section: Dashboard, Analytics
- ✓ **CORE SERVICES** section: Identity & Access (expandable), Master Data (expandable)
- ✓ **HR OPERATIONS** section: Recruitment (expandable), Staffing (expandable)
- ✓ **BUSINESS SERVICES** section: Billing (expandable), Delivery (expandable), Documents (expandable)
- ✓ **COMMUNICATION & REPORTING** section: Notifications (badge showing "3"), Reporting (expandable)
- ✓ **SYSTEM** section: Settings
- ✓ All expandable menus have dropdown arrow icons

---

### TC_DASH_UI_003: Service Cards Visual Verification
**Objective:** Verify all service cards display correctly  
**Priority:** High  
**Test Steps:**
1. Navigate to dashboard
2. Scroll to view all service cards
3. Verify each card's content

**Expected Results:**
Each card contains:
- ✓ Icon (different color for each service)
- ✓ Service title
- ✓ Description text
- ✓ "Access [Service Name]" button (blue color)
- ✓ Cards are in grid layout (3 columns)
- ✓ Consistent spacing and alignment

---

### TC_DASH_UI_004: Statistics Cards Visual Verification
**Objective:** Verify statistics section displays correctly  
**Priority:** Medium  
**Test Steps:**
1. Navigate to dashboard
2. Scroll to statistics section
3. Verify each metric card

**Expected Results:**
- ✓ **Total Users:** 1,847 with "+12% from last month" trend
- ✓ **Active Services:** 9 with "All systems operational" status
- ✓ **Active Jobs:** 47 with "+8 new this week" indicator
- ✓ **Monthly Revenue:** $124,560 with "+12.5% from last month" trend
- ✓ Each card has an icon
- ✓ Numbers are prominently displayed
- ✓ Trend indicators use appropriate colors (green for positive)

---

### TC_DASH_UI_005: Responsive Design Verification
**Objective:** Verify dashboard adapts to different screen sizes  
**Priority:** Medium  
**Test Steps:**
1. Open dashboard in desktop view (1920x1080)
2. Resize to tablet view (768x1024)
3. Resize to mobile view (375x667)

**Expected Results:**
- ✓ Desktop: Full sidebar visible, 3-column grid for cards
- ✓ Tablet: Collapsible sidebar, 2-column grid
- ✓ Mobile: Hamburger menu, single column layout
- ✓ No horizontal scrolling on any view
- ✓ All elements remain accessible

---

## 2. POSITIVE TEST CASES

### TC_DASH_POS_001: Successful Dashboard Load After Login
**Objective:** Verify dashboard loads successfully after valid login  
**Priority:** Critical  
**Preconditions:** User has valid credentials (admin/password123)  
**Test Steps:**
1. Navigate to http://localhost:3000/login
2. Enter username: admin
3. Enter password: password123
4. Click "Sign In"

**Expected Results:**
- ✓ User redirected to http://localhost:3000/dashboard
- ✓ Dashboard loads within 3 seconds
- ✓ All data populated correctly
- ✓ User initials "AU" displayed in top right

---

### TC_DASH_POS_002: Navigation - Dashboard Menu Item
**Objective:** Verify clicking Dashboard menu item works  
**Priority:** High  
**Test Steps:**
1. From dashboard, click on another menu item
2. Click "Dashboard" in sidebar

**Expected Results:**
- ✓ Returns to dashboard page
- ✓ URL is http://localhost:3000/dashboard
- ✓ Dashboard menu item highlighted
- ✓ Page content reloads

---

### TC_DASH_POS_003: Navigation - Analytics Menu Item
**Objective:** Verify Analytics navigation works  
**Priority:** High  
**Test Steps:**
1. From dashboard, click "Analytics" in sidebar

**Expected Results:**
- ✓ Navigates to Analytics page
- ✓ URL changes appropriately
- ✓ Analytics menu item highlighted
- ✓ No errors displayed

---

### TC_DASH_POS_004: Expandable Menu - Identity & Access
**Objective:** Verify Identity & Access menu expands/collapses  
**Priority:** Medium  
**Test Steps:**
1. Click on "Identity & Access" menu item
2. Verify menu expands
3. Click again to collapse

**Expected Results:**
- ✓ Menu expands showing sub-items
- ✓ Dropdown arrow rotates to indicate expansion
- ✓ Menu collapses when clicked again
- ✓ Smooth animation during expand/collapse

---

### TC_DASH_POS_005: Access Identity Management Service
**Objective:** Verify clicking "Access Identity Management" button works  
**Priority:** High  
**Test Steps:**
1. Locate "Identity Management" card
2. Click "Access Identity Management" button

**Expected Results:**
- ✓ Navigates to Identity Management page
- ✓ URL changes appropriately
- ✓ Identity Management page loads successfully
- ✓ No errors displayed

---

### TC_DASH_POS_006: Access Master Data Service
**Objective:** Verify Master Data access button works  
**Priority:** High  
**Test Steps:**
1. Locate "Master Data" card
2. Click "Access Master Data" button

**Expected Results:**
- ✓ Navigates to Master Data page
- ✓ Correct page content displays
- ✓ No navigation errors

---

### TC_DASH_POS_007: Access All Service Cards
**Objective:** Verify all 9 service access buttons work  
**Priority:** High  
**Test Steps:**
1. Click each "Access [Service]" button for:
   - Identity Management
   - Master Data
   - Recruitment
   - Staffing
   - Billing
   - Delivery
   - Documents
   - Notifications
   - Reporting

**Expected Results:**
- ✓ Each button navigates to respective service page
- ✓ No broken links
- ✓ Can navigate back to dashboard from each service
- ✓ No console errors

---

### TC_DASH_POS_008: Search Functionality - Valid Search
**Objective:** Verify search bar works with valid input  
**Priority:** High  
**Test Steps:**
1. Click on search bar at top
2. Type "Identity"
3. Press Enter or click search icon

**Expected Results:**
- ✓ Search executes successfully
- ✓ Relevant results displayed
- ✓ Search term highlighted in results
- ✓ Can clear search and return to dashboard

---

### TC_DASH_POS_009: Dark Mode Toggle
**Objective:** Verify dark mode switch works  
**Priority:** Medium  
**Test Steps:**
1. Click dark mode toggle icon (moon icon)
2. Observe page theme change
3. Click again to toggle back

**Expected Results:**
- ✓ Page switches to dark theme
- ✓ All elements adapt to dark mode colors
- ✓ Toggle icon changes to sun icon
- ✓ Dark mode preference persists on page refresh
- ✓ Switches back to light mode on second click

---

### TC_DASH_POS_010: Notifications Bell Click
**Objective:** Verify notifications bell opens notification panel  
**Priority:** Medium  
**Test Steps:**
1. Click notifications bell icon (with red dot indicator)
2. Verify notifications panel opens

**Expected Results:**
- ✓ Notifications dropdown/panel opens
- ✓ Shows "3" notifications (as per badge)
- ✓ Notifications are readable
- ✓ Red dot indicator disappears after viewing
- ✓ Panel closes when clicking outside

---

### TC_DASH_POS_011: User Profile Menu
**Objective:** Verify user profile menu works  
**Priority:** Medium  
**Test Steps:**
1. Click user avatar/initials "AU" in top right
2. Verify dropdown menu appears

**Expected Results:**
- ✓ Dropdown menu opens
- ✓ Shows user information
- ✓ Contains options: Profile, Settings, Logout
- ✓ Menu closes when clicking outside

---

### TC_DASH_POS_012: Logout Functionality
**Objective:** Verify logout works from dashboard  
**Priority:** Critical  
**Test Steps:**
1. Click user avatar "AU"
2. Click "Logout" option
3. Confirm logout if prompted

**Expected Results:**
- ✓ User logged out successfully
- ✓ Redirected to login page
- ✓ Cannot access dashboard by entering URL directly
- ✓ Session cleared

---

### TC_DASH_POS_013: Issue Notification Click
**Objective:** Verify clicking "1 Issue" notification at bottom works  
**Priority:** Medium  
**Test Steps:**
1. Click red "1 Issue" button at bottom left corner
2. Verify action

**Expected Results:**
- ✓ Opens issue details panel/page
- ✓ Shows issue description
- ✓ Provides option to view or dismiss
- ✓ Issue status is visible

---

### TC_DASH_POS_014: Statistics Data Display
**Objective:** Verify all statistics display correct data types  
**Priority:** High  
**Test Steps:**
1. Navigate to dashboard
2. View statistics section
3. Verify data formatting

**Expected Results:**
- ✓ Total Users: Numeric value with comma separator (1,847)
- ✓ Active Services: Integer value (9)
- ✓ Active Jobs: Integer value (47)
- ✓ Monthly Revenue: Currency format with $ symbol ($124,560)
- ✓ Trend indicators show percentage with +/- sign
- ✓ Time references are clear (e.g., "from last month")

---

### TC_DASH_POS_015: Page Refresh - Data Persistence
**Objective:** Verify dashboard state persists after refresh  
**Priority:** Medium  
**Test Steps:**
1. Perform any action on dashboard (expand menu, change theme)
2. Refresh the page (F5 or Ctrl+R)

**Expected Results:**
- ✓ User remains logged in
- ✓ Dashboard reloads successfully
- ✓ Data refreshes with latest values
- ✓ Theme preference maintained (if dark mode was on)
- ✓ No loss of session

---

## 3. NEGATIVE TEST CASES

### TC_DASH_NEG_001: Direct URL Access Without Login
**Objective:** Verify unauthorized access is prevented  
**Priority:** Critical  
**Preconditions:** User is not logged in  
**Test Steps:**
1. Open browser in incognito/private mode
2. Navigate directly to http://localhost:3000/dashboard

**Expected Results:**
- ✓ User is NOT able to access dashboard
- ✓ Redirected to login page
- ✓ URL becomes http://localhost:3000/login?redirect=%2Fdashboard
- ✓ Error message displayed: "Please login to continue" or similar

---

### TC_DASH_NEG_002: Session Timeout
**Objective:** Verify dashboard handles session expiration  
**Priority:** High  
**Preconditions:** User is logged in to dashboard  
**Test Steps:**
1. Login to dashboard
2. Wait for session timeout (typically 30-60 minutes of inactivity)
3. Try to interact with any dashboard element

**Expected Results:**
- ✓ Session expires after configured time
- ✓ User redirected to login page
- ✓ Message displayed: "Session expired, please login again"
- ✓ Cannot perform any action without re-login

---

### TC_DASH_NEG_003: Search with No Results
**Objective:** Verify search handles no results gracefully  
**Priority:** Medium  
**Test Steps:**
1. Click search bar
2. Enter invalid/non-existent search term: "xyzabc123nonexistent"
3. Press Enter

**Expected Results:**
- ✓ Search executes without error
- ✓ Displays "No results found" message
- ✓ Provides suggestion: "Try different keywords"
- ✓ Dashboard remains functional
- ✓ Can clear search and return to normal view

---

### TC_DASH_NEG_004: Search with Special Characters
**Objective:** Verify search handles special characters properly  
**Priority:** Low  
**Test Steps:**
1. Enter special characters in search: `!@#$%^&*(){}[]<>?/\|`
2. Submit search

**Expected Results:**
- ✓ Search does not crash
- ✓ Special characters are escaped/sanitized
- ✓ Shows appropriate message (no results or error message)
- ✓ No SQL injection or XSS vulnerability

---

### TC_DASH_NEG_005: Broken Service Link
**Objective:** Verify handling of non-existent service pages  
**Priority:** Medium  
**Preconditions:** Simulate a broken service link  
**Test Steps:**
1. Modify URL manually to access non-existent service
2. Navigate to http://localhost:3000/nonexistent-service

**Expected Results:**
- ✓ Shows 404 error page
- ✓ Error message: "Page Not Found"
- ✓ Provides navigation back to dashboard
- ✓ Application doesn't crash

---

### TC_DASH_NEG_006: Network Failure During Load
**Objective:** Verify dashboard handles network interruption  
**Priority:** Medium  
**Test Steps:**
1. Start loading dashboard
2. Disable network connection mid-load
3. Observe behavior

**Expected Results:**
- ✓ Shows appropriate error message
- ✓ Displays "Network Error" or "Unable to load data"
- ✓ Provides retry option
- ✓ Doesn't display partial/corrupted data

---

### TC_DASH_NEG_007: API Failure - Statistics Not Loading
**Objective:** Verify handling of backend API failures  
**Priority:** High  
**Preconditions:** Backend API returns error  
**Test Steps:**
1. Simulate API failure for statistics endpoint
2. Load dashboard

**Expected Results:**
- ✓ Dashboard loads but shows error for statistics section
- ✓ Error message: "Unable to load statistics"
- ✓ Other sections continue to work
- ✓ Provides refresh/retry option

---

### TC_DASH_NEG_008: Multiple Rapid Clicks on Service Button
**Objective:** Verify double-click protection on action buttons  
**Priority:** Low  
**Test Steps:**
1. Rapidly click "Access Identity Management" button 5 times
2. Observe behavior

**Expected Results:**
- ✓ Button click is processed only once
- ✓ Navigation occurs only once
- ✓ No multiple page loads or errors
- ✓ Button is disabled during navigation

---

### TC_DASH_NEG_009: Browser Back Button After Logout
**Objective:** Verify back button doesn't access dashboard after logout  
**Priority:** High  
**Test Steps:**
1. Login and access dashboard
2. Logout
3. Click browser back button

**Expected Results:**
- ✓ User remains on login page OR
- ✓ Redirected back to login page
- ✓ Dashboard is not accessible
- ✓ Message: "Please login to continue"

---

### TC_DASH_NEG_010: Insufficient Permissions for Service Access
**Objective:** Verify role-based access control  
**Priority:** High  
**Preconditions:** User has limited permissions  
**Test Steps:**
1. Login with restricted user account
2. Try to access a service that requires admin rights
3. Click "Access Billing" (assuming admin-only)

**Expected Results:**
- ✓ Access denied message displayed
- ✓ User not able to access restricted service
- ✓ Error: "You don't have permission to access this service"
- ✓ Dashboard remains accessible

---

### TC_DASH_NEG_011: SQL Injection Attempt in Search
**Objective:** Verify search is protected against SQL injection  
**Priority:** Critical  
**Test Steps:**
1. Enter SQL injection payload in search: `' OR '1'='1'; --`
2. Submit search

**Expected Results:**
- ✓ Input is sanitized
- ✓ No database error displayed
- ✓ No unauthorized data access
- ✓ Search returns safe results or "No results"

---

### TC_DASH_NEG_012: XSS Attempt in Search
**Objective:** Verify search is protected against XSS attacks  
**Priority:** Critical  
**Test Steps:**
1. Enter XSS payload: `<script>alert('XSS')</script>`
2. Submit search

**Expected Results:**
- ✓ Script is not executed
- ✓ Input is properly escaped/encoded
- ✓ No alert popup appears
- ✓ Search handles input safely

---

## 4. EDGE TEST CASES

### TC_DASH_EDGE_001: Maximum Search Length
**Objective:** Verify search handles very long input  
**Priority:** Low  
**Test Steps:**
1. Enter 1000+ characters in search bar
2. Submit search

**Expected Results:**
- ✓ Input is truncated to maximum allowed length OR
- ✓ Error message: "Search term too long (max 200 characters)"
- ✓ Application doesn't crash
- ✓ Search field remains functional

---

### TC_DASH_EDGE_002: Rapid Menu Expansion/Collapse
**Objective:** Verify rapid menu toggling doesn't cause issues  
**Priority:** Low  
**Test Steps:**
1. Rapidly click expandable menu (Identity & Access) 10 times quickly
2. Observe behavior

**Expected Results:**
- ✓ Menu expands/collapses smoothly
- ✓ Animation doesn't break
- ✓ Final state is consistent (either open or closed)
- ✓ No UI glitches

---

### TC_DASH_EDGE_003: All Menus Expanded Simultaneously
**Objective:** Verify UI handles all menus open at once  
**Priority:** Low  
**Test Steps:**
1. Expand all collapsible menus in sidebar:
   - Identity & Access
   - Master Data
   - Recruitment
   - Staffing
   - Billing
   - Delivery
   - Documents
   - Reporting

**Expected Results:**
- ✓ All menus expand without overlap
- ✓ Sidebar becomes scrollable if content exceeds viewport
- ✓ No layout breaks
- ✓ Smooth scrolling works

---

### TC_DASH_EDGE_004: Minimum Browser Window Size
**Objective:** Verify dashboard at minimum supported resolution  
**Priority:** Medium  
**Test Steps:**
1. Resize browser to 320x568 (iPhone SE size)
2. Navigate through dashboard

**Expected Results:**
- ✓ All elements remain visible
- ✓ No horizontal scrolling
- ✓ Text is readable (not cut off)
- ✓ Buttons are clickable
- ✓ Mobile-optimized layout displayed

---

### TC_DASH_EDGE_005: Maximum Browser Window Size
**Objective:** Verify dashboard on ultra-wide screens  
**Priority:** Low  
**Test Steps:**
1. Open dashboard on 4K/ultra-wide monitor (3840x2160)
2. Verify layout

**Expected Results:**
- ✓ Content scales appropriately
- ✓ No excessive white space
- ✓ Cards don't stretch excessively
- ✓ Maximum width constraint applied (if designed)
- ✓ Elements remain centered and balanced

---

### TC_DASH_EDGE_006: Slow Network Connection
**Objective:** Verify dashboard loads on slow 3G connection  
**Priority:** Medium  
**Test Steps:**
1. Throttle network to Slow 3G (Chrome DevTools)
2. Navigate to dashboard
3. Observe loading behavior

**Expected Results:**
- ✓ Loading indicator displayed
- ✓ Page loads within acceptable time (10-15 seconds)
- ✓ Progressive loading of content
- ✓ Images/icons load gracefully
- ✓ Core functionality available even if some assets are delayed

---

### TC_DASH_EDGE_007: Browser Zoom Levels
**Objective:** Verify dashboard at different zoom levels  
**Priority:** Medium  
**Test Steps:**
1. Test at 50% zoom
2. Test at 100% zoom (default)
3. Test at 150% zoom
4. Test at 200% zoom

**Expected Results:**
- ✓ Layout adapts to zoom level
- ✓ Text remains readable at all levels
- ✓ Buttons remain clickable
- ✓ No content overflow
- ✓ Horizontal scrolling minimized

---

### TC_DASH_EDGE_008: Statistics with Zero Values
**Objective:** Verify statistics display when values are zero  
**Priority:** Low  
**Preconditions:** Simulate zero values from backend  
**Test Steps:**
1. Load dashboard with statistics showing:
   - Total Users: 0
   - Active Services: 0
   - Active Jobs: 0
   - Monthly Revenue: $0

**Expected Results:**
- ✓ Displays "0" values correctly
- ✓ No trend indicators shown (or shows "N/A")
- ✓ No division by zero errors
- ✓ UI remains intact

---

### TC_DASH_EDGE_009: Statistics with Extremely Large Numbers
**Objective:** Verify handling of very large numeric values  
**Priority:** Low  
**Test Steps:**
1. Simulate statistics with extreme values:
   - Total Users: 9,999,999
   - Active Jobs: 99,999
   - Monthly Revenue: $999,999,999

**Expected Results:**
- ✓ Numbers display with proper formatting
- ✓ Commas inserted correctly
- ✓ No text overflow
- ✓ Scientific notation NOT used (unless by design)
- ✓ Cards expand to accommodate if needed

---

### TC_DASH_EDGE_010: Negative Trend Values
**Objective:** Verify display of negative trends  
**Priority:** Medium  
**Test Steps:**
1. Simulate negative trends:
   - Total Users: -15% from last month
   - Monthly Revenue: -8.5% from last month

**Expected Results:**
- ✓ Displays negative percentage with minus sign
- ✓ Uses red/warning color for negative trends
- ✓ Down arrow icon shown (if applicable)
- ✓ Clear visual distinction from positive trends

---

### TC_DASH_EDGE_011: Simultaneous Multi-User Access
**Objective:** Verify dashboard handles concurrent users  
**Priority:** Medium  
**Test Steps:**
1. Open dashboard in multiple tabs/browsers
2. Login with same user in all
3. Perform actions in one tab

**Expected Results:**
- ✓ Each tab maintains its own state
- ✓ No session conflicts
- ✓ Data syncs if real-time updates are enabled
- ✓ No one tab locks out another

---

### TC_DASH_EDGE_012: Page Load During Server Restart
**Objective:** Verify behavior during backend maintenance  
**Priority:** Low  
**Preconditions:** Backend server restarts during page load  
**Test Steps:**
1. Start loading dashboard
2. Restart backend server mid-load
3. Observe behavior

**Expected Results:**
- ✓ Shows appropriate error message
- ✓ Provides retry option
- ✓ Automatically retries after timeout (if designed)
- ✓ Clear message: "Server temporarily unavailable"

---

### TC_DASH_EDGE_013: Notifications Badge with High Number
**Objective:** Verify notification badge with 100+ notifications  
**Priority:** Low  
**Test Steps:**
1. Simulate 100+ unread notifications
2. Load dashboard
3. Check notification badge

**Expected Results:**
- ✓ Badge displays "99+" instead of exact number
- ✓ Badge remains visible and readable
- ✓ Clicking shows scrollable list of notifications
- ✓ Performance not impacted

---

### TC_DASH_EDGE_014: Browser Tab Switching
**Objective:** Verify dashboard behavior when switching tabs  
**Priority:** Low  
**Test Steps:**
1. Open dashboard
2. Switch to another browser tab for 10 minutes
3. Return to dashboard tab

**Expected Results:**
- ✓ Dashboard is still functional
- ✓ Session maintained
- ✓ Data refreshes automatically OR shows stale data warning
- ✓ Auto-refresh on tab focus (if implemented)

---

### TC_DASH_EDGE_015: Special Characters in User Profile
**Objective:** Verify display of special characters in user name  
**Priority:** Low  
**Preconditions:** User name contains special characters (e.g., "Müller", "O'Brien", "José")  
**Test Steps:**
1. Login with user having special characters in name
2. Check user initials display in top right

**Expected Results:**
- ✓ Special characters display correctly
- ✓ Initials extracted properly
- ✓ No encoding issues (no ���� characters)
- ✓ User name shows correctly in profile dropdown

---

## Test Execution Summary Template

| **Total Test Cases** | **UI** | **Positive** | **Negative** | **Edge** |
|---------------------|--------|--------------|--------------|----------|
| 60                  | 5      | 15           | 12           | 15       |

| **Status**   | **Count** | **Percentage** |
|-------------|-----------|----------------|
| Pass        |           |                |
| Fail        |           |                |
| Blocked     |           |                |
| Not Tested  |           |                |

---

## Priority Breakdown

- **Critical:** 4 test cases
- **High:** 21 test cases  
- **Medium:** 23 test cases
- **Low:** 12 test cases

---

## Notes for Test Execution

1. **Prerequisites:**
   - Application running at http://localhost:3000
   - Valid test user credentials: admin / password123
   - Different browser versions available (Chrome, Firefox, Safari, Edge)
   - Network throttling tools available
   - Access to backend API for simulating failures

2. **Test Environment:**
   - OS: Windows 11
   - Browsers: Chrome (latest), Firefox (latest), Edge (latest)
   - Screen Resolutions: 1920x1080, 1366x768, 375x667 (mobile)

3. **Test Data Requirements:**
   - Valid user accounts with different roles
   - Sample data for all statistics
   - Test notifications

4. **Automation Candidates:**
   - All positive test cases (TC_DASH_POS_001 to TC_DASH_POS_015)
   - Critical negative test cases (TC_DASH_NEG_001, TC_DASH_NEG_011, TC_DASH_NEG_012)
   - Selected UI test cases

---

**Document Version:** 1.0  
**Last Updated:** January 31, 2026  
**Reviewed By:** QA Lead  
**Approved By:** Project Manager
