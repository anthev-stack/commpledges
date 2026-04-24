# 🎫 Support Ticket System - Complete Guide

## Overview

Comprehensive support ticket system allowing users to submit, track, and receive help for various issues. Staff can manage, respond to, and resolve tickets efficiently.

**User Access:** `/tickets` (Authenticated users only)  
**Staff Access:** `/staff` → Ticket Management tab (Admins & Moderators only)

---

## 🎯 Features

### User Features:
- ✅ **Create Tickets** - Submit support requests with categories and priorities
- ✅ **View Tickets** - See all your submitted tickets with status updates
- ✅ **Track Progress** - Monitor ticket status and staff responses
- ✅ **Add Responses** - Reply to staff messages and provide additional info
- ✅ **Search & Filter** - Find tickets by title, status, or priority

### Staff Features:
- ✅ **Manage All Tickets** - View and manage tickets from all users
- ✅ **Status Management** - Update ticket status (Open → In Progress → Resolved → Closed)
- ✅ **Staff Responses** - Reply to users with staff-marked responses
- ✅ **Advanced Filtering** - Filter by status, category, priority, or user
- ✅ **User Information** - Access user details and profile links
- ✅ **Assignment System** - Assign tickets to specific staff members (future)

---

## 📋 Ticket Categories

| Category | Description | Use Cases |
|----------|-------------|-----------|
| **Bug Report** | Report a bug or technical issue | - Site not working<br>- Payment failures<br>- Server connection issues |
| **Feature Request** | Suggest a new feature or improvement | - New functionality ideas<br>- UI/UX improvements<br>- Platform enhancements |
| **Support** | Get help with using the platform | - How to use features<br>- Account issues<br>- General questions |
| **Report User/Server** | Report inappropriate content or behavior | - Spam servers<br>- Inappropriate users<br>- Terms violations |
| **Other** | Something else not covered above | - Billing questions<br>- Account deletion<br>- Miscellaneous issues |

---

## 🚨 Priority Levels

| Priority | Description | Response Time |
|----------|-------------|---------------|
| **Low** | Not urgent, can wait | 2-3 business days |
| **Medium** | Normal priority | 1-2 business days |
| **High** | Important, needs attention soon | Same day |
| **Urgent** | Critical issue, needs immediate attention | Within hours |

---

## 📊 Ticket Status Flow

```
Open → In Progress → Resolved → Closed
  ↓         ↓           ↓
User     Staff      Staff
Creates  Working    Marks as
Ticket   on Issue   Complete
```

### Status Descriptions:
- **Open** - Newly created, awaiting staff response
- **In Progress** - Staff is actively working on the issue
- **Resolved** - Issue has been fixed/addressed
- **Closed** - Ticket is closed, no further responses allowed

---

## 🎫 User Interface

### `/tickets` - Ticket Listing Page
**Features:**
- Search bar for ticket titles
- Status filter (All, Open, In Progress, Resolved, Closed)
- Priority filter (All, Low, Medium, High, Urgent)
- Clear filters button
- Empty state with "Create Your First Ticket" CTA
- Ticket cards showing:
  - Title and description preview
  - Status and priority badges (color-coded)
  - Category and creation/update dates
  - Response count
  - "View →" link

### `/tickets/create` - Create New Ticket
**Form Fields:**
- **Title** (required) - Brief description of issue
- **Category** (required) - Dropdown with descriptions
- **Priority** (required) - Dropdown with descriptions
- **Description** (required) - Detailed explanation (max 1000 chars)
- Character counter for description
- Helpful tips section
- Cancel/Create Ticket buttons

### `/tickets/[id]` - Individual Ticket View
**Features:**
- Full ticket details with status/priority badges
- Complete description
- Creation/update timestamps
- Response thread with:
  - User and staff responses clearly marked
  - Timestamps for each response
  - Staff responses highlighted in blue
- Add response form (if ticket not closed)
- Back to tickets navigation

---

## 🛡️ Staff Interface

### Staff Dashboard - Ticket Management Tab
**Features:**
- All tickets from all users
- Advanced filtering:
  - Status (All, Open, In Progress, Resolved, Closed)
  - Category (All, Bug Report, Feature Request, etc.)
  - Priority (All, Urgent, High, Medium, Low)
- Search by title or user name/email
- Ticket cards showing:
  - Title, status, and priority badges
  - Description preview
  - Category, user info, dates
  - Response count and assignment
  - Status dropdown for quick updates
  - "View & Respond" link

### `/staff/tickets/[id]` - Staff Ticket Detail
**Features:**
- Full ticket view with staff controls
- Status change dropdown (real-time updates)
- Complete response thread
- Staff response form (marked as staff)
- Sidebar with:
  - User information (name, email, ID)
  - Link to user profile
  - Ticket metadata (category, priority, dates)
  - Response count
- Back to staff dashboard navigation

---

## 🔧 API Endpoints

### User Endpoints:
```
GET    /api/tickets              - Get user's tickets
POST   /api/tickets              - Create new ticket
GET    /api/tickets/[id]         - Get specific ticket
PATCH  /api/tickets/[id]         - Update ticket (title/description)
POST   /api/tickets/[id]/responses - Add user response
```

### Staff Endpoints:
```
GET    /api/staff/tickets        - Get all tickets (with filters)
GET    /api/staff/tickets/[id]   - Get ticket with full details
PATCH  /api/staff/tickets/[id]   - Update status/assignment
POST   /api/staff/tickets/[id]/responses - Add staff response
```

---

## 🗄️ Database Schema

### Ticket Model:
```prisma
model Ticket {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String   // bug_report, feature_request, support, etc.
  priority    String   // low, medium, high, urgent
  status      String   @default("open") // open, in_progress, resolved, closed
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  assignedTo  String?  // Staff member handling ticket
  assignedUser User?   @relation("AssignedTickets", fields: [assignedTo], references: [id])
  
  responses   TicketResponse[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([status])
  @@index([category])
  @@index([assignedTo])
}
```

### TicketResponse Model:
```prisma
model TicketResponse {
  id        String   @id @default(cuid())
  content   String
  isStaff   Boolean  @default(false) // true if from staff
  
  ticketId  String
  ticket    Ticket   @relation(fields: [ticketId], references: [id])
  
  userId    String   // Who wrote the response
  user      User     @relation(fields: [userId], references: [id])
  
  createdAt DateTime @default(now())

  @@index([ticketId])
  @@index([userId])
}
```

---

## 🎨 UI Components

### Color Coding:
- **Status Badges:**
  - Open: Blue (`bg-blue-100 text-blue-800`)
  - In Progress: Purple (`bg-purple-100 text-purple-800`)
  - Resolved: Green (`bg-green-100 text-green-800`)
  - Closed: Gray (`bg-gray-100 text-gray-800`)

- **Priority Badges:**
  - Urgent: Red (`bg-red-100 text-red-800`)
  - High: Orange (`bg-orange-100 text-orange-800`)
  - Medium: Yellow (`bg-yellow-100 text-yellow-800`)
  - Low: Green (`bg-green-100 text-green-800`)

### Response Styling:
- **User Responses:** Gray background with gray left border
- **Staff Responses:** Blue background with blue left border + "Staff" badge

---

## 🔒 Security & Permissions

### User Permissions:
- ✅ Can create tickets
- ✅ Can view own tickets only
- ✅ Can add responses to own tickets
- ✅ Can update own ticket title/description
- ❌ Cannot view other users' tickets
- ❌ Cannot change ticket status
- ❌ Cannot add staff responses

### Staff Permissions:
- ✅ Can view all tickets
- ✅ Can change ticket status
- ✅ Can add staff responses
- ✅ Can assign tickets (future feature)
- ✅ Can view user information
- ✅ Can filter and search all tickets

### Route Protection:
- `/tickets/*` - Requires authentication
- `/staff/tickets/*` - Requires admin/moderator role
- All API endpoints have proper authorization checks

---

## 🚀 Workflow Examples

### Example 1: User Reports a Bug
```
1. User goes to /tickets/create
2. Fills form:
   - Title: "Payment not processing"
   - Category: "Bug Report"
   - Priority: "High"
   - Description: "When I try to pledge..."
3. Submits ticket → Status: "Open"
4. Staff sees in /staff → Ticket Management
5. Staff changes status to "In Progress"
6. Staff adds response: "We're investigating..."
7. Staff fixes issue, marks as "Resolved"
8. User sees resolution in /tickets
```

### Example 2: Feature Request
```
1. User creates ticket:
   - Category: "Feature Request"
   - Priority: "Medium"
   - Title: "Add dark mode"
   - Description: "Would love a dark theme..."
2. Staff responds: "Great idea! Added to roadmap"
3. Status: "In Progress" while developing
4. Status: "Resolved" when feature ships
5. Status: "Closed" after user confirmation
```

### Example 3: Report Inappropriate Content
```
1. User creates ticket:
   - Category: "Report User/Server"
   - Priority: "High"
   - Title: "Server with inappropriate content"
   - Description: "Server 'BadServer' has..."
2. Staff investigates immediately
3. Staff takes action (ban server/user)
4. Staff responds: "Content removed, user banned"
5. Status: "Resolved" → "Closed"
```

---

## 📈 Future Enhancements

### Ready to Build:
- **Email Notifications** - Notify users of status changes
- **Ticket Assignment** - Assign tickets to specific staff
- **File Attachments** - Allow screenshots/file uploads
- **Ticket Templates** - Pre-written responses for common issues
- **Priority Auto-Assignment** - AI-based priority suggestions
- **SLA Tracking** - Response time monitoring
- **Ticket Analytics** - Response time reports, popular issues
- **Bulk Actions** - Mass status updates, bulk responses
- **Internal Notes** - Staff-only notes on tickets
- **Ticket Merging** - Combine duplicate tickets
- **Escalation Rules** - Auto-escalate urgent tickets

### Advanced Features:
- **Knowledge Base Integration** - Link to help articles
- **Chat Integration** - Real-time chat for urgent issues
- **Mobile App** - Push notifications for ticket updates
- **API for Third-Party** - Webhook integrations
- **Multi-Language Support** - Internationalization
- **Custom Fields** - Additional ticket metadata
- **Ticket Categories** - Subcategories for better organization

---

## 🎉 Complete Feature Set

**User Experience:**
- ✅ Intuitive ticket creation form
- ✅ Clear status tracking
- ✅ Easy response system
- ✅ Search and filtering
- ✅ Mobile-responsive design
- ✅ Empty states with CTAs

**Staff Experience:**
- ✅ Comprehensive ticket management
- ✅ Advanced filtering and search
- ✅ Quick status updates
- ✅ User information access
- ✅ Staff-marked responses
- ✅ Real-time updates

**Technical Features:**
- ✅ Secure API endpoints
- ✅ Role-based permissions
- ✅ Database relationships
- ✅ Input validation
- ✅ Error handling
- ✅ Loading states

---

## 🎫 Your Support Ticket System is Complete!

**Access it at:**
- **Users:** `/tickets` - Create and manage support requests
- **Staff:** `/staff` → Ticket Management tab - Handle all tickets

The platform now has a professional support system! 🚀

**Next Steps:**
1. Run database migration: `npx prisma migrate dev --name add_tickets_system`
2. Test ticket creation and management
3. Train staff on the new system
4. Set up email notifications (future enhancement)
5. Monitor ticket response times
6. Gather user feedback for improvements




