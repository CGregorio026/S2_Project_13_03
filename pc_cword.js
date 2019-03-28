"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Christian Gregorio
    Date:   3.15.19 
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

// global variables
var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";

//loads the init function upon entering the window
window.onload = init;

// Initializes the puzzle, setting up the event handlers and the variable values
function init() {
      //sets the global variable to every crossword cell
      allLetters = document.querySelectorAll("table#crossword span");
      currentLetter = allLetters[0];
      // These are never used... but they store the value of the letter's clue-a data value.
      var acrossID = currentLetter.dataset.clueA;
      var downID = currentLetter.dataset.clueD;
      acrossClue = document.getElementById(currentLetter.dataset.clueA);
      downClue = document.getElementById(currentLetter.dataset.clueD);
      // This runs the formatPuzzle with the current letter as a parameter 
      formatPuzzle(currentLetter);
      // when the puzzle is moused over, it changes the cursor to a pointer
      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.cursor = "pointer";
            allLetters[i].onmousedown = function (e) {
                  formatPuzzle(e.target);
            };
      }
      // when a key is pressed down it runs the select letter function
      document.onkeydown = selectLetter;


      var typeImage = document.getElementById("directionImg");
      typeImage.style.cursor = "pointer";
      // when the image of the hand is clicked, it runs the switch type direction function
      typeImage.onclick = switchTypeDirection;

      // this function checks the data to see if the data of any letter is true. if it is incorrect, then it is highlighted in red using an anonymous function to change it back after 3 seconds (3000 milliseconds)
      document.getElementById("showErrors").onclick = function () {
            for (var i = 0; i < allLetters.length; i++) {
                  if (allLetters[i].textContent !== allLetters[i].dataset.letter) {
                        allLetters[i].style.color = "red";
                        setTimeout(function () {
                              for (var i = 0; i < allLetters.length; i++) {
                                    allLetters[i].style.color = "";
                              }
                        }, 3000);
                  }
            }
      }
      // when the onclick button is pressed, every data cell is given the value of the data set letter it has.
      document.getElementById("showSolution").onclick = function () {
            for (var i = 0; i < allLetters.length; i++) {
                  allLetters[i].textContent = allLetters[i].dataset.letter;
            }
      };
}

// Formats the appearance of the puzzle given the selected puzzle letter
function formatPuzzle(puzzleLetter) {
      currentLetter = puzzleLetter;
      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.backgroundColor = "";
      }

      acrossClue.style.color = "";
      downClue.style.color = "";
      // if the data-clue-a isn't undefined (It isn't the same in the dataset), then it does not become highlighted in blue, along with the others in the same dataset.
      if (currentLetter.dataset.clueA !== undefined) {
            acrossClue = document.getElementById(currentLetter.dataset.clueA);
            acrossClue.style.color = "blue";
            wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]");

            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
            }
      }

      if (currentLetter.dataset.clueD !== undefined) {
            downClue = document.getElementById(currentLetter.dataset.clueD);
            downClue.style.color = "red";
            wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]");
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
            }
      }


      if (typeDirection === "right") {
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      } else {
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      }

}

// Applies keyboard actions to select a letter or modify the puzzle navigation
function selectLetter(e) {
      var leftLetter = document.getElementById(currentLetter.dataset.left);
      var upLetter = document.getElementById(currentLetter.dataset.up);
      var rightLetter = document.getElementById(currentLetter.dataset.right);
      var downLetter = document.getElementById(currentLetter.dataset.down);

      var userKey = e.keyCode;

      if (userKey === 37) {
            formatPuzzle(leftLetter);
      } else if (userKey === 38) {
            formatPuzzle(upLetter);
      } else if (userKey === 39 || userKey === 9) {
            formatPuzzle(rightLetter);
      } else if (userKey === 40 || userKey === 13) {
            formatPuzzle(downLetter);
      } else if (userKey === 8 || userKey === 46) {
            currentLetter.textContent = "";
      } else if (userKey === 32) {
            switchTypeDirection();
      } else if (userKey >= 65 && userKey <= 90) {
            currentLetter.textContent = getChar(userKey);
            if (typeDirection === "right") {
                  formatPuzzle(rightLetter);
            } else {
                  formatPuzzle(downLetter);
            }
      }
      e.preventDefault();
}

// Toggles the typing direction between right and down
function switchTypeDirection() {
      var typeImage = document.getElementById("directionImg");

      if (typeDirection === "right") {
            typeDirection = "down";
            typeImage.src = "pc_down.png";
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      } else {
            typeDirection = "right";
            typeImage.src = "pc_right.png";
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      }
}

/*====================================================*/

function getChar(keyNum) {
      return String.fromCharCode(keyNum);
}