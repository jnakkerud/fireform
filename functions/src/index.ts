import * as functions from 'firebase-functions'

import { credentials, fromUser } from '../email-credentials';

const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

import { firestore } from 'firebase-admin';

interface EmailToken {
    email: string;
    token: string;
}

interface EmailOptions {
    subject: string;
    message: string;
    url: string;
    tokens: EmailToken[];
}

const transporter = nodemailer.createTransport(credentials);

const json2csv = require("json2csv").parse;

function convert(data: any) {
    const validData: {[index: string]: any} = {};

    Object.keys(data).forEach(key => {
        let val = data[key];
        if (val instanceof firestore.Timestamp) {
            const ts = new firestore.Timestamp(val.seconds, val.nanoseconds).toDate();
            if (key === 'timestamp') {
                val = ts.toISOString();
            } else {
                val = ts.toLocaleDateString();
            }
        } else if (Array.isArray(val)) {
            // array values: comma delimted quotes
            val = val.join();
        }
        validData[key] = val;
    });

    return validData;
}

function send(mailOptions: any) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            } else {
                return resolve();
            }
        });
    });
};

// See basic example: https://github.com/firebase/functions-samples/tree/master/typescript-getting-started
export const downloadCSV = functions.https.onCall((data, context) => {

    const collectionId = data.collectionId;

    const db = admin.firestore()
    return db.collection(`formdata/${collectionId}/data`)
    .get() 
    .then((querySnapshot: any[]) => {
       
       const csvData: any[] = [];

       querySnapshot.forEach(doc => {
           const d = doc.data();
           csvData.push( convert(d) );
       });
       
       return json2csv(csvData);
    })
   .catch((err: any) => console.log(err) )
});

export const sendMail = functions.https.onCall((data, context) => {
      
    const emailOptions: EmailOptions = data as EmailOptions;    
    const tokens = emailOptions.tokens;

    return Promise.all(tokens.map(async (emailToken) => {
        await send({
            from: fromUser,
            to: emailToken.email,
            subject: emailOptions.subject, 
            html: `<p style="font-size: 16px;">${emailOptions.message}</p>
                <br />
                <a href="${emailOptions.url}?s=${emailToken.token}">Survey form</a>
            `
        });
    }));

});