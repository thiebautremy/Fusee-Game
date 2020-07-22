var app = {
  cellIndex: 0,
  // Div pour afficher les instructions 
  textArea: document.querySelector("#userCode"),

  init: function () {
    console.log('init');
    app.drawBoard();
    app.bindEventListeners();
  },
  // Function nombre aléatoire:
  getRandomIntInclusive: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  //Méthode liant les écouteurs d'évenements :
  bindEventListeners: function () {
    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      if (nomTouche == 'ArrowRight') {
        app.turnRight();
      }
      if (nomTouche == 'ArrowLeft') {
        app.turnLeft();
      }
      if (nomTouche == 'ArrowDown') {
        app.turnDown();
      }
      if (nomTouche == 'ArrowUp') {
        app.turnUp();
      }
    })
    // Ajout méthode try again sur le bouton
    document.querySelector('#try_again').addEventListener('click', app.handleTryAgainButton);
  },
  // Méthode permettant de tourner le curseur vers la droite
  turnRight: function () {
    let currentCel = document.querySelector(".cellCurrent");
    currentCel.classList.remove("cellCurrent-top", "cellCurrent-left", "cellCurrent-bottom");
    currentCel.classList.add("cellCurrent-right");
    app.moveForward();
  },
  // Méthode permettant de tourner le curseur vers la gauche
  turnLeft: function () {
    let currentCel = document.querySelector(".cellCurrent");
    currentCel.classList.remove("cellCurrent-right", "cellCurrent-top", "cellCurrent-bottom");
    currentCel.classList.add("cellCurrent-left");
    app.moveForward();
  },
  // Méthode permettant de tourner le curseur vers le bas
  turnDown: function () {
    let currentCel = document.querySelector(".cellCurrent");
    currentCel.classList.remove("cellCurrent-right", "cellCurrent-top", "cellCurrent-left");
    currentCel.classList.add("cellCurrent-bottom");
    app.moveForward();
  },
  // Méthode permettant de tourner le curseur vers le haut
  turnUp: function () {
    let currentCel = document.querySelector(".cellCurrent");
    currentCel.classList.remove("cellCurrent-right", "cellCurrent-bottom", "cellCurrent-left");
    currentCel.classList.add("cellCurrent-top");
    app.moveForward();
  },
  // Méthode qui ajoute les instructions dans le text area à chaques mouvements
  addTextInTextArea: function (instruction) {
    let p = document.createElement("p");
    let pComplete = p.textContent = instruction + '\r\n';
    app.textArea.textContent += pComplete;
    return app.textArea;
  },
  // Méthode permettant de faire avancer le curseur en fonction de sa direction
  moveForward: function () {
    // Cellule actuelle (cellule qui comporte la  class .cellCurrent)    
    let currentCel = document.querySelector(".cellCurrent");

    // Je teste la direction du curseur, si tourné vers la droite :
    if (currentCel.className.includes("cellCurrent-right")) {
      let nextCell = currentCel.nextElementSibling;
      currentCel.classList.remove("cellCurrent", "cellCurrent-right");
      nextCell.classList.add("cellCurrent", "cellCurrent-right");
      app.cellIndex = app.cellIndex + 1;
      app.addTextInTextArea('Right');
      if (nextCell.classList.value.includes("cellEnd")) {
        app.checkSuccess();
      }
    }
    // Je teste la direction du curseur, si tourné vers la gauche :
    if (currentCel.className.includes("cellCurrent-left")) {
      let nextCell = currentCel.previousElementSibling;
      currentCel.classList.remove("cellCurrent", "cellCurrent-left");
      nextCell.classList.add("cellCurrent", "cellCurrent-left");
      app.cellIndex = app.cellIndex - 1;
      app.addTextInTextArea("Left");
      if (nextCell.classList.value.includes("cellEnd")) {
        app.checkSuccess();
      }
    }
    // Je teste la direction du curseur, si tourné vers le bas :
    if (currentCel.className.includes("cellCurrent-bottom")) {
      // Je récupère l'id de la ligne actuelle
      let currentRowId = parseInt(currentCel.parentElement.id);
      let nextRowId = currentRowId + 1;
      let nextCellIndex = app.cellIndex + 1;
      let nextCell = document.querySelector('#\\3' + nextRowId + '  > div:nth-child(' + nextCellIndex + ')');
      currentCel.classList.remove("cellCurrent", "cellCurrent-bottom");
      nextCell.classList.add("cellCurrent", "cellCurrent-bottom");
      app.addTextInTextArea("Down");
      if (nextCell.classList.value.includes("cellEnd")) {
        app.checkSuccess();
      }
    }
    // Je teste la direction du curseur, si tourné vers le haut :
    if (currentCel.className.includes("cellCurrent-top")) {
      // Je récupère l'id de la ligne actuelle
      let currentRowId = parseInt(currentCel.parentElement.id);
      let nextRowId = currentRowId - 1;
      let nextCellIndex = app.cellIndex + 1;
      let nextCell = document.querySelector('#\\3' + nextRowId + '  > div:nth-child(' + nextCellIndex + ')');
      currentCel.classList.remove("cellCurrent", "cellCurrent-top");
      nextCell.classList.add("cellCurrent", "cellCurrent-top");
      app.addTextInTextArea("Up");
      if (nextCell.classList.value.includes("cellEnd")) {
        app.checkSuccess();
      }
    }
  },
  // Méthode créant le plateau de jeu
  drawBoard: function () {
    let board = document.getElementById("board");
    for (let i = 1; i < 5; i++) {
      let cellRow = document.createElement("div");
      cellRow.classList.add("cellRow");
      cellRow.setAttribute('id', i);
      board.appendChild(cellRow);
      for (let j = 0; j < 6; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cellRow.appendChild(cell);
      }
    }
    let cellStart = document.querySelector("#\\31  > div:nth-child(1)");
    cellStart.classList.add("cellStart");
    let cellEnd = document.querySelector("#\\34  > div:nth-child(6)");
    cellEnd.classList.add("cellEnd");
    cellStart.classList.add("cellCurrent", "cellCurrent-right");
    // Initialisation des coordonées des deux objets au hasard :
    app.getRandomCoordinates();
  },
  
  // Méthode créant des coordonnées au hasard pour les objets comètes et planètes
  getRandomCoordinates: function(){
    // Création des coordonnées pour la planete et la comète au hasard
    let firstCoordinates = [
      app.getRandomIntInclusive(1, 6),
      app.getRandomIntInclusive(1, 4)
    ];
    let secondCoordinates = [
      app.getRandomIntInclusive(1, 6),
      app.getRandomIntInclusive(1, 4)
    ];
    console.log(firstCoordinates);
    console.log(secondCoordinates);
    // Retourne true si les tableaux sont différents :
    if(firstCoordinates.toString() == secondCoordinates.toString()){
      firstCoordinates = [
        app.getRandomIntInclusive(1, 6),
        app.getRandomIntInclusive(1, 4)
      ];
    };
    if(firstCoordinates.toString() == '1,1'){
      firstCoordinates = [
        app.getRandomIntInclusive(1, 6),
        app.getRandomIntInclusive(1, 4)
      ];
    }
    if(firstCoordinates.toString() == '6,4'){
      firstCoordinates = [
        app.getRandomIntInclusive(1, 6),
        app.getRandomIntInclusive(1, 4)
      ];
    }
    if(secondCoordinates.toString() == '1,1'){
      secondCoordinates = [
        app.getRandomIntInclusive(1, 6),
        app.getRandomIntInclusive(1, 4)
      ];
    }
    if(secondCoordinates.toString() == '6,4'){
      secondCoordinates = [
        app.getRandomIntInclusive(1, 6),
        app.getRandomIntInclusive(1, 4)
      ];
    }
    console.log(firstCoordinates);
    console.log(secondCoordinates);
      let cellPlanet = document.querySelector('#\\3' + firstCoordinates[1] + ' > div:nth-child(' + firstCoordinates[0] + ')');
      cellPlanet.classList.add("cellPlanet");
      let cellComete = document.querySelector('#\\3' + secondCoordinates[1] + ' > div:nth-child(' + secondCoordinates[0] + ')');
      cellComete.classList.add("cellComete");
  },

  handleTryAgainButton: function(){
    window.location.reload();
  },
  // handleLaunchScriptButton: function () {
  //   // TODO



  //   // TODO : get all lines as an array
  //   // window.setTimeout(function () {
  //   //   app.codeLineLoop(codeLines, 0);
  //   // }, 2000);
  // },
  // codeLineLoop: function (codeLines, index) {
  //   // Getting currentLine
  //   var currentLine = codeLines[index];
  //   console.log(currentLine);
  //   // Increment
  //   index++;
  //   // if still a line to interpret
  //   if (index < codeLines.length) {
  //     // Recall same method (=> make a loop)
  //     window.setTimeout(function () {
  //       app.codeLineLoop(codeLines, index);
  //     }, 1000);
  //   } else {
  //     window.setTimeout(function () {
  //       app.checkSuccess();
  //     }, 1000);
  //   }
  // },
  checkSuccess: function () {
    // TODO display if the game is won or not
    alert("🎉🎉 Vous avez gagné !!! 🎉🎉");
  }

};

document.addEventListener('DOMContentLoaded', app.init);
