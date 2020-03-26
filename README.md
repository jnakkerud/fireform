# Fireform

Fireform is a tool for rapidily creating forms that can collect information from users.  The information collected from users is stored in [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore)

## Technologies Used

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Firebase](https://firebase.google.com/)

## Getting started

### Prerequisites

Latest [Node.js](https://www.nodejs.org/) is installed.

**1. Install Angular CLI**:
```
npm install -g @angular/cli
```
**2. Install Firebase CLI**:
```
npm install -g firebase-tools
```
**3. Create a Firebase project**:

Create a new project in the [firebase console](https://console.firebase.google.com/)

Add a web app and enable hosting, firestore, authentication and functions.

For authentication, enable sign in providers: Email/Password and Anonymous.

Create an Email/Password user that can be used to sign into Fireform.

**4. Add src/app/api-keys.ts**:

In [firebase console](https://console.firebase.google.com/) under project settings. Copy the config from the Firebase SDK snippet section.

Place the copied config in a new file: `src/app/api-keys.ts`

**5. Run**:
```
ng serve
```
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

Deploy to the Firebase web-hosted project:

```
ng deploy
```

