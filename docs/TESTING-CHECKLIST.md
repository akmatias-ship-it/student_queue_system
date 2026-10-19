# Testing Checklist

Record real results; do not mark tests passed until actually run.

| ID       | Test                                 | Expected result                      | Result  |
| -------- | ------------------------------------ | ------------------------------------ | ------- |
| AUTH-01  | Valid login for each role            | Correct dashboard                    | Not run |
| AUTH-02  | Wrong/empty password                 | Login rejected                       | Not run |
| AUTH-03  | Logout then open dashboard           | Redirect to login                    | Not run |
| AUTH-04  | Student opens `/queue/staff`         | Access denied                        | Not run |
| AUTH-05  | Staff opens `/admin/services`        | Access denied                        | Not run |
| QUEUE-01 | Student joins active service         | Ticket stored and shown              | Not run |
| QUEUE-02 | Refresh ticket page                  | Ticket persists                      | Not run |
| QUEUE-03 | Join same service with active ticket | Duplicate blocked                    | Not run |
| QUEUE-04 | Cancel own waiting ticket            | Status cancelled                     | Not run |
| QUEUE-05 | Call next                            | Oldest waiting ticket becomes called | Not run |
| QUEUE-06 | Call next with empty queue           | Helpful message                      | Not run |
| QUEUE-07 | Update status                        | New status persists                  | Not run |
| ADMIN-01 | Add service                          | Service appears for students         | Not run |
| ADMIN-02 | Add duplicate service                | Error feedback                       | Not run |
| ADMIN-03 | Deactivate service                   | Students cannot join it              | Not run |
| DB-01    | Restart app                          | Stored records remain                | Not run |
| UI-01    | Mobile-width viewport                | Layout remains usable                | Not run |
| AUTO-01  | `npm test`                           | Utility tests pass                   | Not run |
| CI-01    | Push/PR after workflow is committed  | Actions run is visible               | Not run |

Setup: configure `.env`, run `database/schema.sql`, then `npm run db:seed`, `npm run dev`, and `npm test`. Test each role and direct URL access. Save actual screenshots/evidence and record failures/fixes.
