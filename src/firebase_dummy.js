import {initializeApp} from 'firebase';

const app = initializeApp({
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
      })

export const db = app.database();
export const projectRef = db.ref('projects');
export const userRef = db.ref('users');
export const entryRef = db.ref('entrys');
export const auth = app.auth();