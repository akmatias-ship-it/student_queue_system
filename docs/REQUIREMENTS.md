# Student Queuing System — Requirements Document

**Assigned system:** Student Queuing System  
**Stack:** Node.js, Express.js, EJS, MySQL, HTML, CSS, JavaScript  
**Team members:** Fill in the actual three team members; do not invent names.

## 1. Project Description

The Student Queuing System is a campus web application intended to make service queues more organized and reduce uncertainty while students wait. Students can sign in, choose an available campus service, receive a ticket number, and view ticket status. Authorized staff can call the next waiting ticket and update its status. Administrators can manage campus service availability. This is a classroom prototype, not a production queue-management platform.

## 2. Users and Stakeholders

- **Student:** logs in, joins a service queue, views personal tickets, cancels a waiting ticket.
- **Queue staff:** views the current queue, calls the next ticket, updates ticket status.
- **Administrator:** performs staff functions and adds/activates/deactivates services.
- **Campus offices:** benefit from more organized service flow.
- **Instructor and team:** evaluate functionality, requirements, security, collaboration, and defense.

## 3. Functional Requirements

- **FR-01:** Registered users can log in with email and password.
- **FR-02:** Sessions persist across requests; users can log out.
- **FR-03:** Protected routes enforce student, staff, and administrator roles server-side.
- **FR-04:** Students can browse active campus services.
- **FR-05:** Students can join an active service and receive a ticket number.
- **FR-06:** Duplicate active tickets for the same service/day are rejected.
- **FR-07:** Students can view only their own queue tickets and statuses.
- **FR-08:** Students can cancel their own waiting tickets.
- **FR-09:** Staff/admin can view tickets for a selected service for the current day.
- **FR-10:** Staff/admin can call the oldest waiting ticket for a service.
- **FR-11:** Staff/admin can update active tickets to serving, completed, no-show, or cancelled.
- **FR-12:** Admin can create services and toggle their availability.
- **FR-13:** User, service, and ticket data persist in MySQL after refresh/restart.
- **FR-14:** Common successful and failed actions display feedback.

## 4. Non-Functional Requirements

- **Security:** bcrypt password hashing, parameterized SQL, server-side role checks, HTTP-only/SameSite session cookies.
- **Usability:** clear labels, status indicators, responsive layout, feedback for operations.
- **Reliability:** invalid service selections must not create tickets; database errors are logged.
- **Maintainability:** routes, middleware, views, styles, database, and tests are separated.
- **Compatibility:** current Node.js LTS and MySQL 8 or compatible MariaDB.
- **Privacy:** student view is scoped to the logged-in student's records; use fictitious demo data.
- **Performance:** common operations should be responsive for a small classroom demonstration.

## 5. Use Cases

### UC-01: Student joins queue

**Actor:** Student. **Precondition:** logged in, service active, no active duplicate ticket.  
**Flow:** open dashboard → select service → submit → server validates → record saved → ticket number/status displayed.  
**Alternate:** invalid service or active duplicate → error feedback and no new ticket.  
**Postcondition:** a persistent waiting ticket exists.

### UC-02: Student views/cancels ticket

**Actor:** Student. **Precondition:** logged in.  
**Flow:** open My Tickets → view personal ticket status → cancel a waiting ticket if desired.  
**Alternate:** ticket is not owned by the user or no longer waiting → no change.  
**Postcondition:** displayed records reflect stored data.

### UC-03: Staff calls next

**Actor:** Staff/admin. **Precondition:** logged in and authorized.  
**Flow:** open Queue Desk → select service → call next → oldest waiting ticket is marked called and caller/time are recorded.  
**Alternate:** no waiting tickets → message is displayed.

### UC-04: Staff updates ticket status

**Actor:** Staff/admin. **Flow:** choose status action → server validates → database update → feedback displayed.

### UC-05: Admin manages services

**Actor:** Admin. **Flow:** create service or toggle availability → validate input → save → active services are offered to students.

## 6. Scope and Limitations

Included: login, role checks, queue tickets, student ticket list/cancel, staff queue actions, service management, MySQL persistence, basic utility tests. Not included: public live display, QR check-in, SMS/email notifications, estimated wait time, self-registration, password reset, analytics exports, or production-grade CSRF/rate limiting. Do not claim these features are implemented.

## 7. Acceptance Criteria

- Login/logout and route restrictions work for all roles.
- Student tickets are stored and persist after refresh.
- Duplicate active tickets are rejected.
- Staff can call the oldest waiting ticket and update statuses.
- Admin can create and deactivate/reactivate services.
- Team collaboration evidence is visible in GitHub for all three actual members.
