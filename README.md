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

Before deploying, be sure to create the file `.firebaserc` in the project root.

This file should contain the name of the firebase project ID to be deployed:  

```
{
  "projects": {
    "default": "[Name of firebase project ID]"
  }
}
```

Deploy to the Firebase web-hosted project:

```
npm run deploy
```

## Cloud Functions

Fireform uses [Cloud Functions for Firebase](https://firebase.google.com/docs/functions) defined in `functions/src/index.ts`

### Testing Cloud Functions

Cloud functions can be tested locally:

Make sure that you have created an `admin-key.json` in the `functions` directory.  Instructions to create the file can be found [here](https://firebase.google.com/docs/admin/setup). This step is only done once.

1. Uncomment the last line in the providers section in `src/app/core/core.module.ts`

2. Run the application:
```
ng serve
```

3. Add the following environment variable:

```
export GOOGLE_APPLICATION_CREDENTIALS="<fireform-project>/functions/admin-key.json"
```

4. Email configuration should already be deployed. To use the configuration locally, provide a `.runtimeconfig.json` in the functions directory:

```
firebase functions:config:get > .runtimeconfig.json
# If using Windows PowerShell, replace the above with:
# firebase functions:config:get | ac .runtimeconfig.json
firebase functions:shell
```

5. Run the firebase server from the functions directory:
```
npm run serve
```

### Email configuration

Fireform uses a cloud function for sending email invitations. 

In order to send emails from Fireform, you will need to provide a valid email configuration.  Fireform uses [Nodemailer](https://nodemailer.com/) with the [Mailgun transport](https://www.npmjs.com/package/nodemailer-mailgun-transport).  If you have a [Mailgun](https://www.mailgun.com/homepage/) account then simply create a `functions/email-credentials.json` file that contains your credentials like:
```
  {
    "auth": {
      "api_key": "mailgun-api-key",
      "domain": "yourdomain.com"
    },
    "fromUser": "Fireform <user@emaildomain.com>"
  }
```

It is possible to use other transports with [Nodemailer](https://nodemailer.com/), like gmail or SMTP.  To support other transports, you will need to modify `functions/src/email-auth.ts`


