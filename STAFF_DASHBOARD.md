# 🛡️ Staff Dashboard - Complete Guide

## Overview

Comprehensive staff dashboard for admins and moderators to manage users, servers, and monitor platform activity.

**Access:** `/staff` (Admins & Moderators only)

---

## 🔐 Permissions

### User Roles:

| Role | Dashboard Access | User Management | Server Management |
|------|-----------------|-----------------|-------------------|
| **Admin** | ✅ Full | ✅ All users | ✅ All servers |
| **Moderator** | ✅ Full | ⚠️ Limited* | ✅ All servers |
| **User** | ❌ No | ❌ No | ❌ No |
| **Suspended** | ❌ No | ❌ No | ❌ No |
| **Banned** | ❌ No | ❌ No | ❌ No |

*Moderators cannot modify admin or other moderator accounts

---

## 📊 Dashboard Features

### Tab 1: User Management

**View All Users:**
- Profile picture & name
- Email address
- Current role (color-coded badges)
- Pledge count
- Servers owned
- Join date

**Actions:**
- **Change Role** dropdown:
  - User (default)
  - Moderator (staff access)
  - Admin (full access)
  - Suspended (3 failed payments or manual)
  - Banned (prohibited from platform)
- **View Profile** - Go to public profile page

**Search:**
- Search by name or email
- Real-time filtering

**Role Badges:**
- 🟣 Admin (purple)
- 🔵 Moderator (blue)
- 🟠 Suspended (orange)
- 🔴 Banned (red)
- ⚪ User (gray)

---

### Tab 2: Server Management

**View All Servers:**
- Server name
- Game type
- Monthly cost
- Owner info (name/email)
- Pledger count
- Status (active/inactive/archived)

**Actions:**
- **View** - Go to public server page
- **Delete** - Remove server (with confirmation)

**Search:**
- Search by server name or game type
- Real-time filtering

---

## 🎯 User Management Actions

### Suspend User:
```
Reason: 3 failed payment attempts (automatic)
       OR manual suspension by staff

Effect:
- Cannot create new pledges
- Existing pledges cancelled
- Cannot create servers
- Can browse platform

Activity Log: "Your account was suspended"
```

### Ban User:
```
Reason: Terms violation (manual by staff)

Effect:
- Complete platform ban
- All pledges cancelled
- All servers remain but inactive
- Cannot access platform

Activity Log: "Your account was banned by staff"
```

### Promote to Moderator:
```
Effect:
- Access to staff dashboard
- Can manage users (except admins/mods)
- Can manage all servers
- Can view all activity

Activity Log: "You were promoted to moderator"
```

### Promote to Admin:
```
Effect:
- Full platform access
- Can manage all users (including mods)
- Can promote others to any role
- Complete control

Activity Log: "You were promoted to admin"

Note: Only admins can promote to admin
```

### Restore to User:
```
Effect:
- Removes suspension/ban
- Restores normal access
- Can pledge and create servers again

Activity Log: "Your account was restored"
```

---

## 📋 Activity Tracking

### Your Activity (User Dashboard)

**Now Tracks:**
- ➕ **Server Created** - "You created server 'Name'"
- 🗑️ **Server Deleted** - "You deleted server 'Name'"
- ✅ **Pledge Created** - "You pledged $X/month towards 'Name'"
- 🔄 **Pledge Updated** - "You updated pledge to $X/month"
- ❌ **Pledge Cancelled** - "You removed pledge from 'Name'"
- ⚠️ **Account Suspended** - "Your account was suspended"
- 🚫 **Account Banned** - "Your account was banned by staff"
- ⭐ **Role Promoted** - "You were promoted to moderator"

**Special:**
- Deleted servers show: "Server you pledged towards has been deleted. You have been removed from pledging."
- Faded text and italic styling for deleted servers
- No "View →" link for deleted servers

---

### Server Activity (Owner Dashboard)

**Tracks Activity on Your Servers:**
- ✅ **User Pledged** - "John pledged $15/month towards 'Your Server'"
- 🔄 **Pledge Updated** - "John updated pledge to $20/month"
- ❌ **Pledge Cancelled** - "John removed pledge from 'Your Server'"

**Filter:**
- Only shows activity by OTHER users
- Doesn't show your own actions
- Last 20 activities

---

## 🔒 Security & Permissions

### Route Protection:
- `/staff` routes protected by middleware
- Requires authentication
- Server-side role check on every request

### API Endpoints:
```
GET  /api/staff/users           - List all users
GET  /api/staff/servers         - List all servers
PATCH /api/staff/users/role     - Change user role
DELETE /api/staff/servers/[id]  - Delete server
```

### Permission Checks:
```typescript
// Every staff API route checks:
1. User is authenticated
2. User role is admin OR moderator
3. (For some actions) Additional role restrictions
```

### Moderator Limitations:
- ❌ Cannot promote users to admin
- ❌ Cannot modify admin accounts
- ❌ Cannot modify other moderator accounts
- ✅ Can suspend/ban regular users
- ✅ Can delete any server
- ✅ Can restore suspended users

---

## 🎨 UI Features

### Staff Dashboard:
- Clean tabbed interface
- Real-time search
- Color-coded role badges
- Confirmation dialogs for actions
- Loading states
- Empty states

### Navbar Badge:
- 🛡️ "Staff" link appears for admins/moderators
- Shield icon for easy identification
- Hidden for regular users

### Activity Feed:
- Icon-coded actions (colored SVGs)
- Timestamped entries
- Deleted server handling
- Direct links to servers
- Tab switching (Your vs Server activity)

---

## 📊 Activity Icons:

| Action | Icon | Color |
|--------|------|-------|
| Server Created | ➕ Plus | Blue |
| Server Deleted | 🗑️ Trash | Red |
| Pledge Created | ✅ Check | Green |
| Pledge Cancelled | ❌ X | Red |
| Pledge Updated | 🔄 Refresh | Yellow |
| User Suspended | ⚠️ Warning | Orange |
| User Banned | 🚫 Ban | Dark Red |
| User Promoted | ⭐ Star | Purple |

---

## 🚀 Workflow Examples

### Example 1: Suspend Problem User
```
1. Admin goes to /staff
2. Clicks "User Management" tab
3. Searches for user by email
4. Changes role to "Suspended"
5. Confirms action
6. User's dashboard shows suspension message
7. All pledges cancelled automatically
```

### Example 2: Remove Inappropriate Server
```
1. Moderator goes to /staff
2. Clicks "Server Management" tab
3. Finds problematic server
4. Clicks "Delete"
5. Confirms deletion
6. Server removed, all pledges cancelled
7. Owner sees "Server deleted" in activity feed
```

### Example 3: Promote Active Community Member
```
1. Admin identifies helpful user
2. Goes to /staff → User Management
3. Changes role to "Moderator"
4. Confirms promotion
5. User sees "You were promoted to moderator"
6. "Staff" link appears in their navbar
7. Can access staff dashboard
```

---

## 🔮 Future Enhancements

Ready to build:
- **Bulk actions** (suspend multiple users)
- **Activity filters** (by date, type, user)
- **User search** by pledge amount, server count
- **Server statistics** (revenue, pledger trends)
- **Email notifications** for role changes
- **Audit log** for staff actions
- **Ban reasons** and notes
- **Temporary suspensions** (auto-restore after X days)
- **User reports** system
- **Appeals system** for bans

---

## 📈 Platform Stats (Future)

Could add to staff dashboard:
- Total users, servers, pledges
- Revenue overview
- Active vs suspended accounts
- Most pledged servers
- Growth metrics
- Payment failure rates

---

## ✅ Complete Feature Set:

**User Management:**
- ✅ View all users with stats
- ✅ Search by name/email
- ✅ Change roles (5 roles)
- ✅ Role-based permissions
- ✅ Activity logging
- ✅ Profile access

**Server Management:**
- ✅ View all servers
- ✅ Search by name/game
- ✅ See owner details
- ✅ Delete servers
- ✅ View pledger count
- ✅ Status indicators

**Activity Tracking:**
- ✅ Server creation/deletion
- ✅ Pledge actions
- ✅ Role changes
- ✅ Deleted server messages
- ✅ Two-tab system
- ✅ Icon-coded actions

**Security:**
- ✅ Route protection
- ✅ API authentication
- ✅ Role validation
- ✅ Permission checks
- ✅ Confirmation dialogs

---

## 🎉 Your Staff Dashboard is Complete!

**Access it at:** `/staff`

Admins and moderators can now:
- 👥 Manage all users
- 🖥️ Manage all servers
- 📊 View platform activity
- 🛡️ Moderate the community
- ⚖️ Enforce rules

The platform now has professional moderation tools! 🚀




