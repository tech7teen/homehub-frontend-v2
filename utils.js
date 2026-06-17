/**
 * HomeHub MVP - Utility Functions
 * Shared utilities for all dashboard pages
 * Frontend-first approach: No API calls, pure client-side logic
 */

/**
 * Navigation helper - navigate between pages
 * @param {string} page - Page name (without .html)
 * @param {string} role - Optional role override
 */
function navigateTo(page, role = null) {
    const currentRole = role || AuthManager.getRole();
    if (page === 'dashboard' && currentRole) {
        window.location.href = `dashboard-${currentRole}.html`;
    } else {
        window.location.href = `${page}.html`;
    }
}

/**
 * Format currency for display
 * @param {number} amount - Amount in KES
 * @returns {string} - Formatted string (e.g., "KES 15,000")
 */
function formatCurrency(amount) {
    if (!amount) return "KES 0";
    return "KES " + Math.floor(amount).toLocaleString('en-US');
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    if (!num) return "0";
    return Math.floor(num).toLocaleString('en-US');
}

/**
 * Format date to readable format
 * @param {string|Date} dateString - ISO date string or Date object
 * @returns {string} - Formatted date (e.g., "14 Jun 2026")
 */
function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format time to readable format
 * @param {string|Date} dateString - ISO date string or Date object
 * @returns {string} - Formatted time (e.g., "14:30")
 */
function formatTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-KE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

/**
 * Get relative time description
 * @param {string|Date} dateString - ISO date string or Date object
 * @returns {string} - Relative time (e.g., "2 hours ago")
 */
function getTimeAgo(dateString) {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    // Minutes
    if (seconds < 60) {
        return seconds === 0 ? "just now" : seconds + "s ago";
    }
    
    // Hours
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return minutes + "m ago";
    }
    
    // Days
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return hours + "h ago";
    }
    
    // Weeks
    const days = Math.floor(hours / 24);
    if (days < 7) {
        return days + "d ago";
    }
    
    // Fallback to date
    return formatDate(dateString);
}

/**
 * Format phone number to readable format
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone (e.g., "+254 712 345 678")
 */
function formatPhone(phone) {
    if (!phone) return "";
    
    // Remove all non-digits except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Format Kenya number
    if (cleaned.startsWith('+254')) {
        return cleaned.slice(0, 4) + ' ' + cleaned.slice(4, 7) + ' ' + cleaned.slice(7, 10) + ' ' + cleaned.slice(10);
    } else if (cleaned.startsWith('254')) {
        return '+254 ' + cleaned.slice(3, 6) + ' ' + cleaned.slice(6, 9) + ' ' + cleaned.slice(9);
    } else if (cleaned.startsWith('7')) {
        return '+254 ' + cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6) + ' ' + cleaned.slice(6);
    }
    
    return phone;
}

/**
 * Get status badge HTML with appropriate styling
 * @param {string} status - Status value (e.g., "completed", "overdue", "in-progress")
 * @returns {string} - HTML badge
 */
function getStatusBadge(status) {
    const badges = {
        "completed": '<span class="badge badge-success">✓ Completed</span>',
        "on-time": '<span class="badge badge-success">✓ On Time</span>',
        "overdue": '<span class="badge badge-error">! Overdue</span>',
        "in-progress": '<span class="badge badge-info">→ In Progress</span>',
        "pending": '<span class="badge badge-warning">⚠ Pending</span>',
        "active": '<span class="badge badge-success">✓ Active</span>',
        "inactive": '<span class="badge badge-muted">○ Inactive</span>',
        "paid": '<span class="badge badge-success">✓ Paid</span>',
        "unpaid": '<span class="badge badge-error">! Unpaid</span>',
        "normal": '<span class="badge badge-success">✓ Normal</span>',
        "high": '<span class="badge badge-error">! High</span>',
        "warning": '<span class="badge badge-warning">⚠ Warning</span>'
    };
    
    return badges[status] || `<span class="badge badge-muted">${status}</span>`;
}

/**
 * Get priority badge with color
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {string} - HTML badge
 */
function getPriorityBadge(priority) {
    const badges = {
        "low": '<span class="badge badge-muted">Low</span>',
        "medium": '<span class="badge badge-warning">Medium</span>',
        "high": '<span class="badge badge-error">High</span>'
    };
    
    return badges[priority] || '<span class="badge badge-muted">Normal</span>';
}

/**
 * Get payment status indicator
 * @param {string} status - Payment status
 * @returns {string} - HTML indicator
 */
function getPaymentStatusIndicator(status) {
    const indicators = {
        "on-time": '<span style="color: var(--color-success);">✓ On Time</span>',
        "overdue": '<span style="color: var(--color-error);">! Overdue</span>',
        "completed": '<span style="color: var(--color-success);">✓ Completed</span>',
        "pending": '<span style="color: var(--color-warning);">⚠ Pending</span>'
    };
    
    return indicators[status] || status;
}

/**
 * Calculate days until date
 * @param {string} dateString - ISO date string
 * @returns {number} - Days remaining (negative if past)
 */
function daysUntil(dateString) {
    if (!dateString) return null;
    
    const targetDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    
    const timeDiff = targetDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Get days remaining text
 * @param {string} dateString - ISO date string
 * @returns {string} - Human readable text
 */
function getDaysRemainingText(dateString) {
    const days = daysUntil(dateString);
    
    if (days === null) return "";
    if (days === 0) return "Due Today";
    if (days === 1) return "Due Tomorrow";
    if (days > 0) return `${days} days remaining`;
    if (days === -1) return "1 day overdue";
    return `${Math.abs(days)} days overdue`;
}

/**
 * Parse post type and return icon + label
 * @param {string} postType - Post type (ALERT, EVENT, RECOMMENDATION, TIP, etc.)
 * @returns {object} - { icon, label, color }
 */
function getPostTypeInfo(postType) {
    const types = {
        "ALERT": { icon: "🚨", label: "Alert", color: "var(--color-error)" },
        "EVENT": { icon: "🎉", label: "Event", color: "var(--color-info)" },
        "RECOMMENDATION": { icon: "⭐", label: "Recommendation", color: "var(--color-accent)" },
        "TIP": { icon: "💡", label: "Tip", color: "var(--color-warning)" },
        "LOST_FOUND": { icon: "🔍", label: "Lost & Found", color: "var(--color-warning)" },
        "MARKETPLACE": { icon: "🛍️", label: "Marketplace", color: "var(--color-accent)" },
        "ANNOUNCEMENT": { icon: "📢", label: "Announcement", color: "var(--color-info)" }
    };
    
    return types[postType] || { icon: "📝", label: postType, color: "var(--color-text-secondary)" };
}

/**
 * Build card HTML for service provider
 * @param {object} service - Service provider object
 * @returns {string} - HTML card
 */
function buildServiceCard(service) {
    const featured = service.featured ? '<span class="badge badge-primary" style="position: absolute; top: 12px; right: 12px;">⭐ Featured</span>' : '';
    const verified = service.verified ? '✓ Verified' : '';
    
    return `
        <div class="card" style="cursor: pointer; transition: all var(--transition-normal);">
            ${featured}
            <div style="margin-bottom: var(--spacing-md);">
                <h3>${service.name}</h3>
                <p style="color: var(--color-text-secondary); margin: 0;">${service.category}</p>
            </div>
            <div style="margin-bottom: var(--spacing-md);">
                <span class="text-accent text-bold">⭐ ${service.rating}</span>
                <span style="color: var(--color-text-secondary); font-size: 0.9em;">(${service.reviews} reviews)</span>
            </div>
            <p style="font-size: 0.9em; color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">
                ${service.description || ''}
            </p>
            <div style="display: flex; justify-content: space-between; font-size: 0.85em; color: var(--color-text-secondary); margin-top: auto;">
                <span>📱 ${service.responseTime}</span>
                <span>${verified}</span>
            </div>
        </div>
    `;
}

/**
 * Build community post HTML
 * @param {object} post - Post object
 * @returns {string} - HTML post
 */
function buildCommunityPost(post) {
    const postType = getPostTypeInfo(post.type);
    const timeAgo = getTimeAgo(post.timestamp);
    
    return `
        <div class="card" style="margin-bottom: var(--spacing-lg);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-md);">
                <div>
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm);">
                        <span style="font-size: 1.2em;">${postType.icon}</span>
                        <span class="text-bold">${post.author}</span>
                    </div>
                    <p style="color: var(--color-text-secondary); font-size: 0.85em; margin: 0;">${timeAgo}</p>
                </div>
            </div>
            <h4 style="margin-bottom: var(--spacing-sm);">${post.title}</h4>
            <p>${post.content}</p>
            <div style="display: flex; gap: var(--spacing-md); margin-top: var(--spacing-md); font-size: 0.9em; color: var(--color-text-secondary);">
                <span>👍 ${post.likes || 0}</span>
                <span>💬 ${post.comments || 0}</span>
            </div>
        </div>
    `;
}

/**
 * Initialize sidebar navigation active state
 */
function initializeSidebarNavigation() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const navItems = document.querySelectorAll('.nav-item, .nav-link');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Ensure user is authenticated and on correct dashboard
 * @param {string} requiredRole - Required role for this page
 */
function protectDashboard(requiredRole) {
    if (!AuthManager.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    const userRole = AuthManager.getRole();
    if (userRole !== requiredRole) {
        // Redirect to user's own dashboard
        window.location.href = `dashboard-${userRole}.html`;
    }
}

/**
 * Show loading spinner
 */
function showLoadingState() {
    const content = document.querySelector('.dashboard-content, .page-content');
    if (content) {
        content.innerHTML = '<div style="text-align: center; padding: 60px 20px;"><div class="spinner"></div><p>Loading...</p></div>';
    }
}

/**
 * Hide loading spinner (content populated via DOM manipulation)
 */
function hideLoadingState() {
    // Content is directly populated via JavaScript
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const content = document.querySelector('.dashboard-content, .page-content');
    if (content) {
        content.innerHTML = `<div class="alert alert-error">${message}</div>`;
    }
}

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get role label
 * @param {string} role - Role key
 * @returns {string} - Human-readable role name
 */
function getRoleLabel(role) {
    const labels = {
        tenant: 'Tenant',
        homeowner: 'Homeowner',
        landlord: 'Landlord',
        agent: 'Property Agent'
    };
    return labels[role] || role;
}

/**
 * Get occupancy rate color
 * @param {number} rate - Occupancy rate (0-100)
 * @returns {string} - Color code
 */
function getOccupancyColor(rate) {
    if (rate >= 90) return "var(--color-success)";
    if (rate >= 75) return "var(--color-warning)";
    return "var(--color-error)";
}

/**
 * Build property summary card
 * @param {object} property - Property object
 * @returns {string} - HTML card
 */
function buildPropertyCard(property) {
    return `
        <div class="card" style="cursor: pointer;">
            <h3>${property.name}</h3>
            <p style="color: var(--color-text-secondary); margin: var(--spacing-sm) 0;">${property.address}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin: var(--spacing-md) 0;">
                <div>
                    <p style="font-size: 0.9em; color: var(--color-text-secondary); margin: 0;">Units</p>
                    <p style="font-size: 1.3em; font-weight: bold; margin: 0;">${property.occupiedUnits}/${property.totalUnits}</p>
                </div>
                <div>
                    <p style="font-size: 0.9em; color: var(--color-text-secondary); margin: 0;">Occupancy</p>
                    <p style="font-size: 1.3em; font-weight: bold; margin: 0; color: ${getOccupancyColor(property.occupancyRate)};">${property.occupancyRate}%</p>
                </div>
            </div>
            <div style="border-top: 1px solid var(--color-border); padding-top: var(--spacing-md);">
                <p style="font-size: 0.9em; color: var(--color-text-secondary); margin: 0;">Monthly Revenue</p>
                <p style="font-size: 1.2em; font-weight: bold; margin: 0; color: var(--color-accent);">${formatCurrency(property.monthlyRevenue)}</p>
            </div>
        </div>
    `;
}

/**
 * Initialize dashboard on page load
 * @param {function} loadFunction - Function to call to load dashboard data
 */
function initializeDashboard(loadFunction) {
    document.addEventListener('DOMContentLoaded', function() {
        // Protect page
        const pathname = window.location.pathname;
        if (pathname.includes('dashboard-tenant')) {
            protectDashboard('tenant');
        } else if (pathname.includes('dashboard-homeowner')) {
            protectDashboard('homeowner');
        } else if (pathname.includes('dashboard-landlord')) {
            protectDashboard('landlord');
        }
        
        // Initialize navigation
        initializeSidebarNavigation();
        
        // Load dashboard data
        if (loadFunction && typeof loadFunction === 'function') {
            loadFunction();
        }
    });
}

console.log('HomeHub Utilities Module loaded - Ready for use');
