
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
            Object.keys(result).forEach(function(k){
                if(k != "") {
                    anzahl = result[k]
                    content = content.concat("<li>" + k + ": " + anzahl + " Fälle " + "</li>")
                    
                    if (anzahl > max_anzahl) {
                        krank_warnung.innerHTML = "Die Krankheit " + k + " ist gerade im Umlauf. <br>Passt auf euch auf!";
                        max_anzahl = anzahl
                    }
                }
            })

            krank_list.innerHTML = content;
        })
        .catch(error => {
        console.error('Error:', error);
    });
}