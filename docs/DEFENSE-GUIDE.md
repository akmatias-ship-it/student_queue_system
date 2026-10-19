# Showcase and Defense Guide

The supplied instructions list October 17, 2026, 1:00 PM–6:00 PM for the defense; confirm your assigned slot.

## Suggested demo

1. Introduce the Student Queuing System, problem, target users, and purpose.
2. Explain users, stakeholders, main functional/non-functional requirements, and use cases.
3. Log in as a student, join a service, show the ticket number, refresh My Tickets to show persistence, and cancel a waiting ticket.
4. Log in as staff, open Queue Desk, call the next ticket, and update its status.
5. Log in as admin, create a service, deactivate/reactivate it, and show the student-facing effect.
6. Demonstrate access denial for a student visiting `/queue/staff` and staff visiting `/admin/services`.
7. Explain `users`, `services`, and `queue_tickets` tables and foreign keys.
8. Show real GitHub issues, board, branches, commits, PRs, reviews, and contributions.
9. Present a professional, evidence-based critique of the paired team.
10. Explain limitations honestly.

## Common defense questions

- **How is a ticket created?** The join route validates the active service, checks for an active duplicate, generates a display number, and stores a row in MySQL.
- **How is queue order chosen?** The call-next route orders waiting tickets by creation time and selects the oldest.
- **How are passwords stored?** Seed passwords are hashed with bcryptjs and checked during login.
- **How is access control enforced?** Server-side middleware checks session and role; hiding links is not sufficient.
- **How does data persist?** Queue records are stored in MySQL.
- **What are limitations?** No public display, notifications, wait estimates, self-registration, password reset, or production-grade CSRF/rate limiting.
- **What did you contribute?** Each member should identify their actual code, route/file, issue, branch, commit, and PR.

## Counterpart critique format

Observation → evidence from actual demo → impact → practical recommendation. Do not speculate about unobserved behavior or criticize people.
