

function display_patientenakte(user_id, name) {
    fetch(url_patientenakte + "/" + user_id, {
        method: 'GET'
    }).then(response => response.json())
        .then(result => {
            if ("patientenakte" in result) {
                var patienten_akte_html = document.getElementById("patienten_akte");
                var content = "";
                for (i = 0; i < result["patientenakte"].length; i++) {
                    patienten_akte = result["patientenakte"][i]
                    
                    content = content.concat("<h2> Patientenakte " + i + " - " + name + "</h2>")
                    content = content.concat("<p> Datum: " + patienten_akte["datum"] + "</p>")
                    content = content.concat("<p> Anamese: " + patienten_akte["anamnese"] + "</p>")
                    content = content.concat("<p> Symptome: " + patienten_akte["symptome"] + "</p>")
                    content = content.concat("<p> Diagnose: " + patienten_akte["diagnose"] + "</p>")
                    content = content.concat("<p> Mediaktion: " + patienten_akte["medikation"] + "</p>")
                    content = content.concat("<p> Psychisch Krank: " + patienten_akte["psychischkrank"] + "</p>")
                    content = content.concat("<p> Sonstiges: " + patienten_akte["sonstiges"] + "</p>")
                    content = content.concat("<hr>")

                }
                patienten_akte_html.innerHTML = content;
            }
        })
        .catch(error => {
        console.error('Error:', error);
    });
}

function display_patienten() {
    if (document.cookie.length > 20) {
        fetch(url_patienten + "/all", {
            method: 'GET',
        }).then(response => response.json())
            .then(result => {
                if ("patienten" in result) {
                    var patienten_list = document.getElementById("patienten_list");
                    patienten_list.innerHTML = ""
                    var content = "";
                    for (i = 0; i < result["patienten"].length; i++) {
                        name =  result["patienten"][i]["name"]
                        userid = result["patienten"][i]["userid"]

                        li = document.createElement('LI');
                        li.setAttribute("id", "li" + i);
                        li.setAttribute("class", "hover_effect");
                        li.innerHTML = name

                        li.onclick = (function(userid, name) {
                            return function() {
                                display_patientenakte(userid, name);
                            };
                        })(userid, name)

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