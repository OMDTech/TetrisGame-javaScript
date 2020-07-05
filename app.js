/*
dom eventListener
all java script must be inside the dom eventListener
we need to do this to make sure that it is picked up by the script tag in the html file
The Dom content lodaed event fires when the initial HTML document has been completely loaded
*/
document.addEventListener('DOMContentLoaded', () => {
/* it helps you to look through our HTML document and find the element with
class name of (grid)
it is inbuilt javaScript method
once the method find the class in html file  it will be assighned to variable called grid
javaScript knows that every time we type grid and do something to grid we want it to affect the element with class name  of grid in our HTML file
*/
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  /*  hash sympole  indicate we are looking for an id
we could use getElementById('id') method
*/
  const ScoreDisplay = document.querySelector('#score')
  const startButton = document.querySelector('#start-button')
  const width = 10
  // Tetrominoes
  // l Tetromino routation
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 1, width * 2 + 1, width * 2 + 2]
  ]
  // z Tetromino routation
  const zTetrmino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]

  ]
  const tTertmino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]

  ]

  const oTertmino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]

  ]

  const iTertmino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]

  ]

  const Tetrminoes = [lTetromino, zTetrmino, tTertmino, oTertmino, iTertmino]

  /* randomly select a Tetrmino and its first rotation
  math random return random nummber
  .length method tell us exactly how long our array is and array lenght
  math.floor() method which will round down to the nearest  integer
  */
  let random = Math.floor(Math.random()*Tetrminoes.length)


  let currentPosition = 4
  let currentRotation = 0
  let current = Tetrminoes[random][currentRotation]

  /* draw the first rotation in the first tetrmino
  we access CSS style sheet by using classlist.add to other style of tetriminos
  */
  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      console.log(index)
    })
  }

  // undraw the Tetrmino from the current position
  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  /*  setInterval(function , 1000) allows us to invoke a function that we passed through it after x
  amounte of time ex: 1000ms  like sleep() method in java
  make the tetrmino move down every second
*/
  timerid = setInterval(moveDown, 1000)

  // assign function to keyCodes
  function control (e) {
    if (e.keyCode === 37){
      moveLeft()
    }else if (e.keyCode ===38){
      //rotate
    }else if (e.keyCode === 39){
      moveRight()
    }else if(e.keyCode === 40){
      //moveDown
    }

    // rotation

  }
  /*
  event target method add event listener sets up a function
  that we called whenever the specified event is delivered to the target
  */
  document.addEventListener('keyup', control)

  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    freez()

 }
 /* some is an inbuilt  javaScript method similar to how for each works however instead
 of applaying logic to each item in our array like for each with some we are checking that the logic we
 write in the bracksets is true for some of the items in our array
 */
  function freez () {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('stop'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('stop'))
      random = Math.floor(Math.random() * Tetrminoes.length)
      current = Tetrminoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }
  // move the tetrmino leftm unless is at the edge or there is a bloackage
  function moveLeft () {
    undraw()
    const isAtLeftEfage = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEfage) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('stop')))
    currentPosition += 1
    draw()
  }
  // right move
  function moveRight () {
    undraw()
    const isAtRightEdage = current.some(index => (currentPosition + index) % width === width -1)
    if (!isAtRightEdage) currentPosition += 1

    if (current.some(index => squares[currentPosition + index].classList.contains('stop')))
    currentPosition += 1
    draw()
  }














})
