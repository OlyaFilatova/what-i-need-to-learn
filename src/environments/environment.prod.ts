require('dotenv').config();

export const environment = {
    production: true,
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
