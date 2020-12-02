import * as PIXI from 'pixi.js'
import { parseColor } from './utils'

export default class Bullets extends PIXI.Container {
    #bulletGraphics = []
    #color = parseColor('#ff0000')
    #bulletWidth = 20
    #bulletHeight = 40
    #speed = 10
    constructor(app, player) {
        super()
        this.app = app
        this.player = player
        this.interactive = false
    }

    shoot() {
        const graphic = new PIXI.Graphics()
        graphic.beginFill(this.#color, 1)
        graphic.lineStyle(2, this.#color)
        graphic.drawRect(
            0 - this.#bulletWidth / 2,
            0 - 55,
            this.#bulletWidth,
            this.#bulletHeight
        )
        graphic.endFill()
        this.addChild(graphic)
        graphic.position = {
            x: this.player.playerPosition.x,
            y: this.player.playerPosition.y - 25
        }
        this.#bulletGraphics.push(graphic)
    }
    renderFrame(delta = 1) {
        this.#bulletGraphics = this.#bulletGraphics.filter(graphic => {
            graphic.position.y = graphic.position.y - this.#speed * delta
            if (graphic.position.y < 5) {
                graphic.destroy()
                return false
            }
            return true
        })
    }
    isHittin(block) {
        const bulletHittingAlien = this.#bulletGraphics.find(graphic => {
            return (
                block.contains(
                    graphic.position.x - this.#bulletWidth / 2,
                    graphic.position.y
                ) ||
                block.contains(
                    graphic.position.x + this.#bulletWidth / 2,
                    graphic.position.y
                ) ||
                block.contains(
                    graphic.position.x - this.#bulletWidth / 2,
                    graphic.position.y + this.#bulletHeight
                ) ||
                block.contains(
                    graphic.position.x + this.#bulletWidth / 2,
                    graphic.position.y + this.#bulletHeight
                )
            )
        })
        if(bulletHittingAlien){
            this.#bulletGraphics = this.#bulletGraphics.filter(graphic => {
                if (graphic === bulletHittingAlien) {
                    graphic.destroy()
                    return false
                }
                return true
            })
        }
        return Boolean(bulletHittingAlien)
    }
}