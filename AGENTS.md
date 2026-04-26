<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SkillUp — project conventions

## What this is

SkillUp is a peer-to-peer learning marketplace. Users exchange skills with fellow learners — tutors and students connect, sessions are tracked, and an SC currency mediates the exchange. Trilingual (English, Uzbek Latin, Russian).

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, next-intl. Deployed on Vercel.

## Workflow conventions

### Push policy
- Visual / styling / copy / i18n / Tailwind changes: commit and push after diff approval
- API routes / database queries / auth / env vars / build config / package.json: commit locally only, wait for explicit "push" from the user
- When uncertain which category a change falls into, ask before pushing

### Git
- Remote uses SSH: git@github.com:sarvarabdullaev0902-dev/Skillup.git
- Do not modify the remote URL
- Do not suggest switching to HTTPS or embedding tokens

### i18n
- Use next-intl for all user-facing text — no hardcoded strings in components
- Uzbek uses Latin script, not Cyrillic
- When adding a new translation key, add it to all three locale files in the same commit