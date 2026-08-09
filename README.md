# Time Tracker

## A Simple way to track time

---

## Quick Start

---

If you just want to use this application it is hosted [here](https://timer.karlito.dev/timer).

## Features

---

- Manual time tracking for whatever activities you need!
- Overview of your time spent on activities.

## How to run locally

---

Needed dependencies: Docker Compose, Bun

1. Clone the repo:

```
git clone https://github.com/Karlito05/time-tracker.git
```

2. Install dependencies with Bun:

```
bun i
```

3. Create `docker-compose.yml` from the template:

```
cp docker-compose-template.yml docker-compose.yml
```

4. Edit `docker-compose.yml` and set these variables (do not rely on line numbers):

- In the `db` service: set `POSTGRES_PASSWORD` to a strong password.
- In the `nextjs-standalone-with-bun` service: set `DATABASE_URL` (use the same DB password), `NEXTAUTH_URL`, `AUTH_SECRET`, `AUTH_GITHUB_ID`, and `AUTH_GITHUB_SECRET`.
  - Example `NEXTAUTH_URL` for local testing: `http://localhost:3000` (must include the protocol and must match the OAuth callback URL you register on GitHub).
  - Generate a secure `AUTH_SECRET`, for example:

```
openssl rand -hex 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Create `.env` from the template and update values to match your `docker-compose.yml`:

```
cp .env-template .env
```

Note: the `DATABASE_URL` value in `.env` often uses `localhost` as the host (for local processes), while the `DATABASE_URL` inside Docker uses the service name (`db`). Do not blindly copy the compose `DATABASE_URL` into `.env` without adjusting the host.

6. Start only the database service:

```
docker compose up db -d
```

7. Initialize the database (Prisma):

```
bunx prisma migrate deploy
```

8. Run the app:

- For development locally, use the `dev` script:

```
bun dev
```

- To run the production build in Docker (rebuild then start the service):

```
docker compose up --build nextjs-standalone-with-bun
```

9. OAuth note: when you register the GitHub OAuth App, set the callback URL to:

```
${NEXTAUTH_URL}/api/auth/callback/github
```
