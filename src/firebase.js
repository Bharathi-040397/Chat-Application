import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDxivtiYkj1_6UJrQ47FlZGZo0NVgRkFkY",
    authDomain: "chat-application-c7267.firebaseapp.com",
    projectId: "chat-application-c7267",
    storageBucket: "chat-application-c7267.appspot.com",
    messagingSenderId: "971052394439",
    appId: "1:971052394439:web:dd4487451bbd61a7e4dbe2",
    measurementId: "G-SKH8HYDJG0"
};
  
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;
