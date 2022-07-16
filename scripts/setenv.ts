const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   firebaseConfig: {
       apiKey: "${process.env.firebaseConfig_apiKey}",
       authDomain: "${process.env.firebaseConfig_authDomain}",
       databaseURL: "${process.env.firebaseConfig_databaseURL}",
       projectId: "${process.env.firebaseConfig_projectId}",
       storageBucket: "${process.env.firebaseConfig_storageBucket}",
       messagingSenderId: "${process.env.firebaseConfig_messagingSenderId}",
       appId: "${process.env.firebaseConfig_appId}",
       measurementId: "${process.env.firebaseConfig_measurementId}",
   }
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
