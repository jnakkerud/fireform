import * as functions from 'firebase-functions'



// See basic example: https://github.com/firebase/functions-samples/tree/master/typescript-getting-started
export const downloadCSV = functions.https.onCall((data, context) => {

    const example = `
    John,Doe,120 jefferson st.,Riverside, NJ, 08075
    Jack,McGinnis,220 hobo Av.,Phila, PA,09119
    "John ""Da Man""",Repici,120 Jefferson St.,Riverside, NJ,08075
    Stephen,Tyler,"7452 Terrace ""At the Plaza"" road",SomeTown,SD, 91234
    ,Blankman,,SomeTown, SD, 00298
    "Joan ""the bone"", Anne",Jet,"9th, at Terrace plc",Desert City,CO,00123    
    `;

    console.log('collectionId:'+data.collectionId);

    // fake a csv download

    return example;
});