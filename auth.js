/**
 * HomeHub MVP - Authentication Module
 * Handles user login, signup, logout, and session management
 * 
 * Usage:
 *   - Include after config.js: <script src="js/config.js"></script><script src="js/auth.js"></script>
 *   - Use AuthManager for state: AuthManager.getUser(), AuthManager.isAuthenticated()
 *   - Use functions for actions: await handleLogin(email, password)
 */

/**
 * AuthManager - Singleton for managing authentication state
 */
class AuthManager {
    /**
     * Get stored JWT token
     * @returns {string|null} - JWT token or null
     */
    static getToken() {
        return localStorage.getItem(API_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    }

    /**
     * Store JWT token
     * @param {string} token - JWT token
     */
    static setToken(token) {
        if (token) {
            localStorage.setItem(API_CONFIG.STORAGE_KEYS.AUTH_TOKEN, token);
        }
    }

    /**
     * Get stored user data
     * @returns {object|null} - User object or null
     */
    static getUser() {
        const userData = localStorage.getItem(API_CONFIG.STORAGE_KEYS.USER_DATA);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Store user data
     * @param {object} user - User object
     */
    static setUser(user) {
        if (user) {
            localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(user));
            localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER_ROLE, user.role);
        }
    }

    /**
     * Get user's current role
     * @returns {string|null} - Role (tenant, homeowner, landlord, agent) or null
     */
    static getRole() {
        return localStorage.getItem(API_CONFIG.STORAGE_KEYS.USER_ROLE);
    }

    /**
     * Set user's role
     * @param {string} role - User role
     */
    static setRole(role) {
        if (role) {
            localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER_ROLE, role);
        }
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} - True if token exists and not expired
     */
    static isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;

        // Check if token is expired (basic check)
        const expiryTime = localStorage.getItem(API_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
        if (expiryTime && new Date().getTime() > parseInt(expiryTime)) {
            this.logout();
            return false;
        }

        return true;
    }

    /**
     * Redirect to login if not authenticated
     */
    static redirectToLogin() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    }

    /**
     * Redirect to appropriate dashboard based on role
     */
    static redirectToDashboard() {
        const role = this.getRole();
        if (role) {
            window.location.href = `dashboard-${role}.html`;
        } else {
            window.location.href = 'index.html';
        }
    }

    /**
     * Clear all authentication data (logout)
     */
    static logout() {
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER_DATA);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER_ROLE);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
    }

    /**
     * Get authorization header for API requests
     * @returns {object} - Headers object with Authorization
     */
    static getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }

    /**
     * Set session expiry time
     * @param {number} expiryMs - Expiry time in milliseconds from now
     */
    static setSessionExpiry(expiryMs = API_CONFIG.TIMEOUTS.SESSION) {
        const expiryTime = new Date().getTime() + expiryMs;
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.SESSION_EXPIRY, expiryTime.toString());
    }
}

/**
 * Handle user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<boolean>} - True if login successful
 */
async function handleLogin(email, password) {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.auth.login}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.trim(),
                password: password
            }),
            timeout: API_CONFIG.TIMEOUTS.API_CALL
        });

        if (response.status === 401) {
            console.error('Login failed: Invalid credentials');
            return false;
        }

        if (response.status === 503) {
            console.error('Server temporarily unavailable');
            throw new Error(API_CONFIG.ERRORS.SERVER_ERROR);
        }

        if (!response.ok) {
            console.error(`Login failed: ${response.status}`);
            return false;
        }

        const data = await response.json();

        if (!data.token || !data.user) {
            console.error('Login response missing token or user data');
            return false;
        }

        // Store authentication data
        AuthManager.setToken(data.token);
        AuthManager.setUser(data.user);
        AuthManager.setRole(data.user.role);
        AuthManager.setSessionExpiry();

        console.log('Login successful', { role: data.user.role });

        // Redirect to dashboard
        setTimeout(() => {
            AuthManager.redirectToDashboard();
        }, 100);

        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

/**
 * Handle user signup
 * @param {string} role - User role (tenant, homeowner, landlord, agent)
 * @param {string} name - Full name
 * @param {string} email - Email address
 * @param {string} password - Password
 * @param {string} phone - Phone number (optional)
 * @returns {Promise<boolean>} - True if signup successful
 */
async function handleSignup(role, name, email, password, phone = '') {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.auth.register}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role: role.trim(),
                name: name.trim(),
                email: email.trim(),
                password: password,
                phone: phone.trim()
            }),
            timeout: API_CONFIG.TIMEOUTS.API_CALL
        });

        if (response.status === 409) {
            console.error('Email already registered');
            throw new Error(API_CONFIG.ERRORS.EMAIL_EXISTS);
        }

        if (response.status === 400) {
            const error = await response.json();
            console.error('Signup validation failed:', error);
            return false;
        }

        if (response.status === 503) {
            console.error('Server temporarily unavailable');
            throw new Error(API_CONFIG.ERRORS.SERVER_ERROR);
        }

        if (!response.ok) {
            console.error(`Signup failed: ${response.status}`);
            return false;
        }

        const data = await response.json();

        if (!data.token || !data.user) {
            console.error('Signup response missing token or user data');
            return false;
        }

        // Store authentication data
        AuthManager.setToken(data.token);
        AuthManager.setUser(data.user);
        AuthManager.setRole(data.user.role);
        AuthManager.setSessionExpiry();

        console.log('Signup successful', { role: data.user.role });

        // Redirect to dashboard
        setTimeout(() => {
            AuthManager.redirectToDashboard();
        }, 100);

        return true;
    } catch (error) {
        console.error('Signup error:', error);
        return false;
    }
}

/**
 * Handle user logout
 * Clears all authentication data and redirects to landing page
 */
function handleLogout() {
    AuthManager.logout();
    window.location.href = 'index.html';
}

/**
 * Check authentication and protect pages
 * Call at the beginning of authenticated pages
 * Redirects to login if not authenticated
 */
function protectPage() {
    if (!AuthManager.isAuthenticated()) {
        window.location.href = 'login.html';
    }
}

/**
 * Get common API headers with authentication
 * Use this for all fetch requests to the API
 * @returns {object} - Headers object
 */
function getApiHeaders() {
    return AuthManager.getAuthHeaders();
}

/**
 * Make authenticated API call
 * Automatically adds auth token and handles errors
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object|null>} - Response data or null on error
 */
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: getApiHeaders(),
        timeout: API_CONFIG.TIMEOUTS.API_CALL
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, config);

        // Handle authentication errors
        if (response.status === 401) {
            AuthManager.logout();
            window.location.href = 'login.html';
            return null;
        }

        // Handle forbidden
        if (response.status === 403) {
            console.error(API_CONFIG.ERRORS.FORBIDDEN);
            return null;
        }

        // Handle not found
        if (response.status === 404) {
            console.error(API_CONFIG.ERRORS.NOT_FOUND);
            return null;
        }

        // Handle server error
        if (response.status >= 500) {
            console.error(API_CONFIG.ERRORS.SERVER_ERROR);
            return null;
        }

        // Success responses
        if (response.ok) {
            if (response.status === 204) {
                // No content
                return { success: true };
            }
            return await response.json();
        }

        // Other errors
        console.error(`API error: ${response.status}`);
        return null;
    } catch (error) {
        console.error('API call error:', error);
        return null;
    }
}

/**
 * Refresh authentication token
 * Used when token is about to expire
 * @returns {Promise<boolean>} - True if refresh successful
 */
async function refreshToken() {
    try {
        const token = AuthManager.getToken();
        if (!token) return false;

        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.auth.refresh}`, {
            method: 'POST',
            headers: getApiHeaders(),
            timeout: API_CONFIG.TIMEOUTS.API_CALL
        });

        if (!response.ok) {
            AuthManager.logout();
            return false;
        }

        const data = await response.json();
        if (data.token) {
            AuthManager.setToken(data.token);
            AuthManager.setSessionExpiry();
            return true;
        }

        return false;
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}

/**
 * Initialize authentication checks on page load
 * Call this in the DOMContentLoaded event
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check session expiry periodically
    setInterval(() => {
        if (AuthManager.isAuthenticated()) {
            const expiryTime = localStorage.getItem(API_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
            if (expiryTime) {
                const timeRemaining = parseInt(expiryTime) - new Date().getTime();
                // Refresh token if less than 5 minutes remaining
                if (timeRemaining < 300000 && timeRemaining > 0) {
                    refreshToken();
                }
            }
        }
    }, 60000); // Check every minute
});

console.log('HomeHub Authentication module loaded - Ready for use');
