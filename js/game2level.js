import level2Scene from "../scenes/level2Scene.js"

const conf = {
    type: Phaser.AUTO,
    width: 800,
    heidth: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true,
        }
    },
    scene: [level2Scene]
}

new Phaser.Game(conf)