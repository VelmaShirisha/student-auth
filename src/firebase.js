import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzg6WIUm5eEmay-2c7HG72_Z12PlvfAnc",
    authDomain: "react-auth-a59dd.firebaseapp.com",
    projectId: "react-auth-a59dd",
    storageBucket: "react-auth-a59dd.appspot.com",
    messagingSenderId: "354319244976",
    appId: "1:354319244976:web:819dba9c6a28ef535ee575"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const db = app.firestore();

  const auth = firebase.auth();

  export { db, auth };
