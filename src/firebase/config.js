import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDN1AYer-bmVQV1wUOXL5dVAr3tftrQdkw",
  authDomain: "olx-clone-react-9debf.firebaseapp.com",
  projectId: "olx-clone-react-9debf",
  storageBucket: "olx-clone-react-9debf.appspot.com",
  messagingSenderId: "632491105253",
  appId: "1:632491105253:web:3100af431c427c1ce36d0c",
  measurementId: "G-X1KT9EXP32",
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore()
const auth=firebase.auth()
const storage=firebase.storage()
export {db,auth,storage}
// Export for usage
export default firebaseApp;
