import Ball from './ball.js'
import Paddle from './paddle.js'

const pongBall = new Ball(document.getElementById('ball'))
const playerHand = new Paddle(document.getElementById('paddle__left'))
const computerHand = new Paddle(document.getElementById('paddle__right'))
const playerPoints = document.getElementById('player__points')
const computerPoints = document.getElementById('computer__points')

let lastTime = null

function gameLost() {
    return pongBall.bounds().left <= 0 || pongBall.bounds().right >= window.innerWidth
}

function update(time) {
    if(lastTime != null) {
        const delta = time - lastTime
        pongBall.update(delta, [playerHand.bounds(), computerHand.bounds()])
        computerHand.update(delta, pongBall.Y)

        document.documentElement.style.setProperty('--hue', parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue')) + delta * 0.01)

        if(gameLost()) {
            if(pongBall.bounds().right >= window.innerWidth) {
                playerPoints.innerText = parseInt(playerPoints.innerText) + 1
            } else {
                computerPoints.innerText = parseInt(computerPoints.innerText) + 1
            }

            pongBall.reset()
            computerHand.reset()
        }
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

document.addEventListener('mousemove', (event) => playerHand.position = event.y / window.innerHeight * 100)

window.requestAnimationFrame(update)