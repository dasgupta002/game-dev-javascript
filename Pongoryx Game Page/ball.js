const INITIAL_SPEED = 0.025
const stop = 0.00001

export default class Ball {    
    constructor(element) {
        this.ballElement = element
        this.reset()
    }

    get X() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'))
    }

    set X(value) {
        this.ballElement.style.setProperty('--x', value)
    }

    get Y() {
        return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'))   
    }

    set Y(value) {
        this.ballElement.style.setProperty('--y', value)
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min
    }

    bounds() {
        return this.ballElement.getBoundingClientRect()
    }

    colllisionDetected(bound) {
        return bound.left <= this.bounds().right && bound.right >= this.bounds().left && bound.top <= this.bounds().bottom && bound.bottom >= this.bounds().top 
    }

    reset() {
        this.X = 50
        this.Y = 50
        this.direction = { x: 0 }
    
        while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = this.randomNumber(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }

        this.speed = INITIAL_SPEED
    }

    update(difference, paddleBounds) {
        this.X += this.direction.x * this.speed * difference
        this.Y += this.direction.y * this.speed * difference
        this.speed += stop * difference

        if(this.bounds().top <= 0 || this.bounds().bottom >= window.innerHeight) {
            this.direction.y *= -1
        }

        if(paddleBounds.some((bound) => this.colllisionDetected(bound))) {
            this.direction.x *= -1
        }
    }
}