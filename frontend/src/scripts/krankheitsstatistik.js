
var url = url_krankheit

function display_krank_statistik() {
    fetch(url, {
        method: 'GET'
    }).then(response => response.json())
        .then(result => {
            var krank_list = document.getElementById("krank_list");
            var krank_warnung = document.getElementById("krank_warnung");
            var content = "";
            var max_anzahl = 0;
            for (i = 0; i < result["Krankheit"].length; i++) {
                let anzahl = result["Krankheit"][i]["Anzahl"]
                content = content.concat("<li>" + result["Krankheit"][i]["name"] + ": " + anzahl + " Fälle " + "</li>")
                if (anzahl > max_anzahl) {
                    max_anzahl = i
                }

            }

            krank_list.innerHTML = content;
            krank_warnung.innerHTML = "Die Krankheit " + result["Krankheit"][max_anzahl]["name"] + " ist gerade im Umlauf. <br>Passt auf euch auf!";
        })
        .catch(error => {
        console.error('Error:', error);
    });
}