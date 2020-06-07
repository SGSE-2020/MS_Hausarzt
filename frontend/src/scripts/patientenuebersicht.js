

function display_patientenakte(user_id, name) {
    fetch(url_patientenakte + "/" + user_id, {
        method: 'GET'
    }).then(response => response.json())
        .then(result => {
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
        })
        .catch(error => {
        console.error('Error:', error);
    });
}

function display_patienten() {
    fetch(url_patienten + "/all", {
        method: 'GET'
    }).then(response => response.json())
        .then(result => {
            var patienten_list = document.getElementById("patienten_list");
            patienten_list.innerHTML = ""
            var content = "";
            for (i = 0; i < result["patienten"].length; i++) {
                name =  result["patienten"][i]["name"]
                userid = result["patienten"][i]["userid"]

                li = document.createElement('LI');
                li.setAttribute("id", "li" + i);
                li.innerHTML = name

                button = document.createElement("button")
                button.setAttribute("id", "button" + i);
                button.innerHTML = 'name';
                button.onclick = (function(userid, name) {
                    return function() {
                        display_patientenakte(userid, name);
                    };
                })(userid, name)

                li.appendChild(button)
                patienten_list.appendChild(li)
            }
        })
        .catch(error => {
        console.error('Error:', error);
    });
}