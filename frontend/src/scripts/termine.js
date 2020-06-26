
var username;
var userid;

function create_new_akte() {
    console.log(username)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '.' + dd + '.' + yyyy;
    akte = {
        "name": username,
        "userid": userid,
        "datum": today,
        "anamnese": $('#anamnese_input').val(),
        "symptome": $('#symptome_input').val(),
        "sonstiges": $('#sonstiges_input').val(),
    }
    console.log(akte)
}
 