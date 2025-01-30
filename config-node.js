const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: 'src/.env' });;

const envFile = `export const environment = {
    BLOB_READ_WRITE_TOKEN: '${process.env.BLOB_READ_WRITE_TOKEN}',
    EDGE_CONFIG: '${process.env.EDGE_CONFIG}',
    USER_TOKEN_AUTH: '${process.env.USER_TOKEN_AUTH}',
    EDGE_CONFIG_ID: '${process.env.EDGE_CONFIG_ID}',
    KEY_RECIPE_ELEMENT: '${process.env.KEY_RECIPE_ELEMENT}',
    firebaseConfig: {
        apiKey: '${process.env.FIREBASE_CONFIG_API_KEY}',
        authDomain: '${process.env.FIREBASE_CONFIG_AUTH_DOMAIN}',
        projectId: '${process.env.FIREBASE_CONFIG_PROJECT_ID}',
        storageBucket: '${process.env.FIREBASE_CONFIG_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID}',
        appId: '${process.env.FIREBASE_CONFIG_APP_ID}',
        measurementId: '${process.env.FIREBASE_CONFIG_MEASUREMENT_ID}',
    }
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
    }
});