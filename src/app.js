import * as PIXI from 'pixi.js'
import Player from './Player'
import Bullets from './Bullets'
import Aliens from './Aliens'

document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application({
        width: window.innerWidth - 40, height: window.innerHeight - 40, backgroundColor: 0x1099bb, resolution: 1,
    });
    const player = new Player(app)
    app.stage.addChild(player)

    const bullets = new Bullets(app, player)
    app.stage.addChild(bullets)

    const aliens = new Aliens(app, bullets)
    app.stage.addChild(aliens)

    document.body.appendChild(app.view)
    /**
     * listners
     */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            player.direction = -1
        }
        else if (e.key === 'ArrowRight') {
            player.direction = 1
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp') {
            bullets.shoot()
        }
    })


    app.ticker.add((delta) => {
        player.renderFrame(delta)
        bullets.renderFrame(delta)
        aliens.renderFrame(delta)
    })

    player.start()
    aliens.start()
})
