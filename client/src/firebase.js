import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB-VIPVnf-r--9dU74o1niqcNX7ixQhURk",
  authDomain: "twitter-lookup.firebaseapp.com",
  databaseURL: "https://twitter-lookup.firebaseio.com",
  projectId: "twitter-lookup",
  storageBucket: "twitter-lookup.appspot.com",
  messagingSenderId: "841497355510"
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
