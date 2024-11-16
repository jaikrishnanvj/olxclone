import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_gdq4JbFYvvdAFeygIkp8EAm525V2F-Q",
    authDomain: "fir-b1e35.firebaseapp.com",
    projectId: "fir-b1e35",
    storageBucket: "fir-b1e35.firebasestorage.app",
    messagingSenderId: "177922214673",
    appId: "1:177922214673:web:ba106505079dc6cdb51ab0",
    measurementId: "G-GVWLVLEWP8"
  };

  export  default firebase.initializeApp(firebaseConfig)