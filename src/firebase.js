import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBXpqhPwKs6zgcWVk4Xv-XiITXrUGSHzbI",
    authDomain: "clone-564fe.firebaseapp.com",
    databaseURL: "https://clone-564fe.firebaseio.com",
    projectId: "clone-564fe",
    storageBucket: "clone-564fe.appspot.com",
    messagingSenderId: "701244301402",
    appId: "1:701244301402:web:871b91727880bb039bb863"
  };

  // initialize the app
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

  export {db, auth};