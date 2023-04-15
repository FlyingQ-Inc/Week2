//const creates block scoped elements similar to variables declared using let. The value of a constant can't be changed through reassignment, and can't be redclared.// 
//uses button class data selection from html// 
//The querySelector() method returns the first element that matches a CSS selector.// 
//To return all matches (not only the first), use the querySelectorAll() instead.// 
//Both querySelector() and querySelectorAll() throw a SYNTAX_ERR exception if the selector(s) is invalid.// 
//Notes credit https://www.w3schools.com/jsref/met_document_queryselector.asp// 
//refers to line 18-20 html// 
const selectionButtons = document.querySelectorAll('[data-selection]')
//line 28 html//
const finalColumn = document.querySelector('[data-final-column]')
//line 30 html//
const computerScoreSpan = document.querySelector('[data-computer-score]')
//line 26 html//
const yourScoreSpan = document.querySelector('[data-your-score]')
//variables that basically layout the rules of the game, this is a global variable, this is an array of all the possible selections// 
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]
//The forEach() array method loops through any array, executing a provided function once for each array element in ascending index order. // 
//This function is referred to as a callback function.Credit:https://www.freecodecamp.org/news/javascript-foreach-js-array-for-each-example/// 
selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
     //loops through all possible selections finding the one that has the same name selection name//
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})
//uses event listener above,along with the const variables set before// 
function makeSelection(selection) {
  //calls the randomSelection function//
  const computerSelection = randomSelection()
  //win conditions you computer draw// 
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)
//need to be done in this order so the results on the page display in the correct columns, and allows for icons to be top of list and list to scroll down// 
  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)
//calls the increment score function//
  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)
}
//the function that increments the result score//
function incrementScore(scoreSpan) {
  //takes current text converts to integer adds one and saves that as the new text//
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
//Segment for rendering results// 
//takes in selection and if selection is winner// 
function addSelectionResult(selection, winner) {
  //creates the div for results, makes it look the same as the div in html//
  const div = document.createElement('div')
  //displays the emoji from selection//
  div.innerText = selection.emoji
  //this is what replaces the commented out lines in html 32-34//
  div.classList.add('result-selection')
  //this and the line above create the classes that the css looks at to determine size, opacity etc//
  if (winner) div.classList.add('winner')
  //line 28 html//
  finalColumn.after(div)
}
//function that checks for winner, compares "beats" to "name"in opponent selection// 
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}
//function to automate what the computer opponent selects// 
function randomSelection() {
  //returns a number between zero and length or number of selections, so 3, would actually cap out at 2.99 .floor allows for 0,1,2 //
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  //gives a random selection from above every time function is called//
  return SELECTIONS[randomIndex]
}