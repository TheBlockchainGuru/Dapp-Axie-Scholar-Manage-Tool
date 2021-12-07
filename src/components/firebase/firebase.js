import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDGuIq5rvCL3rrJ9ir5WnBhNKmNTXlFbLc",
  authDomain: "slp-balance-ronin.firebaseapp.com",
  projectId: "slp-balance-ronin",
  storageBucket: "slp-balance-ronin.appspot.com",
  messagingSenderId: "861449661031",
  appId: "1:861449661031:web:83e61000703a8ab6a482c2",
  measurementId: "G-JFL8MKDGBE"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
