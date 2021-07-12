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

function drawGame() {
   ctx.drawImage(field, 0, 0)

   ctx.drawImage(foodImg, food.x, food.y)

   for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = 'green'
      ctx.fillRect(snake[i].x, snake[i].y, box, box)
   }

   ctx.fillStyle = 'white'
   ctx.font = '50px Arial'
   ctx.fillText(score, box * 2.5, box * 1.7)
}

let game = setInterval(drawGame, 100)
