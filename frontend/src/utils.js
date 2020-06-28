var username = null;
var email = null;
var userid = null;

$(document).ready(function () {
    
    //Firebase Initialisierung
    var config = {
    	    apiKey: "AIzaSyBvTg0_QrhEvQ9UeZPH8--E2JZ55KA_u_c",
    	    authDomain: "smart-city-ss2020.firebaseapp.com",
    	    databaseURL: "https://smart-city-ss2020.firebaseio.com",
    	    projectId: "smart-city-ss2020",
    	    storageBucket: "smart-city-ss2020.appspot.com",
    	    messagingSenderId: "957240233717"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
        email = null
        username = null
        userid = null
        document.cookie = 'token=;'
    })
});

function loginUser() {
    var email_login = $('#mail_signin').val();
    var password = $('#password_signin').val();

    if(email_login != undefined && email_login.length > 0 && password != undefined && password.length > 0){
        firebase.auth().signInWithEmailAndPassword(email_login, password).then(function(user) {
            firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                //Token zu Bürgerbüro senden -> Uid zurückbekommen -> Dann User validiert
                fetch('https://buergerbuero.dvess.network/api/user/verify/' + idToken, {method: 'POST'}).then(response => response.json()).then(json => {
                    if (json && json.status == 'success') {
                        user = firebase.auth().currentUser
                        console.log(user)
                        email = user.email
                        username = user.displayName
                        userid = user.uid
                        document.cookie = 'token=' + idToken + ';'
                        //document.cookie = 'username=' + username + ';'
                    } else {
                        alert("Dieser Nutzer konnte nicht verifiziert werden")
                    }
                }).catch((error) => {
                    console.log(error)
                    alert("Dieser Nutzer konnte nicht verifiziert werden")
                })
                document.getElementById("login_button").hidden = true
                document.getElementById("logout_button").hidden = false
                console.log("Token ist:\n" + idToken);
                closeForm()
            }).catch(function(error) {
                console.log(error);
            });
        }, function(error) {
            if(error.code == "auth/invalid-email" || error.code == "auth/wrong-password" || error.code == "auth/user-not-found"){
                alert("E-Mail oder Passwort falsch oder User existiert nicht");
            } else if(error.code == "auth/user-disabled"){
                alert("Dieser Nutzer ist deaktiviert");
            } else {
                alert(error);
            }
        });
    } else {
        alert("Bitte Mail und Passwort eingeben"); 
    }
};
    
function logoutUser() {
	firebase.auth().signOut().then(function() {
		//Logout erfolgreich
        document.cookie = 'token=;'
        document.getElementById("login_button").hidden = false
        document.getElementById("logout_button").hidden = true
       
	}, function(error) {
		alert("Logout fehlgeschlagen");
	});
};



