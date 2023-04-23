//APPEL DES INPUT
let input_nom = document.querySelector("#nom");
let input_alcool = document.querySelector("#alcool");
let input_achat = document.querySelector("#achat");
let input_vente = document.querySelector("#vente");
let input_tva = document.querySelector("#tva");
let input_stock = document.querySelector("#stock");
let input_degre = document.querySelector("#degre");
let tbody = document.querySelector(".tbody");
let tab = [];
//BUTTON
let valid = document.querySelector("#valid");

//RECUPERATION DANS LE LOCAL STORAGE
let the_tableau = JSON.parse(localStorage.getItem("array"));

if (the_tableau) {
  tab = the_tableau;
  show_product();
} else {
  tab = [];
}

//FONCTION TVA
function calcul_tva() {
  if (input_tva.value == "20") {
    (input_vente.value * 120) / 100;
  } else {
    (input_vente.value * 110) / 100;
  }
}

//FONCTION DAFFICHAGE
function show_product() {
  let content = "";
  tab.forEach(function (element, index) {
    content += `<tr><td>${element.nom}</td><td>${element.stock}</td><td>${element.type}</td><td>${element.achat}</td><td>${element.vente}</td><td>${element.marge}</td><td><a class="modif">⚙️</a><a class="delet">❌</a></td></tr>`;
  });
  tbody.innerHTML = content;

  //RECUP DU BOUTTON MODIFIER
  let tab_modif = document.querySelectorAll(".modif");

  //RECUP DU BOUTTON DELET
  let tab_delet = document.querySelectorAll(".delet");

  //FONCTION DU BOUTTON MODIFIER
  tab_modif.forEach(function (element, index) {
    element.addEventListener("click", function () {
      let whos_modif = prompt(
        "Entrez le titre de la colonne de l'information à modifier"
      );
      if (whos_modif == "Produit") {
        let bar_modif = prompt("Entrer le nouveau");
        tab[index].nom = bar_modif;
      } else if (whos_modif == "Stock") {
        bar_modif = prompt("Entrer le nouveau");
        tab[index].stock = bar_modif;
      } else if (whos_modif == "Type") {
        bar_modif = prompt("Entrer le nouveau");
        tab[index].type = bar_modif;
      } else if (whos_modif == "Prix d'achat HT") {
        bar_modif = prompt("Entrer le nouveau");
        tab[index].achat = bar_modif;
      } else if (whos_modif == "Prix de vente HT(TTC)") {
        bar_modif = prompt("Entrer le nouveau");
        tab[index].vente = bar_modif;
      }

      localStorage.setItem("array", JSON.stringify(tab));

      show_product();
    });
  });

  //FONCTION DU BOUTTON DELET
  tab_delet.forEach(function (element, index) {
    element.addEventListener("click", function (ligne) {
      tab.splice(index, 1);
      localStorage.setItem("array", JSON.stringify(tab));
      show_product();
    });
  });
}

//DECLENCHEMENT AU CLIC
valid.addEventListener("click", function (e) {
  e.preventDefault();

  //CREATION DE LOBJET
  let boisson = {
    nom: input_nom.value,
    stock: input_stock.value,
    type: input_alcool.value + " (" + input_degre.value + "°" + ")",
    achat: input_achat.value,
    vente: input_vente.value,
    marge: input_vente.value - input_achat.value,
  };

  //PUSH TAB
  tab.push(boisson);
  console.table(tab);

  //PASSAGE EN MODE STRING
  localStorage.setItem("array", JSON.stringify(tab));

  show_product();

  //CLEAR DES INPUT
  input_nom.value = "";
  input_alcool.value = "";
  input_achat.value = "";
  input_vente.value = "";
  input_tva.value = "";
  input_stock.value = "";
  input_degre.value = "";
});
