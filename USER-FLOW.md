# User Flow

1. Visitor lands on the registration page and sees a short description of the
   public network rules.
2. Visitor fills in name, email, and phone fields, accepting the terms.
3. Visitor submits the form.
4. Form validates locally; if valid, a loading state appears while Firestore
   stores the record.
5. On success, confirmation text appears and the Wi-Fi password is revealed.
6. On failure, an inline error message instructs the user to retry later.

