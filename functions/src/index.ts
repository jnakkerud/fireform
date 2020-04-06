import * as functions from 'firebase-functions'
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

import { firestore } from 'firebase-admin';

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