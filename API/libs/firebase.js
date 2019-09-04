const firebase = require('firebase');
require('firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyAgWntcptOsuS6zj7OeIRRwv2vdvcuxE0M", 
  authDomain: "library-phase-4-4a5e3.firebaseapp.com",
  databaseURL: "https://library-phase-4-4a5e3.firebaseio.com",
  projectId: "library-phase-4-4a5e3",
  storageBucket: "library-phase-4-4a5e3.appspot.com",
  messagingSenderId: "881917592700",
  appId: "1:881917592700:web:cd592e54d81ad336"
};

firebase.initializeApp(firebaseConfig);

module.exports = {
  db: firebase.firestore()
};
