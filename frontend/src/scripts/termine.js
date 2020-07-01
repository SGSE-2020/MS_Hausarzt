
var username;
var userid;

function create_new_akte() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    anamnese = $('#anamnese_input').val(),
    symptome = $('#symptome_input').val(),
    sonstiges = $('#sonstiges_input').val()

    if (userid != "" && userid != null) {
        if (anamnese != "") {
            today = mm + '.' + dd + '.' + yyyy;
            akte = {
                "name": username,
                "userid": userid,
                "datum": today,
                "anamnese": anamnese,
                "symptome": symptome,
                "sonstiges": sonstiges
            }
            fetch(url_base + "/patienten/create" , {
                method: 'POST', 
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(akte)
            }).then(response => response.text()
            ).then(response => {
                display_patientenakte(userid, username, true)
            }).catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert("Mindestens Anamnese ausfüllen")
        }
    } else {
        alert("Bitte anmelden")
    }
}
 