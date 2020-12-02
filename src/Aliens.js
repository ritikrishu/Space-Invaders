import * as PIXI from 'pixi.js'
import { parseColor } from './utils'

export default class Aliens extends PIXI.Container {
    #color = parseColor('#00ff00')
    #alienGraphics = []
    #alienWidth = 50
    #alienHeight = 50
    #speed = 10
    #direction = 1
    #timerIds = []
    constructor(app, bullets) {
        super()
        this.app = app
        this.bullets = bullets
        this.interactive = false
    }

    start() {
        const that = this
        this.#timerIds.push(setInterval(() => {
            that.#progressAttack()
        }, 50))
        this.#timerIds.push(setInterval(() => {
            this.#direction = Math.random() < 0.5 ? -1 : 1
        }, 3000))
        this.#timerIds.push(setInterval(() => {
            this.#createFlock()
        }, 10000))
    }
    stop() {
        clearInterval(this.#timerIds)
    }
    renderFrame(delta = 1) {
        const alienKilled = this.#alienGraphics.find(
            graphic => this.bullets.isHittin(new PIXI.Rectangle(
                graphic.position.x,
                graphic.position.y,
                graphic.width,
                graphic.height
            ))
        )
        if (alienKilled) {
            this.#alienGraphics = this.#alienGraphics.filter(graphic => graphic !== alienKilled)
                .sort((a, b) => a.x - b.x)
            alienKilled.destroy()
        }

        this.#alienGraphics.forEach(graphic => graphic.position.y = graphic.position.y + delta * 0.1)
    }

    #progressAttack() {
        if (this.#alienGraphics.length === 0) {
            this.#createFlock()
        }
        this.#direction === -1 ? this.#moveLeft() : this.#moveRight();
    }
    #createFlock() {
        const newFlock = Array(30).fill(null)
            .map((_, index) => {
                const graphic = new PIXI.Graphics()
                graphic.beginFill(this.#color, 1)
                graphic.lineStyle(2, this.#color)
                graphic.drawRect(
                    0,
                    0,
                    this.#alienWidth,
                    this.#alienHeight
                )
                graphic.endFill()
                graphic.position = {
                    x: (index % 10) * 50 + (index % 10) * 5,
                    y: Math.floor(index / 10) * 50 + Math.floor(index / 10) * 5
                }
                return graphic
            })
        newFlock.forEach(graphic => this.addChild(graphic))
        this.#alienGraphics = [
            ...this.#alienGraphics,
            ...newFlock
        ] .sort((a, b) => a.x - b.x)
    }
    #moveLeft() {
        this.#alienGraphics.forEach(graphic => {
            graphic.position.x = Math.max(graphic.position.x - this.#speed, this.#alienWidth / 2)
        })

        if (this.#alienGraphics[0].position.x <= this.#alienWidth) {
            this.#direction = 1
        }
    }
    #moveRight() {
        this.#alienGraphics.forEach(graphic => {
            graphic.position.x = Math.min(graphic.position.x + this.#speed, this.app.screen.width - this.#alienWidth / 2)
        })
        if (this.#alienGraphics[this.#alienGraphics.length - 1].position.x >= this.app.screen.width - this.#alienWidth) {
            this.#direction = -1
        }
    }
}