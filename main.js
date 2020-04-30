var cardsArray = [
    
    {   'name': 'Charizard',   'img':  'images/charizard.png' },
    {   'name': 'Farfetchd',   'img':  'images/farfetchd.png' },
    {   'name': 'Flareon',   'img':  'images/flareon.png' },
    {   'name': 'Gengar',   'img':  'images/gengar.png' },
    {   'name': 'Gloom',   'img':  'images/gloom.png' },
    {   'name': 'Ivysaur',   'img':  'images/ivysaur.png' },
    {   'name': 'Klinger',   'img':  'images/klinger.png' },
    {   'name': 'Meowth',   'img':  'images/meowth.png' },
    {   'name': 'Paras',   'img':  'images/paras.png' },
    {   'name': 'Pinsir',   'img':  'images/pinsir.png' },
    {   'name': 'Squirtle',   'img':  'images/squirtle.png' },
    {   'name': 'Voltorb',   'img':  'images/voltorb.png' }
    
];
//variable to store the pokeball card front
//var cardFront = 'images/card-back.png';

//creates a grid with two of each card object
var gameGrid = cardsArray.concat(cardsArray);

//randomizes the game grid so that the cards are in a new position every game
gameGrid.sort(function () {
    'use strict';
    return 0.5 - Math.random();
});

//creates a 'grid' within the 'gamSe-board' to place 'cards' the user can interact with

//grab the 'game-board' and assign it to a variable
var game = document.getElementById('game-board');

//create a section element and assign it to var 'grid'
var grid = document.createElement('section');

//give the section element 'grid' a class of grid
grid.setAttribute('class', 'grid');

//append the grid section to the game-board div. The grid will be where we put cards
game.appendChild(grid);

//generates 'cards' and populates the 'grid' with them

//loop through each item in the cardsArray
for (var i = 0; i < gameGrid.length; i++){
    //create a div element and assign to var 'card'
    var card = document.createElement('div');
    
    //apply a class of 'card' to that div
    card.classList.add('card');
    
    //set dataname attribute of the card to the array elements 'name'
    card.dataset.name = gameGrid[i].name;
    
    var front = document.createElement('div');
    front.classList.add('front');
    //front.style.backgroundImage = `url(${cardFront})`;
    
    var back = document.createElement('div');
    back.classList.add('back');
    
    //apply a background-image to the card div of the cardsArray element 'img'
    back.style.backgroundImage = `url(${gameGrid[i].img})`;
    
    //append the card to the grid, and the front and back to the card
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

//sets a counter for the number of cards that have been clicked
var counter = 0;

//stores the previously clicked element to ensure a single card can't be selected
//twice or match with itself
var previousTarget = null;

//stores the first and second guess so that they can be compared to assess a match
var firstGuess = '';
var secondGuess = '';

//delay time for resets
var delay = 500;

//function to add the 'match' class to an element
var match = function () {
    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++){
        selected[i].classList.add('match');
    }
}

//resets guesses after two attempts
var resetGuesses = function () {
    'use strict'
    //resets all variables associated with selection
    firstGuess = '';
    secondGuess = '';
    counter = 0;
    previousTarget = null;
    
    //removes the class selected from the cards
    var selected = document.querySelectorAll('.selected');
    
    for( var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}

//event listener for user clikcing cards
grid.addEventListener('click', function (event) {
    //declare variable to target clicked item
    var clicked = event.target;
    
    //prevents section from being selected
    if (clicked.nodeName == 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    //we only want to add selected to a maximum of two cards at a time
    if (counter < 2) {
        counter++;
        
        if (counter === 1) {
            //assign first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            //assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        //ensure both strings aren't empty
        if (firstGuess != '' && secondGuess != '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
    }
   previousTarget = clicked;
});