# Domestic Marketing Consultant

Static portfolio website with a Firebase-powered administration dashboard.

## Website

- Public website: `index.html`
- Administration: `admin.html`
- Firebase project: `domestic-marketing-consultant`

## Firebase setup

1. Enable Email/Password Authentication.
2. Create Firestore in production mode.
3. Copy the administrator's Firebase Authentication UID into `firestore.rules`.
4. Publish those rules in Firebase Console → Firestore Database → Rules.
5. Open `/admin.html`, sign in, and select **Import current portfolio**.

The Firebase web API key in `assets/js/firebase-config.js` is a public client identifier. Access is controlled by Authentication and Firestore Security Rules.

## Image storage

Existing images are stored in `assets/images`. New projects currently accept a web image URL or repository asset path. Direct Firebase Storage uploads can be added after the project is upgraded to the Blaze plan.
