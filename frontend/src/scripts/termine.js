
var username;
var userid;

function create_new_akte() {
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
        "sonstiges": $('#sonstiges_input').val()
    }
    fetch("http://localhost:8080/api/patienten/create" , {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(akte)
    }).then(response => response.text()
    ).then(response => {
    }).catch((error) => {
      console.error('Error:', error);
    });
  
}
 