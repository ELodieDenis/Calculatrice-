// CONSTANTES
// sélectionner tous les nombres
const numbers = document.querySelectorAll(".number");

// sélection du input final
const inputFinal = document.querySelector(".input_final");

// sélection premier input
const inputFirst = document.querySelector(".input_first");

// supprimer tous le input
const remove = document.querySelector(".delete_input");

// selectionner la parenthese ouvrante
const parenthOpen = document.querySelector(".parenthese_ouvrante");

// selectionner la parenthese fermante
const parenthClose = document.querySelector(".parenthese_fermante");

// bouton égal
const equalBtn = document.querySelector(".equal");

// bouton img supprimer une seule lettre
const imgArrowDelete = document.querySelector(".img_arrow_delete");

// tous les signes d'opération
const operations = document.querySelectorAll(".operation");
console.log(operations);

// bouton pourcentage
const pourcentage = document.querySelector(".pourcentage");

// -------------------------------------------------------------------------------------------------------------

// fonction au click sur "remove" tous le input est supprimé
remove.addEventListener("mousedown", () => {
  inputFinal.value = "";
  // inputFirst.value = "";
});

//fonction au clique sur imgArrowDelete supprimer dernier chiffre dans input
imgArrowDelete.addEventListener("mousedown", () => {
  inputFinal.value = inputFinal.value.slice(0, -1);
});

// fonction au clique sur la parenthèse ouvrante elle se place dans le inputFinal
parenthOpen.addEventListener("mousedown", () => {
  inputFinal.value += parenthOpen.textContent;
});

// fonction sur la parenthèse fermante elle se place dans le inputFinal
parenthClose.addEventListener("mousedown", () => {
  inputFinal.value += parenthClose.textContent;
});

// fonction au click sur chaque boutons, les chiffres se placent dans le inputFinal
numbers.forEach((number) => {
  number.addEventListener("mousedown", () => {
    inputFinal.value += number.textContent;

    // si nombres de chiffres supérieur à 20 dans le inputFinal on stop
    const lengthInputFinal = inputFinal.value.length;
    console.log(lengthInputFinal);
    if (lengthInputFinal >= 20) {
      inputFinal.value = inputFinal.value.slice(0, 19);
      alert("Impossible de saisir plus de 20 chiffres");
    }
  });
});

// --------------------------------------------------

// fonction pour trouver l'expression postfixée de l'expression infixée
function expressionPostfixee(inFv) {
  inFv = inputFinal.value;
  console.log(`EXPRESSION INFIXEE : ${inFv}`);

  const operande = [];
  const operator = [];

  const prioOperator = {
    ")": 1,
    "+": 2,
    "-": 2,
    "*": 3,
    "/": 3,
    "%": 3,
    "(": 4,
  };

  const inFvm = inFv.match(/\d+(\.\d+)?|[+\-*/()%]/g) || [];

  //boucle pour les éléments présents dans le inputFinal
  for (let unit of inFvm) {
    if (!isNaN(unit) && unit.trim() !== "") {
      operande.push(parseFloat(unit));
      continue;
    }
    if (unit === "(") {
      console.log("Parenthèse ouverte détectée");
      operator.push(unit);
      continue;
    }
    if (unit === ")") {
      console.log("Perenthèse fermante détectée");
      while (operator.length > 0 && operator[operator.length - 1] !== "(") {
        operande.push(operator.pop());
      }
      if (operator.length > 0) {
        operator.pop();
      }
      continue;
    }

    while (
      operator.length > 0 &&
      operator[operator.length - 1] !== "(" &&
      prioOperator[operator[operator.length - 1]] >= prioOperator[unit]
    ) {
      operande.push(operator.pop());
    }
    operator.push(unit);

    console.log(`Operande : ${operande}`);
    console.log(`Operator : ${operator}`);
  }

  while (operator.length > 0) {
    operande.push(operator.pop());
  }

  console.log(`EXPRESSION POSTFIXEE : ${operande.join(" ")}`);
  const resulInFvm = operande;
  return resulInFvm;
}

// ---------------------------------------------------------
// fonction qui permet de convertir l'expression postfixée en résultat réel
function evalPostfixee() {
  const resulInFvm1 = expressionPostfixee(inputFinal.value);

  const stack = [];

  // boucle pour les éléments présents dans l'expression finale
  for (let token of resulInFvm1) {
    console.log(`Stack avec pop : ${stack}`);
    console.log(`Token avec pop : ${token}`);

    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      if (stack.length < 2) {
        console.log(
          `Erreur : pas assez d'opérandes pour effectuer l'opération`
        );
        continue;
      }
      let b = stack.pop();
      let a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "%":
          if (a === undefined) {
            stack.push(b * (b / 100));
          } else {
            stack.push(a * (b / 100));
          }
          break;
        case "(":
          console.log("dans case, parenthèse ouverte");
        case ")":
          console.log("dans case, parenthèse fermante");
      }
    }
  }
  const finalResultat = stack.pop();
  console.log(`RESULTAT FINAL : ${finalResultat}`);

  inputFinal.value = Math.round(finalResultat * 10000) / 10000; // arrondi à 4 chiffres après la virgule
  // inputFinal.value = inputFirst.value;
  // inputFirst.value = "";

  return finalResultat;
}

//--------------------------------------------------------------------------------------------------------------

function boutonEgal() {
  equalBtn.addEventListener("mousedown", () => {
    // expressionPostfixee();
    evalPostfixee();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("La touche Entrée a été pressée !");
    evalPostfixee();
  }
});

boutonEgal();

// si il n'y a plus de place dans le input faire décaler le calcul
// permettre de pourvoir continuer le calcul après avoir utiliser un % et en ayant click sur egal
// appliquer parenthèse
// mettre regle de priorité aux parenthèses
// pourvoir diffocier l'ouverture et la fermeture des parenthèses
// mettre animation swipe vers le haut du inputFirst vers le inputFinal
//  mettre règle de priorité si il y une * ou / dans un calcul
// si il y a déjà un signe d'opération et que l'utilisateur clique sur un autre signe d'opération, changer le signe, mais ne pas l'ajouter après l'autre (ex : 12+-   ----> 12-)
