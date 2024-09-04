let invalidInput = document.getElementById("invalid");

let Cases = document.getElementById("caseConteneur");

let nbreLetter = document.getElementById("nbreLettre");

let i = 0;

let rAnswer = document.getElementById("rAnswer");

let wAnswer = document.getElementById("wAnswer");

let bloc = document.getElementById("bloc");

let part3 = document.getElementById("part3");

let part4 = document.getElementById("part4");

let chances = document.getElementById("score").value;

let essais = document.getElementById("score");

let saisieInvalid = document.getElementById("saisieInvalid");

const words = [
    "Chemin", "shadow", "Google", "Editer", "mobile",
    "Projet", "Conception", "Internet", "Serveur", "Ordinateur",
    "Application", "Intelligence", "Python", "Pascal", "XAMPP",
    "Coding", "Microsoft", "Apple", "Amazon",
    "Macos", "Ventura", "Catalina", "Windows", "Linux"];

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

console.log(generateRandomString(6));


function jeuGuess() {
    part3.classList.remove("d-none");
    part4.classList.add("d-none");
}

function startG() {
    part4.classList.remove("d-none");
    part3.classList.add("d-none");
    rAnswer.classList.add("d-none");
    wAnswer.classList.add("d-none");
    Cases.innerHTML = "";
    tabCases = [];
    trouve = [];
    lettres = [];
    nomMystere();
    // Get the input field
    baliseDeviner = document.getElementById("devin");

    // Execute a function when the user presses a key on the keyboard
    baliseDeviner.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("deviner").click();
        }
    });
}

let nbreEssai;

let lettres = [];

let motHasard;

let motLenght;

let tableau;

let Val;

let tabCases = [];

function nomMystere() {

    let indexNom = ~~((Math.random() * 25));
    let motHasard = words[indexNom].toUpperCase();
    motLenght = motHasard.length;
    nbreEssai = 6;
    essais.innerHTML = nbreEssai;

    for (let i = 0; i < motLenght; i++) {
        let caseCreer = document.createElement("input");
        caseCreer.type = "text";
        caseCreer.value = "*";
        caseCreer.setAttribute("disabled", "");
        caseCreer.classList.add("case", "mx-3", "rounded", "text-center");
        caseCreer.id = i;
        Cases.appendChild(caseCreer);
        tabCases.push(caseCreer);
    }

    nbreLetter.innerHTML = motLenght;
    tableau = Array.from(motHasard.toLowerCase());

    tableau.forEach(l => {
        lettres.push(l)
    });

    document.getElementById("devin").focus();

}

// window.onkeyup = (touch) => {
//     if (touch.key == "Enter") {
//         devinerNbre();
//     }
// }

let baliseDeviner;

let trouve = [];

function devinerNbre() {


    Val = 0;

    let valeurDeviner = baliseDeviner.value;

    valeurDeviner = valeurDeviner.toLowerCase();

    if (typeof valeurDeviner !== "string") {

        baliseDeviner.classList.add("invalid");
        setTimeout(() => {
            baliseDeviner.classList.remove("invalid")
        }, 2000);

    } else if (valeurDeviner === "") {

        console.log("VIDE");
        baliseDeviner.classList.add("invalid");
        setTimeout(() => {
            baliseDeviner.classList.remove("invalid")
        }, 2000);

    } else {

        if (lettres.includes(valeurDeviner)) {

            trouve.push(valeurDeviner);
            tabCases.forEach(element => {
                element.value = (lettres[element.id]);
                if (trouve.includes(element.value)) {
                    saisieInvalid.innerHTML = "Position: ${`element.id`}"
                } else {
                    element.value = "*";
                }
            });

            tabCases.forEach(element => {
                if (element.value === valeurDeviner) {
                    element.classList.add("bravo");
                    setTimeout(() => {
                        element.classList.remove("bravo");
                    }, 3200);
                }
            });

            tabCases.forEach(elmt => {
                if (elmt.value !== "*") {
                    Val++;
                }
            });

        } else {

            nbreEssai--;
            essais.innerHTML = nbreEssai;
            saisieInvalid.classList.remove("d-none");
            setTimeout(() => {
                saisieInvalid.classList.add("d-none");
            }, 2000);

        }

        if (nbreEssai === 0) {

            wAnswer.classList.remove("d-none");
            rAnswer.classList.add("d-none");
            saisieInvalid.classList.add("d-none");
            setTimeout(() => {
                tabCases.forEach(element => {
                    element.value = lettres[element.id];
                    element.value;
                });
            }, 500);
        } else if (Val === motLenght) {
            rAnswer.classList.remove("d-none");
            wAnswer.classList.add("d-none");
        }
    }

    setTimeout(() => {
        baliseDeviner.value = "";
    }, 500);

    baliseDeviner.focus();
}

function restart() {
    nomMystere();
}