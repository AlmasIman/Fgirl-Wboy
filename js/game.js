import mainScene from "../scenes/mainScene.js"

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
    scene: [mainScene]
}

new Phaser.Game(conf)