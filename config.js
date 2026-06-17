/**
 * HomeHub MVP - Centralized Configuration
 * Shared across all pages and components
 * 
 * Usage: 
 *   - Import in every HTML file: <script src="js/config.js"></script>
 *   - Access API endpoints: API_CONFIG.ENDPOINTS.auth.login
 *   - Access storage keys: API_CONFIG.STORAGE_KEYS.AUTH_TOKEN
 */

const API_CONFIG = {
    /**
     * Backend API Base URL
     * Production: https://homehub-api-ipp6.onrender.com
     * Development: http://localhost:3000
     */
    BASE_URL: "https://homehub-api-ipp6.onrender.com",

    /**
     * API Endpoints - Organized by feature
     */
    ENDPOINTS: {
        // Authentication endpoints (MUST match backend)
        auth: {
            login: "/api/auth/login",           // POST - User login
            register: "/api/auth/register",     // POST - User registration
            logout: "/api/auth/logout",         // POST - User logout (future)
            refresh: "/api/auth/refresh",       // POST - Token refresh (future)
            verify: "/api/auth/verify"          // GET - Verify token (future)
        },

        // Payment endpoints
        payments: {
            pay_rent: "/api/payments/pay-rent",
            history: "/api/payments/history",
            collections: "/api/payments/collections",
            overdue: "/api/payments/overdue",
            create_receipt: "/api/payments/receipt",
            download_receipt: "/api/payments/receipt/:id/download"
        },

        // Utility endpoints
        utilities: {
            consumption: "/api/utilities/consumption",
            billing: "/api/utilities/billing",
            types: "/api/utilities/types",
            monthly_data: "/api/utilities/monthly/:month",
            building_comparison: "/api/utilities/building-avg"
        },

        // Maintenance endpoints
        maintenance: {
            create_request: "/api/maintenance/request",
            list_requests: "/api/maintenance/requests",
            get_request: "/api/maintenance/request/:id",
            update_status: "/api/maintenance/:id/status",
            get_providers: "/api/maintenance/providers",
            suggest_providers: "/api/maintenance/providers/suggest",
            rate_service: "/api/maintenance/:id/rate"
        },

        // Community endpoints
        community: {
            posts: "/api/community/posts",
            create_post: "/api/community/posts/create",
            get_post: "/api/community/post/:id",
            delete_post: "/api/community/post/:id/delete",
            get_alerts: "/api/community/alerts",
            get_events: "/api/community/events",
            rsvp_event: "/api/community/event/:id/rsvp",
            like_post: "/api/community/post/:id/like"
        },

        // Service endpoints
        services: {
            list_services: "/api/services/list",
            featured_services: "/api/services/featured",
            categories: "/api/services/categories",
            get_provider: "/api/services/provider/:id",
            rate_provider: "/api/services/provider/:id/rate",
            get_reviews: "/api/services/provider/:id/reviews",
            request_quote: "/api/services/provider/:id/quote"
        },

        // User endpoints
        users: {
            profile: "/api/users/profile",
            settings: "/api/users/settings",
            update_settings: "/api/users/settings/update",
            update_profile: "/api/users/profile/update",
            change_password: "/api/users/password/change",
            preferences: "/api/users/preferences",
            notifications: "/api/users/notifications"
        },

        // Dashboard endpoints
        dashboard: {
            tenant: "/api/dashboard/tenant",
            homeowner: "/api/dashboard/homeowner",
            landlord: "/api/dashboard/landlord",
            agent: "/api/dashboard/agent",
            notifications: "/api/dashboard/notifications"
        }
    },

    /**
     * Local Storage Keys
     * Used to persist user data and tokens
     */
    STORAGE_KEYS: {
        AUTH_TOKEN: "homehub_token",
        USER_DATA: "homehub_user",
        USER_ROLE: "homehub_role",
        REFRESH_TOKEN: "homehub_refresh_token",
        SESSION_EXPIRY: "homehub_session_expiry"
    },

    /**
     * Supported User Roles
     * Maps to dashboard-[role].html
     */
    ROLES: {
        TENANT: "tenant",
        HOMEOWNER: "homeowner",
        LANDLORD: "landlord",
        AGENT: "agent"
    },

    /**
     * Timeout values (in milliseconds)
     */
    TIMEOUTS: {
        API_CALL: 30000,        // 30 seconds for API calls
        SESSION: 3600000,       // 1 hour session timeout
        DEBOUNCE: 500,          // 500ms debounce for search
        RETRY_DELAY: 1000       // 1 second before retry
    },

    /**
     * Pagination defaults
     */
    PAGINATION: {
        PAGE_SIZE: 20,
        MAX_PAGE_SIZE: 100,
        DEFAULT_PAGE: 1
    },

    /**
     * Feature Flags - Enable/disable features
     * Useful for gradual rollout or A/B testing
     */
    FEATURES: {
        CHAT: false,            // Deferred to Phase 2
        AGENT_DASHBOARD: false, // Deferred to Phase 2
        ADVANCED_ANALYTICS: false, // Phase 2
        DARK_MODE: false        // Future feature
    },

    /**
     * Error messages
     */
    ERRORS: {
        UNAUTHORIZED: "Unauthorized. Please login again.",
        FORBIDDEN: "You don't have permission for this action.",
        NOT_FOUND: "Resource not found.",
        BAD_REQUEST: "Invalid request. Please check your input.",
        SERVER_ERROR: "Server error. Please try again later.",
        NETWORK_ERROR: "Network error. Please check your connection.",
        TIMEOUT: "Request timed out. Please try again.",
        INVALID_CREDENTIALS: "Invalid email or password.",
        EMAIL_EXISTS: "Email already registered.",
        SESSION_EXPIRED: "Your session has expired. Please login again."
    },

    /**
     * API Response Status Codes
     */
    STATUS: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503
    },

    /**
     * Phone number formatting (Kenya)
     */
    PHONE: {
        COUNTRY_CODE: "+254",
        FORMATS: {
            INTERNATIONAL: "+254XXXXXXXXX",
            NATIONAL: "07XX XXX XXX"
        }
    },

    /**
     * Currency settings
     */
    CURRENCY: {
        CODE: "KES",
        SYMBOL: "KES ",
        DECIMAL_PLACES: 0
    },

    /**
     * Date formats
     */
    DATE_FORMAT: "DD MMM YYYY",
    TIME_FORMAT: "HH:mm",

    /**
     * Utility type enum
     */
    UTILITY_TYPES: {
        ELECTRICITY: "electricity",
        WATER: "water",
        INTERNET: "internet",
        SERVICE_CHARGE: "service_charge",
        SECURITY_LEVY: "security_levy"
    },

    /**
     * Community post types
     */
    POST_TYPES: {
        ALERT: "alert",
        EVENT: "event",
        RECOMMENDATION: "recommendation",
        TIP: "tip",
        LOST_FOUND: "lost_found",
        MARKETPLACE: "marketplace",
        ANNOUNCEMENT: "announcement"
    },

    /**
     * Helper function: Get API URL
     * @param {string} endpoint - Endpoint key (e.g., 'auth.login')
     * @returns {string} - Full API URL
     */
    getApiUrl: function(endpoint) {
        const keys = endpoint.split('.');
        let url = API_CONFIG.BASE_URL;
        
        let current = API_CONFIG.ENDPOINTS;
        for (const key of keys) {
            if (current[key]) {
                current = current[key];
            }
        }
        
        if (typeof current === 'string') {
            url += current;
        }
        
        return url;
    },

    /**
     * Helper function: Format currency
     * @param {number} amount - Amount in KES
     * @returns {string} - Formatted currency string
     */
    formatCurrency: function(amount) {
        return this.CURRENCY.SYMBOL + amount.toLocaleString('en-US', {
            minimumFractionDigits: this.CURRENCY.DECIMAL_PLACES,
            maximumFractionDigits: this.CURRENCY.DECIMAL_PLACES
        });
    },

    /**
     * Helper function: Format date
     * @param {string|Date} date - Date to format
     * @returns {string} - Formatted date string
     */
    formatDate: function(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        
        return date.toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    /**
     * Helper function: Format phone number
     * @param {string} phone - Phone number
     * @returns {string} - Formatted phone number
     */
    formatPhone: function(phone) {
        // Remove all non-digits
        phone = phone.replace(/\D/g, '');
        
        // Handle Kenya numbers
        if (phone.startsWith('254')) {
            phone = '+' + phone;
        } else if (phone.startsWith('7')) {
            phone = '+254' + phone;
        } else if (phone.startsWith('0')) {
            phone = '+254' + phone.substring(1);
        }
        
        return phone;
    },

    /**
     * Helper function: Get role label
     * @param {string} role - Role key
     * @returns {string} - Human-readable role name
     */
    getRoleLabel: function(role) {
        const labels = {
            tenant: 'Tenant',
            homeowner: 'Homeowner',
            landlord: 'Landlord',
            agent: 'Property Agent'
        };
        return labels[role] || role;
    }
};

// Export for Node.js environments (if used)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}

console.log('HomeHub API Config loaded - Ready for use');
