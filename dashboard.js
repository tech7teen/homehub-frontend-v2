/**
 * HomeHub MVP - Dashboard Module
 * Frontend-first approach with mock data
 * This module serves as the specification for HomeHub API v2
 * 
 * Data structure and flows defined here will drive backend API design
 */

/**
 * Mock user data - represents different personas
 */
const mockUsers = {
    tenant: {
        id: "usr_tenant_001",
        name: "Sarah Mwangi",
        email: "sarah.mwangi@email.com",
        phone: "+254712345678",
        role: "tenant",
        building: "Lavington Residences",
        unit: "Unit 305",
        moveInDate: "2023-06-15",
        avatar: "https://via.placeholder.com/40"
    },
    homeowner: {
        id: "usr_homeowner_001",
        name: "James Kipchoge",
        email: "james.kipchoge@email.com",
        phone: "+254723456789",
        role: "homeowner",
        building: "Westlands View Apartments",
        unit: "Unit 402",
        ownershipDate: "2020-03-20",
        avatar: "https://via.placeholder.com/40"
    },
    landlord: {
        id: "usr_landlord_001",
        name: "Grace Kariuki",
        email: "grace.kariuki@email.com",
        phone: "+254734567890",
        role: "landlord",
        companyName: "Kariuki Properties Ltd",
        registeredProperties: 12,
        avatar: "https://via.placeholder.com/40"
    }
};

/**
 * Mock tenant dashboard data
 * Shows: rent payments, maintenance, community, utilities view-only
 */
const mockTenantDashboard = {
    user: mockUsers.tenant,
    financial: {
        rentDue: 15000,
        dueDate: "2026-07-05",
        lastPayment: {
            amount: 15000,
            date: "2026-06-05",
            status: "completed"
        },
        paidThisYear: 90000,
        paymentStatus: "on-time"
    },
    maintenance: {
        pendingRequests: 1,
        completedThisMonth: 2,
        recentRequests: [
            {
                id: "maint_001",
                issue: "Leaking kitchen tap",
                status: "in-progress",
                reportedDate: "2026-06-10",
                assignedTo: "Plumbing Plus Ltd",
                priority: "medium"
            }
        ]
    },
    community: {
        buildingUpdates: [
            {
                id: "post_001",
                type: "ALERT",
                title: "Water Maintenance",
                content: "Water supply will be interrupted on Saturday 3-6pm",
                author: "Building Management",
                timestamp: "2026-06-14",
                icon: "🚨"
            },
            {
                id: "post_002",
                type: "EVENT",
                title: "Community Gathering",
                content: "Join us for coffee in the courtyard this Sunday at 3pm",
                author: "Community Organizer",
                timestamp: "2026-06-13",
                icon: "🎉"
            }
        ],
        connections: 8,
        buildingMembers: 24
    },
    utilities: {
        currentMonth: {
            electricity: { usage: 245, cost: 3500, status: "normal" },
            water: { usage: 42, cost: 1200, status: "normal" },
            internet: { usage: "unlimited", cost: 2000, status: "active" }
        },
        monthlyTrend: [
            { month: "Apr", cost: 6200 },
            { month: "May", cost: 6800 },
            { month: "Jun", cost: 6700 }
        ]
    },
    suggestedServices: [
        {
            id: "svc_001",
            name: "Elite Plumbing Services",
            category: "Plumbing",
            rating: 4.8,
            reviews: 156,
            responseTime: "30 mins",
            featured: true
        },
        {
            id: "svc_002",
            name: "Quick Electrical",
            category: "Electrical",
            rating: 4.6,
            reviews: 89,
            responseTime: "45 mins",
            featured: true
        }
    ]
};

/**
 * Mock homeowner dashboard data
 * Shows: utilities, security, services, community
 */
const mockHomeownerDashboard = {
    user: mockUsers.homeowner,
    property: {
        address: "Westlands View Apartments, Unit 402, Nairobi",
        owner: "James Kipchoge",
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1850,
        occupancyStatus: "owner-occupied"
    },
    expenses: {
        thisMonth: {
            electricity: 3500,
            water: 1200,
            internet: 2000,
            serviceCharge: 5000,
            securityLevy: 2000,
            total: 13700
        },
        monthlyTrend: [
            { month: "Apr", total: 13200 },
            { month: "May", total: 14100 },
            { month: "Jun", total: 13700 }
        ]
    },
    utilities: {
        electricity: {
            thisMonth: 245,
            lastMonth: 268,
            trend: "decreasing",
            cost: 3500,
            buildingAverage: 280,
            conservationScore: 88
        },
        water: {
            thisMonth: 42,
            lastMonth: 48,
            trend: "decreasing",
            cost: 1200,
            buildingAverage: 55,
            conservationScore: 92
        },
        internet: {
            status: "active",
            speed: "100Mbps",
            cost: 2000
        }
    },
    security: {
        alerts: [
            {
                id: "sec_001",
                type: "visitor",
                title: "Visitor Logged",
                content: "Visitor logged at main gate at 14:30",
                timestamp: "2026-06-14T14:30:00Z",
                severity: "info"
            },
            {
                id: "sec_002",
                type: "maintenance",
                title: "CCTV System Check",
                content: "Routine CCTV system maintenance completed successfully",
                timestamp: "2026-06-12T10:00:00Z",
                severity: "success"
            }
        ],
        accessControl: "enabled",
        cctv: "active",
        alarmSystem: "armed"
    },
    community: {
        events: [
            {
                id: "evt_001",
                title: "Building AGM",
                date: "2026-07-15",
                time: "18:00",
                location: "Community Hall",
                rsvpCount: 24
            },
            {
                id: "evt_002",
                title: "Fitness Class",
                date: "2026-06-18",
                time: "06:30",
                location: "Gym",
                rsvpCount: 12
            }
        ],
        recentPosts: [
            {
                id: "post_001",
                type: "RECOMMENDATION",
                author: "David Ochieng",
                content: "Excellent plumber! Fixed my leaking pipe in 30 minutes",
                timestamp: "2026-06-13",
                likes: 15
            }
        ]
    },
    suggestedServices: [
        {
            id: "svc_001",
            name: "Elite Plumbing Services",
            category: "Plumbing",
            rating: 4.8,
            reviews: 156,
            featured: true,
            cost: "KES 2,000 - 10,000"
        },
        {
            id: "svc_003",
            name: "Home Cleaning Pro",
            category: "Cleaning",
            rating: 4.9,
            reviews: 203,
            featured: true,
            cost: "KES 1,500 - 5,000"
        },
        {
            id: "svc_004",
            name: "Garden Design Studio",
            category: "Landscaping",
            rating: 4.7,
            reviews: 87,
            featured: false,
            cost: "KES 5,000 - 25,000"
        }
    ]
};

/**
 * Mock landlord dashboard data
 * Shows: properties, collections, occupancy, tenants
 */
const mockLandlordDashboard = {
    user: mockUsers.landlord,
    portfolio: {
        totalProperties: 12,
        occupiedUnits: 11,
        occupancyRate: 91.7,
        totalTenants: 11
    },
    collections: {
        thisMonth: {
            due: 165000,
            collected: 150000,
            overdue: 15000,
            collectionRate: 90.9
        },
        trend: [
            { month: "Apr", collected: 155000 },
            { month: "May", collected: 165000 },
            { month: "Jun", collected: 150000 }
        ]
    },
    properties: [
        {
            id: "prop_001",
            name: "Lavington Residences",
            address: "Lavington, Nairobi",
            totalUnits: 24,
            occupiedUnits: 22,
            occupancyRate: 91.7,
            rentPerUnit: 15000,
            monthlyRevenue: 330000,
            status: "active"
        },
        {
            id: "prop_002",
            name: "Westlands View Apartments",
            address: "Westlands, Nairobi",
            totalUnits: 18,
            occupiedUnits: 16,
            occupancyRate: 88.9,
            rentPerUnit: 18000,
            monthlyRevenue: 288000,
            status: "active"
        },
        {
            id: "prop_003",
            name: "Karen Gardens",
            address: "Karen, Nairobi",
            totalUnits: 12,
            occupiedUnits: 12,
            occupancyRate: 100,
            rentPerUnit: 22000,
            monthlyRevenue: 264000,
            status: "active"
        }
    ],
    tenants: [
        {
            id: "ten_001",
            name: "Sarah Mwangi",
            property: "Lavington Residences",
            unit: "Unit 305",
            rentDue: 15000,
            dueDate: "2026-07-05",
            lastPayment: "2026-06-05",
            paymentStatus: "on-time"
        },
        {
            id: "ten_002",
            name: "Peter Otieno",
            property: "Lavington Residences",
            unit: "Unit 201",
            rentDue: 15000,
            dueDate: "2026-07-05",
            lastPayment: "2026-06-08",
            paymentStatus: "overdue"
        },
        {
            id: "ten_003",
            name: "Amina Hassan",
            property: "Westlands View Apartments",
            unit: "Unit 105",
            rentDue: 18000,
            dueDate: "2026-07-10",
            lastPayment: "2026-06-10",
            paymentStatus: "on-time"
        }
    ],
    overdueTenants: [
        {
            id: "ten_002",
            name: "Peter Otieno",
            property: "Lavington Residences",
            unit: "Unit 201",
            daysOverdue: 9,
            amountDue: 15000
        }
    ],
    maintenanceRequests: [
        {
            id: "maint_001",
            property: "Lavington Residences",
            unit: "Unit 305",
            issue: "Leaking kitchen tap",
            status: "in-progress",
            reportedDate: "2026-06-10",
            estimatedCost: 2000
        },
        {
            id: "maint_002",
            property: "Westlands View Apartments",
            unit: "Unit 402",
            issue: "Broken door lock",
            status: "completed",
            reportedDate: "2026-06-08",
            actualCost: 3500
        }
    ]
};

/**
 * Get mock dashboard data by role
 * @param {string} role - User role (tenant, homeowner, landlord)
 * @returns {object} - Mock dashboard data
 */
function getMockDashboard(role) {
    const dashboards = {
        tenant: mockTenantDashboard,
        homeowner: mockHomeownerDashboard,
        landlord: mockLandlordDashboard
    };
    return dashboards[role] || mockTenantDashboard;
}

/**
 * Get mock user by role
 * @param {string} role - User role
 * @returns {object} - Mock user data
 */
function getMockUser(role) {
    return mockUsers[role] || mockUsers.tenant;
}

/**
 * Mock data for payments page
 */
const mockPaymentsData = {
    tenant: {
        amountDue: 15000,
        dueDate: "2026-07-05",
        paymentMethods: ["M-Pesa", "Bank Transfer", "Cheque"],
        history: [
            { date: "2026-06-05", amount: 15000, status: "completed" },
            { date: "2026-05-05", amount: 15000, status: "completed" },
            { date: "2026-04-05", amount: 15000, status: "completed" }
        ]
    },
    landlord: {
        totalDue: 165000,
        totalCollected: 150000,
        totalOverdue: 15000,
        byProperty: [
            { property: "Lavington Residences", due: 60000, collected: 55000 },
            { property: "Westlands View Apartments", due: 54000, collected: 54000 },
            { property: "Karen Gardens", due: 51000, collected: 41000 }
        ]
    }
};

/**
 * Mock data for utilities page
 */
const mockUtilitiesData = {
    currentMonth: {
        electricity: {
            type: "Electricity",
            usage: 245,
            unit: "kWh",
            cost: 3500,
            meterReading: { start: 2400, end: 2645 },
            status: "normal"
        },
        water: {
            type: "Water",
            usage: 42,
            unit: "m³",
            cost: 1200,
            meterReading: { start: 150, end: 192 },
            status: "normal"
        },
        internet: {
            type: "Internet",
            usage: "unlimited",
            cost: 2000,
            status: "active"
        },
        serviceCharge: {
            type: "Service Charge",
            cost: 5000,
            billingCycle: "monthly",
            status: "paid"
        },
        securityLevy: {
            type: "Security Levy",
            cost: 2000,
            billingCycle: "monthly",
            status: "paid"
        }
    },
    historicalData: [
        { month: "April", electricity: 3200, water: 1100, internet: 2000, serviceCharge: 5000, securityLevy: 2000 },
        { month: "May", electricity: 3800, water: 1350, internet: 2000, serviceCharge: 5000, securityLevy: 2000 },
        { month: "June", electricity: 3500, water: 1200, internet: 2000, serviceCharge: 5000, securityLevy: 2000 }
    ]
};

/**
 * Mock data for maintenance page
 */
const mockMaintenanceData = {
    requests: [
        {
            id: "maint_001",
            issue: "Leaking kitchen tap",
            category: "Plumbing",
            severity: "medium",
            status: "in-progress",
            reportedDate: "2026-06-10",
            description: "Kitchen tap is dripping constantly",
            images: ["image1.jpg"],
            assignedProvider: "Plumbing Plus Ltd",
            estimatedCompletion: "2026-06-16"
        },
        {
            id: "maint_002",
            issue: "Broken ceiling light",
            category: "Electrical",
            severity: "low",
            status: "completed",
            reportedDate: "2026-06-08",
            description: "Ceiling light in living room not working",
            completedDate: "2026-06-12"
        }
    ],
    categories: [
        "Plumbing",
        "Electrical",
        "Carpentry",
        "Painting",
        "General Repairs",
        "Appliance Repair",
        "Other"
    ],
    suggestedProviders: [
        {
            id: "svc_001",
            name: "Elite Plumbing Services",
            category: "Plumbing",
            rating: 4.8,
            reviews: 156,
            responseTime: "30 mins",
            featured: true
        },
        {
            id: "svc_005",
            name: "Quick Electrical",
            category: "Electrical",
            rating: 4.6,
            reviews: 89,
            responseTime: "45 mins",
            featured: true
        }
    ]
};

/**
 * Mock data for community/neighbourhood page
 */
const mockCommunityData = {
    posts: [
        {
            id: "post_001",
            type: "ALERT",
            author: "Building Management",
            authorAvatar: "https://via.placeholder.com/32",
            title: "Water Maintenance",
            content: "Water supply will be interrupted on Saturday 3-6pm for maintenance",
            timestamp: "2026-06-14T10:00:00Z",
            likes: 8,
            comments: 3
        },
        {
            id: "post_002",
            type: "EVENT",
            author: "Community Team",
            authorAvatar: "https://via.placeholder.com/32",
            title: "Community Gathering",
            content: "Join us for coffee in the courtyard this Sunday at 3pm. All residents welcome!",
            eventDate: "2026-06-18",
            eventTime: "15:00",
            timestamp: "2026-06-13T14:00:00Z",
            likes: 24,
            comments: 7
        },
        {
            id: "post_003",
            type: "RECOMMENDATION",
            author: "David Ochieng",
            authorAvatar: "https://via.placeholder.com/32",
            title: "Great Plumber!",
            content: "Highly recommend Elite Plumbing. Fixed my leaking pipe in 30 minutes. Professional and affordable!",
            timestamp: "2026-06-13T08:30:00Z",
            likes: 15,
            comments: 2
        },
        {
            id: "post_004",
            type: "TIP",
            author: "Green Living Initiative",
            authorAvatar: "https://via.placeholder.com/32",
            title: "Save Water: Fixing Leaks",
            content: "A dripping tap can waste up to 15 liters per day. Check your taps and fix leaks promptly.",
            timestamp: "2026-06-12T16:00:00Z",
            likes: 31,
            comments: 5
        }
    ],
    events: [
        {
            id: "evt_001",
            title: "Building AGM",
            date: "2026-07-15",
            time: "18:00",
            location: "Community Hall",
            description: "Annual General Meeting for all building residents",
            rsvpCount: 24
        },
        {
            id: "evt_002",
            title: "Fitness Class",
            date: "2026-06-18",
            time: "06:30",
            location: "Gym",
            description: "Early morning yoga and stretching class",
            rsvpCount: 12
        }
    ]
};

/**
 * Mock services/providers data
 */
const mockServicesData = {
    featured: [
        {
            id: "svc_001",
            name: "Elite Plumbing Services",
            category: "Plumbing",
            description: "Professional plumbing services for residential and commercial properties",
            rating: 4.8,
            reviews: 156,
            responseTime: "30 mins",
            costRange: "2,000 - 10,000 KES",
            verified: true,
            featured: true
        },
        {
            id: "svc_003",
            name: "Home Cleaning Pro",
            category: "Cleaning",
            description: "Comprehensive home cleaning and maintenance services",
            rating: 4.9,
            reviews: 203,
            responseTime: "Same day",
            costRange: "1,500 - 5,000 KES",
            verified: true,
            featured: true
        },
        {
            id: "svc_005",
            name: "Quick Electrical",
            category: "Electrical",
            description: "Fast and reliable electrical services",
            rating: 4.6,
            reviews: 89,
            responseTime: "45 mins",
            costRange: "1,000 - 8,000 KES",
            verified: true,
            featured: true
        },
        {
            id: "svc_006",
            name: "Painter's Choice",
            category: "Painting",
            description: "Interior and exterior painting services",
            rating: 4.7,
            reviews: 124,
            responseTime: "1 hour",
            costRange: "3,000 - 15,000 KES",
            verified: true,
            featured: true
        }
    ],
    all: [
        // Featured + additional services
    ]
};

/**
 * Format currency for display
 * @param {number} amount - Amount in KES
 * @returns {string} - Formatted string
 */
function formatCurrency(amount) {
    return "KES " + amount.toLocaleString('en-US');
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Format time for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted time
 */
function formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('en-KE', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Get time ago string
 * @param {string} dateString - ISO date string
 * @returns {string} - Relative time
 */
function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
    if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
    if (seconds < 604800) return Math.floor(seconds / 86400) + "d ago";
    
    return formatDate(dateString);
}

console.log('HomeHub Dashboard Module loaded - Mock data ready');
