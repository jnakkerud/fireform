import * as functions from 'firebase-functions'
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const json2csv = require("json2csv").parse;

// See basic example: https://github.com/firebase/functions-samples/tree/master/typescript-getting-started
export const downloadCSV = functions.https.onCall((data, context) => {

    const collectionId = data.collectionId;
    console.log('collectionId:'+collectionId);

    const db = admin.firestore()
    return db.collection(`formdata/${collectionId}/data`)
    .get() 
    .then((querySnapshot: any[]) => {
       
       const csvData: any[] = []

       querySnapshot.forEach(doc => {
           // TODO convert Timestamp to Date
           csvData.push( doc.data() )
       });

       
       return json2csv(csvData);
    })
   .catch((err: any) => console.log(err) )
});