# Send-2-Session

> **Archived snapshot.** This repository preserves the May 3, 2022 deploy state of
> Send-2-Session, restored in 2026 from a local archive.

## What it was

No-code platform for orchestrating user-session flows across providers. Users
defined "stations" that extracted session URLs from any API response (e.g.
Stripe Checkout, Mailchimp campaign URLs) and routed users through them.

## Status

- Active development: **December 2021 – late 2022**
- Last build & deploy: **2022-05-03** (live on Firebase Hosting)
- Original Firebase project no longer maintained
- Frozen snapshot, not under active development

## Tech stack

- **Frontend**: React 17, Material-UI 4, react-router-dom 5
- **Backend**: Firebase Cloud Functions (Node.js + Express)
- **Data**: Firestore (users → stations → sessions hierarchy)
- **Auth**: Firebase Auth
- **Hosting**: Firebase Hosting + Functions

## What's been redacted

For archive hygiene:

- `src/firebase.js` — Web API key + project ID replaced with placeholders
- `.firebaserc` — replaced by `.firebaserc.example`
- `firebase-emulators/` and `node_modules/` removed (regenerable)

The compiled `build/` bundle is preserved as the original deploy artifact.
Firebase Web API keys are not secrets per Firebase's design (security is
enforced via Firestore Rules); they are redacted in source for repo hygiene.

## Running locally

This is an archive — running it requires a fresh Firebase project. Steps:

1. Create a new Firebase project (Firestore + Auth + Functions)
2. Copy your config into `src/firebase.js`
3. Copy your project ID into `.firebaserc`
4. `npm install && npm install --prefix functions`
5. `npm start` for dev, `npm run build && firebase deploy` to ship

## Acknowledgements

Initial project scaffolding (React + Firebase Auth + Firestore setup) was
inspired by a YouTube tutorial for a URL-shortener (the `package.json` name
`shortly` reflects that early origin). The session-flow orchestration logic,
station/session data model, and Cloud Functions integration are original
implementation.

---

*Restored in 2026 from a local archive of the May 2022 build.*
