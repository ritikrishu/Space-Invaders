import * as PIXI from 'pixi.js'
import { parseColor } from './utils'

const PLAYER_WIDTH = 75
const PLAYER_HEIGHT = 50

export default class Player extends PIXI.Container {
    #color = parseColor('#0000ff')
    #graphic = new PIXI.Graphics()
    #speed = 10
    #direction = 0
    constructor(app) {
        super()
        this.addChild(this.#graphic)
        this.app = app
        this.interactive = false
    }

    start(direction = -1) {
        this.#direction = direction
        this.#graphic.position = {
            x: this.app.screen.width / 2,
            y: this.app.screen.height
        }
        this.#graphic.beginFill(this.#color, 1)
        this.#graphic.lineStyle(5, this.#color)
        this.#graphic.drawRect(
            0 - PLAYER_WIDTH / 2,
            0 - 25,
            PLAYER_WIDTH,
            25
        )
        this.#graphic.drawRect(
            0 - 12.5,
            0 - 50,
            25,
            PLAYER_HEIGHT
        )
        this.#graphic.endFill()
    }
    stop() {
        this.#direction = 0
    }
    renderFrame(delta = 1) {
        switch (this.#direction) {
            case 1:
                this.#moveRight(delta)
                break;
            case -1:
                this.#moveLeft(delta)
                break;
        }
    }

    #moveLeft(delta = 1) {
        this.#graphic.position.x = Math.max(this.#graphic.position.x - this.#speed * delta, PLAYER_WIDTH / 2)
        if(this.#graphic.position.x === PLAYER_WIDTH / 2){
            this.#direction = 1
        }
    }
    #moveRight(delta = 1) {
        this.#graphic.position.x = Math.min(this.#graphic.position.x + this.#speed * delta, this.app.screen.width - PLAYER_WIDTH / 2)
        if(this.#graphic.position.x === this.app.screen.width - PLAYER_WIDTH / 2){
            this.#direction = -1
        }
    }
    get playerPosition() {
        return this.#graphic.position
    }
    set direction(dir){
        this.#direction = dir
    }
}