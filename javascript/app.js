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
var arrname = []
var arrroll = []
var arrgen = []
var arrsec = []

var stdno = 0;
function loading() {
    saveData("hammad", 12, "b", "male")
    console.log("hammad", 12, "b", "male")
}
//   function dataselection(){
//       document.getElementById("tbody1").innerHTML=""
//       firebase.database().ref('students').once('value',
//       function(allrecords){
//   allrecords.forEach(
//       function(currentrecord){
//           var name =currentrecord.val().NameofStudent;
//           var roll =currentrecord.val().roll;
//           var sec =currentrecord.val().section;
//           var gen =currentrecord.val().gender;


//       additemstotable(name,roll,sec,gen);
//       }
//   );
//       });
//   }
function selectall() {

    document.getElementById("tbody1").innerHTML = ""
    stdno = 0
    firebase.database().ref('student').once('value',
        function (allrecords) {
            allrecords.forEach(
                function (currentrecord) {
                    var name = currentrecord.val().NameofStudent;
                    var roll = currentrecord.val().roll;
                    var sec = currentrecord.val().section;
                    var gen = currentrecord.val().gender;


                    additemstotable(name, roll, sec, gen);
                }
            );
        });

}
// function selectall2(){
// firebase.database().ref('students').once('value',
//     function(allrecords){
// allrecords.forEach(
//     function(currentrecord){
//         var name =currentrecord.val().NameofStudent;
//         var roll =currentrecord.val().roll;
//         var sec =currentrecord.val().section;
//         var gen =currentrecord.val().gender;
//     // additemstotable(name,roll,sec,gen);
//     }
// );
//     });
// }
function loginauth() {
    var name = +prompt("type name")


}
function saveData(name, roll, sec, gen) {
    app.database().ref('student' + modroll.value).push({ NameofStudent: name, roll: roll, section: sec, gender: gen })
}
window.onload = selectall()

var stdlist = [];
function additemstotable(name, roll, sec, gen) {
    var tbody = document.getElementById('tbody1')
    var trow = document.createElement('tr')
    var td1 = document.createElement('td')
    var td2 = document.createElement('td')
    var td3 = document.createElement('td')
    var td4 = document.createElement('td')
    var td5 = document.createElement('td')
    stdlist.push([name, roll, gen, sec])
    td1.innerHTML = ++stdno;
    td2.innerHTML = name;
    td3.innerHTML = roll;
    td4.innerHTML = sec;
    td5.innerHTML = gen;
    td2.classList += "namefield"
    td3.classList += "rollfield"
    td4.classList += "secfield"
    td5.classList += "genfield"
    trow.appendChild(td1)
    trow.appendChild(td2)
    trow.appendChild(td3)
    trow.appendChild(td4)
    trow.appendChild(td5)
    var controldiv = document.createElement("div");
    controldiv.innerHTML = '<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="fillrow(null)">add new record </button>'
    controldiv.innerHTML += '<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="fillrow(' + stdno + ')">edit record </button>'

    trow.appendChild(controldiv)
    tbody.appendChild(trow)
}
var modname = document.getElementById('namemodal');
var modroll = document.getElementById('rollmodal');
var modsec = document.getElementById('secmodal');
var modgen = document.getElementById('gendermodal');
var btadd = document.getElementById('addmodal')
var btup = document.getElementById('updatemodal')
var btdel = document.getElementById('delmodal')
var ab = 0;
function fillrow(index) {
    if (index == null) {
        modname.value = " "
        modroll.value = " "
        modsec.value = " "
        modgen.value = " "
        btadd.style.display = "inline-block"
        btup.style.display = "none"
        btdel.style.display = "none"


    }
    else {

        --index;
        ab = index
        modname.value = stdlist[index][0]
        modroll.value = stdlist[index][1]
        modsec.value = stdlist[index][2]
        modgen.value = stdlist[index][3]
        modroll.display = true
        btadd.style.display = "none"
        btup.style.display = "inline-block"
        btdel.style.display = "inline-block"
    }

}

function addrecstd() {
    firebase.database().ref("student/" + modroll.value).set(
        {
            NameofStudent: modname.value,
            roll: modroll.value,
            section: modsec.value,
            gender: modgen.value

        },
        (error) => {
            if (error) {
                alert("record added failed")
            }
            else {
                alert("record added")
                selectall()
                $("#exampleModalCenter").modal('hide')
            }
        }
    )
}
function updrecstd() {
    firebase.database().ref("student/" + modroll.value).update(
        {
            NameofStudent: modname.value,
            roll: modroll.value,

            section: modsec.value,
            gender: modgen.value

        },
        (error) => {
            if (error) {
                alert("record updated failed")
            }
            else {
                alert("record updated")
                selectall()
                $("#exampleModalCenter").modal('hide')
            }
        }
    )
}
function delrecstd() {
    firebase.database().ref("student/" + modroll.value).remove().then(
        function () {
            alert("record deleted ")
            selectall()
            $("#exampleModalCenter").modal('hide')

        }
    )
}
var searchbar = document.getElementById('searchbar')
var searchbtn = document.getElementById('searchbtn')
var category = document.getElementById("categoryselector")
var tbody = document.getElementById('tbody1')
var found;
function searching(Category) {
    var filter = searchbar.value.toUpperCase()
    var tr = tbody.getElementsByTagName("tr")
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByClassName(Category)
        for (let j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true
            }
        }
        if (found) {
            tr[i].style.display = ""
            found = false
        }
        else {
            tr[i].style.display = "none"
        }
    }
    
}
searchbtn.onclick = function () {
    if (searchbar.value == "");
    else if (category.value == 1) {
        searching("namefield")
    }
    else if (category.value == 2) {
        searching("rollfield")
    }
    else if (category.value == 3) {
        searching("secfield")
    }
    else if (category.value == 4) {
        searching("genfield")
    }
}