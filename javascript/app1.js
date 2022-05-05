const firebaseConfig = {
    apiKey: "AIzaSyBvGhzU4RKM4hsR7-9Lx9KRju4XctGaeLU",
    authDomain: "univ-17c45.firebaseapp.com",
    databaseURL: "https://univ-17c45-default-rtdb.firebaseio.com",
    projectId: "univ-17c45",
    storageBucket: "univ-17c45.appspot.com",
    messagingSenderId: "154980446150",
    appId: "1:154980446150:web:b6b42bcc74578debadccc7"
};
var app = firebase.initializeApp(firebaseConfig);
var stdlist=[]
firebase.database().ref('student').once('value',
function (allrecords) {
    allrecords.forEach(
        function (currentrecord) {
            var name = currentrecord.val().NameofStudent;
            var roll = currentrecord.val().roll;
            var sec = currentrecord.val().section;
            var gen = currentrecord.val().gender;
            stdlist.push([name, roll, gen, sec])
        }
    );
});
function login(){
    var user=document.getElementById("username").value;
    var pass1=document.getElementById("pass").value;
    for(var i=0;i<stdlist.length;i++){
        if(user==stdlist[i][0] && pass1==stdlist[i][1]){
document.write("congrats")
var greet=+prompt("nasdjnsajkd")
        }
    }
    
}