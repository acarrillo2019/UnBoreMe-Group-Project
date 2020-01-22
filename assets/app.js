
var firebaseConfig = {
    apiKey: "AIzaSyCeshwfwLmlh2uwM6BLs7J4SmoUbmZvoGQ",
    authDomain: "unboreme-b99d9.firebaseapp.com",
    databaseURL: "https://unboreme-b99d9.firebaseio.com",
    projectId: "unboreme-b99d9",
    storageBucket: "unboreme-b99d9.appspot.com",
    messagingSenderId: "1080038770107",
    appId: "1:1080038770107:web:4c8db7157faf340aaa309e"
};

firebase.initializeApp(firebaseConfig);

database = firebase.database()





database.ref().on("value", function(snapshot) {

    console.log(snapshot.val())

});