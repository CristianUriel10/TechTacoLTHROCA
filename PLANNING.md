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

- Mantain a single-column responsive layout focused on conversions.
- Use CSS variables with the Grupo Roca + LTH + TechTaco palette:
  - Verde corporativo `#00954c`
  - Rojo LTH `#d22730`
  - Azul acento `#005cab`
  - Gris grafito `#2c2c2c`
  - Morado TechTaco `#6b4dff`
  - Amarillo taco `#f4c542`
- Showcase Grupo Roca, LTH y TechTaco logos en el hero con separación adecuada y
  alt-text for accessibility.
- Keep files under 300 lines by splitting CSS/JS where necessary.

## Data Flow

1. User fills out registration form.
2. Client validates fields.
3. Client fetches a lightweight IP fingerprint to detect returning visitors.
4. Client writes record (email + optional phone + IP) to Firestore collection
   `publicNetworkRegistrations`.
5. On success, the Wi-Fi credentials appear with a copy-to-clipboard action.
6. After copying, the UI transitions to a thank-you screen.
7. Returning visits detected via stored IP/local flag display a “ya registrado”
   notice instead of the full form.

## Testing Strategy

- Add basic Jest + Testing Library coverage for the validation helper.
- Manual verification of Firestore writes using Firebase Emulator or console.
