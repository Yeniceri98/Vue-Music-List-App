import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAVbWLWkooN77XoU76hbWQUqgTyRoQUiH8",
    authDomain: "music-list-baa70.firebaseapp.com",
    projectId: "music-list-baa70",
    storageBucket: "music-list-baa70.appspot.com",
    messagingSenderId: "279292237217",
    appId: "1:279292237217:web:4f1d94fe7c06429e7367e0"
};

// Init Firebase
firebase.initializeApp(firebaseConfig)

// Init Services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp


export { projectFirestore, projectAuth, timestamp }