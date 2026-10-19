# Student Queuing System

A campus queue web application built with Node.js, Express, EJS, and MySQL for the Campus System – Round 1 midterm project.

## Team members

- Member 1: Atos
- Member 2: Matias
- Member 3: Molina

Do not submit placeholders; fill in your actual team members.

## Features

- Login/logout with server-side sessions and bcrypt password hashing
- Role-based student, staff, and administrator access
- Active service list, join queue, ticket number, and ticket history
- Prevent duplicate active tickets for the same service/day
- Student cancellation of waiting tickets
- Staff queue view, call-next action, and ticket status updates
- Admin service creation and activation/deactivation
- MySQL persistence and basic automated utility tests

## Technologies

Node.js, Express, EJS, MySQL, HTML, CSS, JavaScript, bcryptjs, dotenv, express-session, Git, GitHub.

## Setup

Prerequisites: Node.js 20+, MySQL 8+ or compatible MariaDB.

```bash
npm install
```

Copy `.env.example` to `.env`, then update DB credentials and use a long random `SESSION_SECRET`. Never commit `.env`.

Create schema:

```bash
mysql -u root -p < database/schema.sql
```

Or execute `database/schema.sql` in MySQL Workbench.

Seed demo accounts/services:

```bash
npm run db:seed
```

Run:

```bash
npm run dev
```

Open http://localhost:3000. `npm start` runs the app without nodemon.

## Demo accounts

| Role    | Email                | Password    |
| ------- | -------------------- | ----------- |
| Admin   | admin@campus.local   | Admin123!   |
| Staff   | staff@campus.local   | Staff123!   |
| Student | student@campus.local | Student123! |

Local demo credentials only. Change them before any real deployment.

## Testing

Run `npm test`. Follow `docs/TESTING-CHECKLIST.md` for manual role, persistence, queue, and form tests. Utility tests do not replace testing against a configured MySQL server.

## Project structure

`app.js`, `config/`, `database/`, `docs/`, `middleware/`, `public/`, `routes/`, `tests/`, `utils/`, `views/`.

## Known limitations

No live public display, QR check-in, SMS/email alerts, estimated wait times, self-registration, password reset, or production-grade CSRF/rate limiting. The simple ticket count is a classroom prototype; production should use a transaction-safe sequence generator. This starter has not been verified on your local MySQL setup.

## AI assistance disclosure

AI assistance was used to draft starter code and documentation. The team is responsible for reviewing, modifying, testing, understanding, and accurately disclosing AI-assisted work.

## License

MIT; see `LICENSE`.
