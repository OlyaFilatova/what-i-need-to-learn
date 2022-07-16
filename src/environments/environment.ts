// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
require('dotenv').config();

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: process.env.firebaseConfig_apiKey,
        authDomain: process.env.firebaseConfig_authDomain,
        databaseURL: process.env.firebaseConfig_databaseURL,
        projectId: process.env.firebaseConfig_projectId,
        storageBucket: process.env.firebaseConfig_storageBucket,
        messagingSenderId: process.env.firebaseConfig_messagingSenderId,
        appId: process.env.firebaseConfig_appId,
        measurementId: process.env.firebaseConfig_measurementId,
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
