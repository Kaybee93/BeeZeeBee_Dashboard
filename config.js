import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBxFc2dfg-HsoiS_jshCPTEUjc6hL9eq2Y",
  authDomain: "beezeebee-891fb.firebaseapp.com",
  databaseURL: "https://beezeebee-891fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beezeebee-891fb",
  storageBucket: "beezeebee-891fb.appspot.com",
  messagingSenderId: "98547124788",
  appId: "1:98547124788:web:786eda3b304d66191f9861",
  measurementId: "G-SQLJ2XCM2F"
};

firebase.initializeApp(firebaseConfig)

export { firebase };