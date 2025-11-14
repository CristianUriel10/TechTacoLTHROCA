# Project Planning

## Overview

This project is a minimal single-page registration flow that stores form
submissions in Firebase Firestore and reveals the Wi-Fi password after the
submission completes successfully.

## Architecture

- Plain HTML, CSS, and JavaScript served as a static site.
- Firebase SDK is loaded via script tags with configuration provided via
  environment variables or inline placeholders.
- Firestore write occurs client-side with validation before submission.

## Styling Guidelines

- Keep layout responsive with a single-column form.
- Use CSS variables for colors and spacing to keep the theme consistent.
- Keep files under 300 lines by splitting CSS/JS where necessary.

## Data Flow

1. User fills out registration form.
2. Client validates fields.
3. Client writes record to Firestore collection `publicNetworkRegistrations`.
4. On success, form hides and password section displays with network
   credentials.

## Testing Strategy

- Add basic Jest + Testing Library coverage for the validation helper.
- Manual verification of Firestore writes using Firebase Emulator or console.

