// CONSTANTES
// sélectionner tous les nombres
const numbers = document.querySelectorAll(".number");

// sélection du input final
const inputFinal = document.querySelector(".input_final");

// sélection premier input
const inputFirst = document.querySelector(".input_first");

// supprimer tous le input
const remove = document.querySelector(".delete_input");

// bouton égal
const equalBtn = document.querySelector(".equal");

// bouton img supprimer une seule lettre
const imgArrowDelete = document.querySelector(".img_arrow_delete");

// tous les signes d'opération
const operations = document.querySelectorAll(".operation");

// bouton pourcentage
const pourcentage = document.querySelector(".pourcentage");

// variable pour stocket l'opération cliquée
let lastOperation = "";

// stocker première valeur de inputFinal avant calcul
let firstValueBeforeResult = "";

let resultatMatch;

// -------------------------------------------------------------------------------------------------------------

// fonction au click sur "remove" tous le input est supprimé
remove.addEventListener("mousedown", () => {
  inputFinal.value = "";
  inputFirst.value = "";
});

//fonction au clique sur imgArrowDelete supprimer dernier chiffre dans input
imgArrowDelete.addEventListener("mousedown", () => {
  inputFinal.value = inputFinal.value.slice(0, -1);
});

// fonction au click sur chaque boutons, les chiffres se placent dans le input
numbers.forEach((number) => {
  number.addEventListener("mousedown", () => {
    inputFinal.value += number.textContent;
  });
});

// --------------------------------------------------

function boutonEgal() {
  equalBtn.addEventListener("mousedown", () => {
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const inputFinalValue = inputFinal.value;

    // Récupération du dernier nombre entré
    const splitInputFinal = inputFinalValue.split(/[\+\-\*\/]/);
    const lastNumber = parseFloat(splitInputFinal[splitInputFinal.length - 1]);

    // Récupération du dernier opérateur utilisé (hors %)
    const operators = inputFinalValue.match(/[\+\-\*\/]/g);
    const lastOperator = operators ? operators[operators.length - 1] : null;

    // Vérifier si le dernier caractère est un %
    const lastChar = inputFinalValue.slice(-1) === "%";

    if (lastChar) {
      // Gestion des pourcentages
      const baseValue = parseFloat(inputFirst.value);
      const percentageValue = (lastNumber / 100) * baseValue;

      switch (lastOperator) {
        case "+":
          inputFirst.value = baseValue + percentageValue;
          break;
        case "-":
          inputFirst.value = baseValue - percentageValue;
          break;
        case "*":
          inputFirst.value = baseValue * (lastNumber / 100);
          break;
        case "/":
          inputFirst.value = baseValue / (lastNumber / 100);
          break;
        default:
          return;
      }
    } else if (lastOperator) {
      // Calcul normal sans pourcentage
      switch (lastOperator) {
        case "+":
          inputFirst.value = parseFloat(inputFirst.value) + lastNumber;
          break;
        case "-":
          inputFirst.value = parseFloat(inputFirst.value) - lastNumber;
          break;
        case "*":
          inputFirst.value = parseFloat(inputFirst.value) * lastNumber;
          break;
        case "/":
          inputFirst.value = parseFloat(inputFirst.value) / lastNumber;
          break;
        default:
          return;
      }
      const final = inputFinal.value.match(/\d+|\D/g);
      const final1 = parseFloat(final[final.length - 1]);
      const final2 = final[final.length - 2];
    }

    inputFinal.value = inputFirst.value;
    inputFirst.value = "";
  });
}

// fonction au clique sur un signe d'opération SANS ke signe égal
function allOperations1() {
  operations.forEach((operation) => {
    operation.addEventListener("mousedown", () => {
      const inFv = inputFinal.value;

      const operande = [];
      const operator = [];

      const prioOperator = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
      };

      const inFvm = inFv.match(/\d+|\D/g) || [];

      for (let unit of inFvm) {
        if (!isNaN(unit) && unit.trim() !== "") {
          operande.push(parseFloat(unit));
          continue;
        }
        while (
          operator.length > 0 &&
          prioOperator[operator[operator.length - 1]] >= prioOperator[unit]
        ) {
          operande.push(operator.pop());
        }

        operator.push(unit);
      }
      while (operator.length > 0) {
        operande.push(operator.pop());
      }
      console.log(`EXPRESSION POSTFIXEE : ${operande.join(" ")}`);

      function evalPostfixee(postfixExpr) {
        const stack = [];

        for (let token of postfixExpr) {
          if (!isNaN(token)) {
            stack.push(parseFloat(token));
          } else {
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
              default:
                throw new Error(`Opérateur inconnu : ${token}`);
            }
          }
        }
        return stack.pop(); // Résultat final
      }
      const resultat = evalPostfixee();
      console.log(`RESULTAT FINAL ${resultat}`);

      // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      const inputFinalValue = inputFinal.value;
      const inputFirstValue = inputFirst.value;

      // prendre le dernier nombre entré
      const splitInputFinal = inputFinalValue.split(/[\+\-\*\/]/);
      const lastNumber = splitInputFinal[splitInputFinal.length - 2];

      // Récupération du dernier opérateur utilisé (hors %)
      const operators = inputFinalValue.match(/[\+\-\*\/]/g);
      const lastOperator = operators.length
        ? operators[operators.length - 2]
        : null;

      // Vérifier si le dernier caractère est un %
      const lastChar = inputFinalValue.slice(-1) === "%";

      if (!inputFinalValue) {
        alert("aucune donnée rentrée");
        return;
      }

      if (inputFinalValue && !inputFirstValue) {
        inputFirst.value = inputFinalValue.slice(0, -1);
      } else if (lastChar) {
        console.log("pourcentage utilisée");
      } else if (inputFirstValue && lastOperator) {
        switch (lastOperator) {
          case "+":
            inputFirst.value =
              parseFloat(inputFirst.value) + parseFloat(lastNumber);
            break;

          case "-":
            inputFirst.value =
              parseFloat(inputFirst.value) - parseFloat(lastNumber);
            break;

          case "*":
            inputFirst.value =
              parseFloat(inputFirst.value) * parseFloat(lastNumber);
            break;

          case "/":
            inputFirst.value =
              parseFloat(inputFirst.value) / parseFloat(lastNumber);
            break;

          default:
            alert("Opérateur non reconnu.");
            return;
        }
      }
    });
  });
}

// allOperations();
allOperations1();
boutonEgal();

// permettre de pourvoir continuer le calcul après avoir utiliser un % et en ayant click sur egal
// appliquer parenthèse
// mettre regle de priorité aux parenthèses
// pourvoir diffocier l'ouverture et la fermeture des parenthèses
// mettre animation swipe vers le haut du inputFirst vers le inputFinal
//  mettre règle de priorité si il y une * ou / dans un calcul
// si il y a déjà un signe d'opération et que l'utilisateur clique sur un autre signe d'opération, changer le signe, mais ne pas l'ajouter après l'autre (ex : 12+-   ----> 12-)
