import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const field = new Image()
field.src = "./field.png"

const foodImg = new Image()
foodImg.src = "./food.png"

let box = 32

let score = 0

let food = {
   x: Math.floor(Math.random() * 17 + 1) * box,
   y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = []
snake[0] = {
   x: 9 * box,
   y: 10 * box
}

const direction = (event) => {
   
   if (event.keyCode === 37 && dir !== 'right') {
      dir = 'left'
   } else if (event.keyCode === 38 && dir !== 'down') {
      dir = 'up'
   } else if (event.keyCode === 39 && dir !== 'left') {
      dir = 'right'
   } else if (event.keyCode === 40 && dir !== 'up') {
      dir = 'down'
   }
}

document.addEventListener('keydown', direction)

let dir



function eatTail(head, arr) {
   for (let i = 0; i < arr.length; i++) {
      if (head.x === arr[i].x && head.y === arr[i].y) {
         clearInterval(game)
      }
   }
}

function drawGame() {
   ctx.drawImage(field, 0, 0)

   ctx.drawImage(foodImg, food.x, food.y)

   for (let i = 0; i < snake.length; i++) {

      if (i === 0) {
         const snakeHead = new Image()
         snakeHead.src = './head.png'
         const pattern = ctx.createPattern(snakeHead, 'repeat')
         ctx.fillStyle = pattern
      } else {
         ctx.fillStyle = 'red'
      }
      
      ctx.fillRect(snake[i].x, snake[i].y, box, box)
   }

   ctx.fillStyle = 'white'
   ctx.font = '50px Arial'
   ctx.fillText(score, box * 2.5, box * 1.7)

   let snakeX = snake[0].x
   let snakeY = snake[0].y

   if (snakeX === food.x && snakeY === food.y) {
      score++
      food = {
         x: Math.floor(Math.random() * 17 + 1) * box,
         y: Math.floor(Math.random() * 15 + 3) * box
      }
   } else {
      snake.pop()
   }

   if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
      clearInterval(game)
   }

   if (dir == 'left') {
      snakeX -= box
   }

   if (dir == 'right') {
      snakeX += box
   }

   if (dir == 'up') {
      snakeY -= box
   }

   if (dir == 'down') {
      snakeY += box
   }

   let newHead = {
      x: snakeX,
      y: snakeY
   }

   eatTail(newHead, snake)

   snake.unshift(newHead)
}

let game = setInterval(drawGame, 100)
