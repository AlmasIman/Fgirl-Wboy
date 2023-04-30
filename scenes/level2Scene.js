export default class level2Scene extends Phaser.Scene {
    constructor() {
        super('2levelScene')
        
        this.ground;
        this.platforms;
        this.waters;
        this.lavas;
        this.plates;
        this.gates;
        this.fire_doors;
        this.water_doors;
        this.player;
        this.cursor;
        this.player2;
        this.cursor2;
        
    }

    preload() {
        /* menu */
        this.load.image('title_bg', "'../../assets/title_bg.jpg")
        this.load.image('options_button', "'../../assets/options_button.png")
        this.load.image('play_button', "'../../assets/play_button.png")
        this.load.image('logo', "'../../assets/logo.png")
        this.load.audio('bgm', '../../assets/nevergonnagiveyouapp.mp3')

        /* loading bar */
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })


        this.load.on('progress', (precent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * precent, 50);
            console.log(precent)
        })

        this.load.image('sky', '../../assets/sky.png')
        this.load.image('ground', '../../assets/ground.png')
        this.load.image('platform', '../../assets/platform.png')
        this.load.image('vertikal_platform', '../../assets/vertical_platform.png')
        this.load.image('water', '../../assets/water1.png')
        this.load.image('lava', '../../assets/lava.png')
        this.load.image('gate', '../../assets/gate.png')
        this.load.image('plate', '../../assets/plate.png')
        this.load.image('fdoor', '../../assets/fire_door.png')
        this.load.image('wdoor', '../../assets/water_door.png')

        this.load.spritesheet('player', '../../assets/player/papa.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('player2', '../../assets/player/elite_knight.png', {frameWidth: 32, frameHeight: 32})
        
    }

    create() {

        
        this.add.image(400,300, 'title_bg').setOrigin()

        this.add.image(400,300,'sky')
        this.ground = this.physics.add.staticGroup()
        this.ground.create(400,600,'ground')

        this.platforms = this.physics.add.staticGroup()
        this.waters = this.physics.add.staticGroup()
        this.lavas = this.physics.add.staticGroup()
        this.plates = this.physics.add.staticGroup()
        this.gates = this.physics.add.staticGroup()
        this.fire_doors = this.physics.add.staticGroup()
        this.water_doors = this.physics.add.staticGroup()
    
    

        this.platforms.create(20,520,'platform')
        this.platforms.create(100,520,'platform')
        this.gates.create(150,460,'gate')
        this.platforms.create(100,400,'platform')
        this.platforms.create(20,400,'platform')
        this.platforms.create(230,400,'platform')
        this.platforms.create(355,400,'platform')
        this.platforms.create(480,430,'platform')
        this.platforms.create(720,500,'platform')
        this.lavas.create(400,600, 'lava')
        this.lavas.create(500,600, 'lava')
        this.plates.create(50,370,'plate')
        this.waters.create(480,430,'water')


        this.platforms.create(230,520,'platform')
        this.platforms.create(820,430,'platform')
        this.platforms.create(735,350,'platform')
        this.platforms.create(520,270,'platform')
        this.fire_doors.create(520,235,'fdoor')

        this.platforms.create(240,270,'platform')
        this.water_doors.create(240,235,'wdoor')

        this.player = this.physics.add.sprite(50,470, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.2)

        this.player2 = this.physics.add.sprite(100,565, 'player2')
        this.player2.setCollideWorldBounds(true)
        this.player2.setBounce(0.2)

        this.cursor = this.input.keyboard.createCursorKeys();

        this.cursor2 = this.input.keyboard.addKeys('W,S,A,D');
        
        this.physics.add.existing(this.player2);


        this.physics.add.collider(this.player, this.plates, this.handlePlateCollision, null, this);
        this.physics.add.collider(this.player2, this.plates, this.handlePlateCollision, null, this);

        this.handlePlayerDeath = (player) => {
            player.disableBody(true, true);
            this.time.delayedCall(1000, () => {
                this.scene.restart();
            }, [], this);
        };
    
        this.physics.add.collider(this.player, this.waters, () => {
            this.handlePlayerDeath(this.player);
        });
    
        this.physics.add.collider(this.player2, this.lavas, () => {
            this.handlePlayerDeath(this.player2);
        });

                
        this.physics.add.collider(this.player, this.fire_doors, () => {
            if (this.water_doors.countActive(true) === 1) {
                console.log('Congratulations, you have passed the level.');
            }
        })

        this.physics.add.collider(this.player2, this.water_doors, () => {
            if (this.fire_doors.countActive(true) === 1) {
                console.log('Congratulations, you have passed the level.');
            }
        })


        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.waters)
        this.physics.add.collider(this.player, this.lavas)
        this.physics.add.collider(this.player, this.ground)
        this.physics.add.collider(this.player, this.plates)
        this.physics.add.collider(this.player, this.gates)
        this.physics.add.collider(this.player, this.fire_doors)

        
        this.physics.add.collider(this.player2, this.platforms)
        this.physics.add.collider(this.player2, this.waters)
        this.physics.add.collider(this.player2, this.lavas)
        this.physics.add.collider(this.player2, this.ground)
        this.physics.add.collider(this.player2, this.plates)
        this.physics.add.collider(this.player2, this.gates)
        this.physics.add.collider(this.player2, this.water_doors)


        
    }

    handlePlateCollision(player, plate) {
        this.gates.getChildren()[0].disableBody(true, true);
        this.gates.getChildren()[0].setVisible(false);
     
     }
     
     handlePlayerDeath(player) {
        player.disableBody(true, true);
    
        this.time.delayedCall(1000, () => {
            this.scene.restart();
        }, [], this);
    }
    update() {

        this.physics.add.overlap(this.player, this.waters, () => {
            this.player.destroy();
            this.scene.restart();
          });
        
          this.physics.add.overlap(this.player2, this.lavas, () => {
            this.player2.destroy();
            this.scene.restart();
          });
        


        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-160)
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(160)
        } else {
            this.player.setVelocityX(0)
        }

        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250)
        }

        if (this.cursor2.A.isDown) {
            this.player2.setVelocityX(-160);
        } else if (this.cursor2.D.isDown) {
            this.player2.setVelocityX(160);
        } else {
            this.player2.setVelocityX(0);
        }

        if (this.cursor2.W.isDown && this.player2.body.touching.down) {
            this.player2.setVelocityY(-250);
        }

        
    }
}
