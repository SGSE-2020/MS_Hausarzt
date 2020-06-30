
var userid;

function display_patientenakte(user_id, name, read=false) {
    fetch(url_patientenakte + "/" + user_id, {
        method: 'GET'
    }).then(response => response.json())
        .then(result => {
            if ("patientenakte" in result) {
                var patienten_akte_html = document.getElementById("patienten_akte");
                patienten_akte_html.innerHTML = "";
                for (i = 0; i < result["patientenakte"].length; i++) {
                    patienten_akte = result["patientenakte"][i]
                    
                    datum = patienten_akte["aktenid"] + "datum_input"
                    symptome = patienten_akte["aktenid"] + "symptome_input"
                    anamnese = patienten_akte["aktenid"] + "anamnese_input"
                    diagnose = patienten_akte["aktenid"] + "diagnose_input"
                    medikation = patienten_akte["aktenid"] + "medikation_input"
                    psychisch = patienten_akte["aktenid"] + "psychisch_input"
                    sonstiges = patienten_akte["aktenid"] + "sonstiges_input"

                    h2 = document.createElement('h2');
                    h2.innerHTML = "Patientenakte " + i + " - " + name
                    patienten_akte_html.appendChild(h2)

                    p_datum = document.createElement('p');
                    p_datum.innerHTML = "Datum: "

                    p_datum2 = document.createElement('input');
                    p_datum2.setAttribute("value", patienten_akte["datum"]);
                    p_datum2.setAttribute("id", datum);
                    p_datum2.readOnly = true;
                    p_datum.appendChild(p_datum2)
                    patienten_akte_html.appendChild(p_datum)

                    p_anamnese = document.createElement('label');
                    p_anamnese.innerHTML = "Ananmese: "

                    p_anamnese2 = document.createElement('input');
                    p_anamnese2.setAttribute("id",anamnese);
                    p_anamnese2.setAttribute("type", "text");
                    p_anamnese2.setAttribute("value", patienten_akte["anamnese"]);
                    p_anamnese.appendChild(p_anamnese2)
                    patienten_akte_html.appendChild(p_anamnese)

                    p_symptome = document.createElement('p');
                    p_symptome.innerHTML = "Symptome: "

                    p_symptome2 = document.createElement('input');
                    p_symptome2.setAttribute("id",symptome);
                    p_symptome2.setAttribute("type", "text");
                    p_symptome2.setAttribute("value", patienten_akte["symptome"]);
                    p_symptome.appendChild(p_symptome2)
                    patienten_akte_html.appendChild(p_symptome) // mach das so wie bei anamnese .....................

                    p_diagnose = document.createElement('p');
                    p_diagnose.innerHTML = "Diagnose: "

                    p_diagnose2 = document.createElement('input');
                    p_diagnose2.setAttribute("id",diagnose);
                    p_diagnose2.setAttribute("type", "text");
                    if (read) {
                        p_diagnose2.readOnly = true;
                    }
                    p_diagnose2.setAttribute("value", patienten_akte["diagnose"]);
                    p_diagnose.appendChild(p_diagnose2)
                    patienten_akte_html.appendChild(p_diagnose)

                    p_medikation = document.createElement('p');
                    p_medikation.innerHTML = "Medikation: "

                    p_medikation2 = document.createElement('input');
                    p_medikation2.setAttribute("id",medikation);
                    p_medikation2.setAttribute("type", "text");
                    if (read) {
                        p_medikation2.readOnly = true;
                    }
                    p_medikation2.setAttribute("value", patienten_akte["medikation"]);
                    p_medikation.appendChild(p_medikation2)
                    patienten_akte_html.appendChild(p_medikation)

                    p_psychisch = document.createElement('p');
                    p_psychisch.innerHTML = "Psychisch Krank: "

                    p_psychisch2 = document.createElement('input');
                    p_psychisch2.setAttribute("id", psychisch);
                    p_psychisch2.setAttribute("type", "text");
                    if (read) {
                        p_psychisch2.readOnly = true;
                    }
                    p_psychisch2.setAttribute("value", patienten_akte["psychischkrank"]);
                    p_psychisch.appendChild(p_psychisch2)
                    patienten_akte_html.appendChild(p_psychisch)

                    p_sonstiges = document.createElement('p');
                    p_sonstiges.innerHTML = "Sonstiges: "

                    p_sonstiges2 = document.createElement('input');
                    p_sonstiges2.setAttribute("id",sonstiges);
                    p_sonstiges2.setAttribute("type", "text");
                    p_sonstiges2.setAttribute("value", patienten_akte["sonstiges"]);
                    p_sonstiges.appendChild(p_sonstiges2)
                    patienten_akte_html.appendChild(p_sonstiges)

                    p_aktenid = document.createElement('p');
                    p_aktenid.innerHTML = "<p> ID: " + patienten_akte["aktenid"]
                    patienten_akte_html.appendChild(p_aktenid)

                    p_button = document.createElement('p');
                    p_button.innerHTML = "Änderungen speichern"
                    p_button.setAttribute("class", "hover_effect");

                    aktenid = patienten_akte["aktenid"]
                    p_button.onclick = (function(aktenid, user_id) {
                        return function() {
                            update_patientenakte(aktenid, user_id);
                        };
                    })(aktenid, user_id)
                    patienten_akte_html.appendChild(p_button)

                    hr = document.createElement('hr');
                    patienten_akte_html.appendChild(hr)

                }
            }
        })
        .catch(error => {
        console.error('Error:', error);
    });
}

function update_patientenakte(aktenid, user_id) {    
    datum = "#" + aktenid + "datum_input"
    symptome = "#" + aktenid + "symptome_input"
    anamnese = "#" + aktenid + "anamnese_input"
    diagnose = "#" + aktenid + "diagnose_input"
    medikation = "#" + aktenid + "medikation_input"
    psychisch = "#" + aktenid + "psychisch_input"
    sonstiges = "#" + aktenid + "sonstiges_input"
    akte = {
        "userid": user_id,
        "aktenid": aktenid,
        "datum": $(datum).val(),
        "anamnese": $(anamnese).val(),
        "symptome": $(symptome).val(),
        "diagnose": $(diagnose).val(),
        "medikation": $(medikation).val(),
        "psychischkrank": $(psychisch).val(),
        "sonstiges": $(sonstiges).val()
    }

    fetch(url_base + "/patienten/update" , {
        method: 'PUT', 
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

function display_patienten() {
    if (userid) {
        fetch(url_patienten + "/all", {
            method: 'GET',
        }).then(response => response.json())
            .then(result => {
                if (result.length > 0) {
                    var patienten_list = document.getElementById("patienten_list");
                    patienten_list.innerHTML = ""
                    var content = "";
                    for (i = 0; i < result.length; i++) {
                        name =  result[i]["name"]
                        userid_ = result[i]["userid"]

                        li = document.createElement('LI');
                        li.setAttribute("id", "li" + i);
                        li.setAttribute("class", "hover_effect");
                        li.innerHTML = name

                        li.onclick = (function(userid_, name) {
                            return function() {
                                display_patientenakte(userid_, name);
                            };
                        })(userid_, name)

                        patienten_list.appendChild(li)
                    }
                }
            })
            .catch(error => {
            console.error('Error:', error);
        });
    } else {
        var patienten_list = document.getElementById("patienten_list");
        patienten_list.innerHTML = "Anmeldung erforderlich"
    }
}