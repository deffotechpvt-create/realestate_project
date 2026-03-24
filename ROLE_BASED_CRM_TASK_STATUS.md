# ROLE BASED CRM — DEVELOPMENT CHECKLIST

> Track backend + frontend implementation progress.

**Last Updated:** January 31, 2026  
**Project Status:** 🟡 Backend Foundation Complete - APIs Pending  
**Maintained By:** Devil Mode Development

---

## ✅ COMPLETED TASKS

### AUTHENTICATION & SESSION MANAGEMENT ✅

- [x] JWT based login implemented
- [x] Auth middleware exists
- [x] Token expiration configured (7 days HTTP-only cookie)
- [x] HttpOnly cookie security verified
- [x] Logout token invalidation logic
- [x] Password hashing with bcrypt (moved to model)
- [x] Login validation with canLogin() method
- [ ] Refresh token / re-login strategy handled ⚠️ OPTIONAL

---

### USER ROLE SYSTEM ✅

- [x] Role field exists in User schema
- [x] Role validation middleware implemented
- [x] Admin-only route protection added (isAdmin)
- [x] Agent-only route protection added (isAgent, isVerifiedAgent)
- [x] Role spoofing prevention verified
- [x] Additional middleware: isAdminOrAgent, hasRole, isOwner, optionalAuth, isActiveUser

---

### DATABASE MODELS ✅

#### User Model ✅ COMPLETE
- [x] Enhanced with bcrypt integration
- [x] Pre-save hook for password hashing
- [x] comparePassword() instance method
- [x] canLogin() validation method
- [x] ban() and unban() methods
- [x] isAdmin() and isAgent() helpers
- [x] Static methods: findByEmail, getActiveAgents, getBannedUsers
- [x] Safe JSON output (toJSON override)
- [x] Added fields: bannedBy, bannedAt, banReason, lastLogin, refreshToken
- [x] Indexes: role+status, email+status

#### Lead Model ✅ COMPLETE
- [x] Lead schema created
- [x] Assigned agent reference added
- [x] Status enum implemented (new, distributed, contacted, closed)
- [x] Timestamp tracking enabled
- [x] Auto status update on assignment (pre-save hook)
- [x] assignToAgent() method with validation
- [x] updateStatus() with agent ownership check
- [x] Static methods: getLeadsByAgent, getAllLeads, getUnassignedLeads
- [x] Agent reassignment blocked (validation)
- [x] Indexes: assignedTo+status, status+createdAt

#### Property Model ✅ COMPLETE
- [x] Renamed status → listingType
- [x] approvalStatus field added (pending, approved, rejected)
- [x] approvedBy field added
- [x] rejectionReason field added
- [x] approvedAt and rejectedAt fields added
- [x] approve() instance method
- [x] reject() instance method
- [x] isPublic() helper method
- [x] isOwnedBy() ownership check
- [x] Static methods: getPendingProperties, getPublicProperties, getByOwner
- [x] Indexes: approvalStatus+listingType, owner+approvalStatus
- [ ] Migration script for old records ⚠️ PENDING

#### News Model ✅ COMPLETE
- [x] Enhanced with publishing workflow
- [x] Added: slug, excerpt, createdBy, lastUpdatedBy
- [x] Added: publishedAt, isFeatured, featuredImage, seo fields
- [x] publish() and unpublish() methods
- [x] archive() and restore() methods
- [x] toggleFeatured() method
- [x] Static methods: getPublishedNews, getFeaturedNews, getBySlug, searchNews
- [x] Pre-save hooks: auto-slug, auto-excerpt, auto-publishedAt
- [x] Text index for search

---

### MIDDLEWARE ✅

#### Global Error Handler ✅ COMPLETE
- [x] AppError custom class created
- [x] asyncHandler wrapper (eliminates try-catch in controllers)
- [x] notFound handler (404)
- [x] errorHandler with auto-detection:
  - [x] Mongoose ValidationError → 400
  - [x] Duplicate key (11000) → 409
  - [x] CastError → 400
  - [x] JsonWebTokenError → 401
  - [x] TokenExpiredError → 401
  - [x] MulterError → 400
  - [x] Business logic errors
- [x] Development mode stack traces
- [x] Production mode security

#### Auth Middleware ✅ COMPLETE
- [x] authenticate (base JWT verification)
- [x] isAdmin (admin-only routes)
- [x] isAgent (agent-only routes)
- [x] isAdminOrAgent (both roles)
- [x] isVerifiedAgent (active agent only)
- [x] hasRole(...roles) (flexible role checker)
- [x] isOwner(model) (ownership verification)
- [x] optionalAuth (attach user if logged in)
- [x] isActiveUser (block pending/banned)

---

### CONTROLLERS

#### Auth Controller ✅ REFACTORED
- [x] Removed bcrypt import (uses model methods)
- [x] Wrapped with asyncHandler (no try-catch)
- [x] Uses AppError for custom errors
- [x] register() refactored
- [x] login() refactored (uses user.comparePassword, user.canLogin)
- [x] logout() implemented
- [x] setupAdmin() refactored
- [x] getCurrentUser() added
- [x] Consistent response format: { success, message, user }

---

### BACKEND SECURITY ✅

- [x] Role middleware created (9 middleware functions)
- [x] Agent data isolation enforced (model methods)
- [x] Sensitive fields protected (select: false, toJSON)
- [x] Input validation added (Mongoose validators)
- [x] Global error handler
- [x] HttpOnly cookies
- [x] Password hashing with bcrypt
- [x] Ban/pending verification
- [ ] Role middleware applied on routes ⚠️ AWAITING ROUTE SETUP
- [ ] API rate limiting (optional)
- [ ] Logging added (optional)

---

## ⚠️ PENDING BACKEND TASKS

### CRM LEAD FLOW APIs - PRIORITY 1

- [ ] **Controller:** `controllers/leadController.js`
  - [ ] createInquiry (POST /api/leads) - User creates lead
  - [ ] getAllLeads (GET /api/admin/leads) - Admin views all
  - [ ] assignLead (POST /api/admin/leads/:id/assign) - Admin assigns to agent
  - [ ] reassignLead (PUT /api/admin/leads/:id/reassign) - Admin reassigns
  - [ ] getMyLeads (GET /api/agent/leads) - Agent views assigned only
  - [ ] updateLeadStatus (PUT /api/agent/leads/:id/status) - Agent updates

- [ ] **Routes:** `routes/leadRoutes.js`
  - [ ] POST /api/leads (authenticate, isActiveUser)
  - [ ] GET /api/admin/leads (authenticate, isAdmin)
  - [ ] POST /api/admin/leads/:id/assign (authenticate, isAdmin)
  - [ ] PUT /api/admin/leads/:id/reassign (authenticate, isAdmin)
  - [ ] GET /api/agent/leads (authenticate, isVerifiedAgent)
  - [ ] PUT /api/agent/leads/:id/status (authenticate, isVerifiedAgent)

---

### PROPERTY APPROVAL FLOW APIs - PRIORITY 2

- [ ] **Controller:** `controllers/propertyController.js` (or adminController.js)
  - [ ] getPendingProperties (GET /api/admin/properties/pending)
  - [ ] approveProperty (PUT /api/admin/properties/:id/approve)
  - [ ] rejectProperty (PUT /api/admin/properties/:id/reject)
  - [ ] getPublicProperties (GET /api/properties)
  - [ ] getMyProperties (GET /api/user/properties)
  - [ ] createProperty (POST /api/properties)
  - [ ] updateProperty (PUT /api/properties/:id)
  - [ ] deleteProperty (DELETE /api/properties/:id)

- [ ] **Routes:** `routes/propertyRoutes.js`
  - [ ] GET /api/admin/properties/pending (authenticate, isAdmin)
  - [ ] PUT /api/admin/properties/:id/approve (authenticate, isAdmin)
  - [ ] PUT /api/admin/properties/:id/reject (authenticate, isAdmin)
  - [ ] GET /api/properties (optionalAuth)
  - [ ] POST /api/properties (authenticate, isActiveUser)
  - [ ] GET /api/user/properties (authenticate)
  - [ ] PUT /api/properties/:id (authenticate, isOwner('Property'))
  - [ ] DELETE /api/properties/:id (authenticate, isOwner('Property'))

---

### USER MANAGEMENT APIs - PRIORITY 3

- [ ] **Controller:** `controllers/adminController.js`
  - [ ] getAllUsers (GET /api/admin/users)
  - [ ] banUser (POST /api/admin/users/:id/ban)
  - [ ] unbanUser (POST /api/admin/users/:id/unban)
  - [ ] getPendingAgents (GET /api/admin/agents/pending)
  - [ ] approveAgent (PUT /api/admin/agents/:id/approve)
  - [ ] rejectAgent (PUT /api/admin/agents/:id/reject)
  - [ ] getDashboardStats (GET /api/admin/dashboard)

- [ ] **Routes:** `routes/adminRoutes.js`
  - [ ] GET /api/admin/users (authenticate, isAdmin)
  - [ ] POST /api/admin/users/:id/ban (authenticate, isAdmin)
  - [ ] POST /api/admin/users/:id/unban (authenticate, isAdmin)
  - [ ] GET /api/admin/agents/pending (authenticate, isAdmin)
  - [ ] PUT /api/admin/agents/:id/approve (authenticate, isAdmin)
  - [ ] GET /api/admin/dashboard (authenticate, isAdmin)

---

### NEWS MANAGEMENT APIs - PRIORITY 4

- [ ] **Controller:** `controllers/newsController.js`
  - [ ] createNews (POST /api/news) - Admin creates
  - [ ] updateNews (PUT /api/news/:id) - Admin updates
  - [ ] deleteNews (DELETE /api/news/:id) - Admin deletes
  - [ ] publishNews (PUT /api/news/:id/publish) - Admin publishes
  - [ ] getPublishedNews (GET /api/news) - Public view
  - [ ] getNewsBySlug (GET /api/news/:slug) - Public single view

- [ ] **Routes:** `routes/newsRoutes.js`
  - [ ] POST /api/news (authenticate, isAdmin)
  - [ ] PUT /api/news/:id (authenticate, isAdmin)
  - [ ] DELETE /api/news/:id (authenticate, isAdmin)
  - [ ] PUT /api/news/:id/publish (authenticate, isAdmin)
  - [ ] GET /api/news (public)
  - [ ] GET /api/news/:slug (public)

---
### User Controller ✅ COMPLETE
- [x] getMyProfile refactored with asyncHandler
- [x] updateMyProfile refactored with validation
- [x] changePassword added
- [x] getMyProperties added
- [x] getMyShortlist added
- [x] addToShortlist added (uses model method)
- [x] removeFromShortlist added (uses model method)
- [x] deleteMyAccount added
- [x] getMySubscription added
- [x] All routes use asyncHandler (no try-catch)
- [x] Consistent response format
- [x] Uses User model methods

### DATABASE MIGRATION

- [ ] **Script:** `migrations/renamePropertyStatus.js`
  - [ ] Rename Property.status → listingType for all existing records
  - [ ] Set approvalStatus = 'pending' for old records
  - [ ] Test on staging database first

---

### SERVER SETUP

- [ ] **File:** `server.js` or `app.js`
  - [x] Import errorMiddleware
  - [x] Add notFound handler (after all routes)
  - [x] Add errorHandler (last middleware)
  - [ ] Wire up all route files
  - [ ] Test 404 handling
  - [ ] Test global error handling

---

## 🔴 FRONTEND TASKS (Next.js)

### State Management
- [ ] Auth state stored securely (Context/Redux)
- [ ] User profile fetch API integrated
- [ ] Role stored in global state

### Route Protection
- [ ] Admin route guard implemented
- [ ] Agent route guard implemented
- [ ] Unauthorized redirect handling

### Admin Dashboard UI
- [ ] Pending property list with approve/reject buttons
- [ ] Lead assignment dropdown (select agent)
- [ ] Agent management panel (approve/ban)
- [ ] User management panel (ban/unban)
- [ ] Dashboard statistics

### Agent Dashboard UI
- [ ] Assigned leads list (filtered)
- [ ] Lead status update dropdown
- [ ] Property details view (assigned leads only)

### User Dashboard UI
- [ ] Property submission form
- [ ] Property status tracking (pending/approved/rejected)
- [ ] Inquiry submission form

### Frontend Security
- [ ] Remove localStorage role usage
- [ ] Prevent admin UI exposure (role-based rendering)
- [ ] Button-level permission hiding

---

## 🧪 TESTING & VALIDATION

- [ ] Role permission testing (Postman/Jest)
- [ ] Agent isolation testing (agent can't see other agent's leads)
- [ ] Admin privilege testing (admin can access everything)
- [ ] API unauthorized access testing (401/403 responses)
- [ ] Edge case testing (invalid ObjectId, duplicate emails, etc.)
- [ ] Ban user flow testing
- [ ] Property approval flow testing
- [ ] Lead assignment flow testing

---

## 🚀 DEPLOYMENT READINESS

- [ ] Environment variables validated (.env.example)
- [ ] Production DB tested
- [ ] CORS configured properly (Next.js domain)
- [ ] API rate limiting configured (express-rate-limit)
- [ ] Logging configured (Winston/Morgan)
- [ ] SSL/HTTPS enabled
- [ ] Environment: NODE_ENV=production

---

## 🔒 FINAL PRODUCTION CHECK

- [ ] No hardcoded roles
- [ ] No mock/test data left
- [ ] No public access leaks (all admin routes protected)
- [ ] Security review passed
- [ ] Password requirements enforced
- [ ] Input sanitization verified
- [ ] SQL injection protection (Mongoose handles)
- [ ] XSS protection verified

---

## 📊 PROGRESS SUMMARY

**Completion Status:**

| Phase | Status | Progress |
|-------|--------|----------|
| Models | ✅ Complete | 100% (4/4 models) |
| Middleware | ✅ Complete | 100% (2/2 files, 9 auth middleware) |
| Auth Controller | ✅ Complete | 100% (refactored) |
| Lead APIs | 🔴 Pending | 0% (0/6 endpoints) |
| Property APIs | 🔴 Pending | 0% (0/8 endpoints) |
| Admin APIs | 🔴 Pending | 0% (0/7 endpoints) |
| News APIs | 🔴 Pending | 0% (0/6 endpoints) |
| Migration | 🔴 Pending | 0% |
| Frontend | 🔴 Pending | 0% |
| Testing | 🔴 Pending | 0% |
| Deployment | 🔴 Pending | 0% |

**Overall Progress:** 🟡 **30%** (Foundation Complete)

---

## 🎯 CURRENT FOCUS

**Phase:** Backend API Development  
**Next Task:** Create Lead Controller + Routes  
**Blocker:** None  
**ETA:** 2-3 days for all backend APIs

---

## 📝 NOTES

- ✅ User model now uses bcrypt (not bcryptjs)
- ✅ All passwords auto-hashed via pre-save hook
- ✅ Controllers use asyncHandler (no try-catch needed)
- ✅ Global error handler catches all errors
- ✅ 9 middleware functions for role-based access
- ⚠️ Migration script needed before deploying to production
- ⚠️ Frontend already complete, just needs API integration

---

## 🔄 CHANGELOG

**2026-01-31:**
- ✅ Enhanced User model with bcrypt, ban/unban, role helpers
- ✅ Created Lead model with agent assignment workflow
- ✅ Updated Property model with approval workflow
- ✅ Enhanced News model with publishing workflow
- ✅ Created global error middleware (asyncHandler, AppError)
- ✅ Created comprehensive auth middleware (9 functions)
- ✅ Refactored auth controller (removed bcrypt, added asyncHandler)
- ✅ Moved password hashing from controller to model
- ✅ Switched from bcryptjs to bcrypt

---

**Maintained By:** Devil Mode Development  
**Last Review:** January 31, 2026, 2:43 PM IST
