const SPEED = 0.002

export default class Paddle {
    constructor(element) {
        this.paddleElement = element
        this.reset()
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue('--position'))
    }

    set position(value) {
        this.paddleElement.style.setProperty('--position', value)
    }

    bounds() {
        return this.paddleElement.getBoundingClientRect()
    }

    reset() {
        this.position = 50
    }

    update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)
    }
}