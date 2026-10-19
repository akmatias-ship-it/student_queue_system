# GitHub Workflow

Replace member labels with the actual names. Suggested roles: Member 1 backend/queue logic; Member 2 EJS/forms/UI; Member 3 schema/seeding/auth testing. Every member must make meaningful code contributions and understand the whole application.

1. Create the repository, invite all members, and grant instructor access as required.
2. Create issues for tasks and bugs; organize them on a GitHub Project board.
3. Each member creates a feature branch.
4. Commit small, meaningful changes using Conventional Commits, e.g. `feat: add queue joining`.
5. Push branch and open a PR linked to an issue.
6. Another member reviews the code and leaves meaningful feedback.
7. Address feedback, wait for approval/checks, then merge.
8. Repeat throughout development; do not upload everything in one final commit.
9. Verify all three members have genuine commits, issues, PR participation, and reviews.
10. Show only real evidence during defense.

Example:

```bash
git checkout main
git pull origin main
git checkout -b feature/join-queue
git add .
git commit -m "feat: implement queue joining"
git push -u origin feature/join-queue
```

These commands are examples, not proof that a repository exists.

The included `.github/workflows/node.js.yml` runs `npm test` on pushes and PRs to main. It only runs after committed and pushed. Confirm the actual result in GitHub Actions before claiming success.
