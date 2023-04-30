export default class mainScene extends Phaser.Scene {
    constructor() {
        super('mainScene')
        
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

        this.load.spritesheet('player', '../../assets/player/papa.png', {frameWidth: 32, frameHeidht: 32})
        this.load.spritesheet('player2', '../../assets/player/elite_knight.png', {frameWidth: 32, frameHeidht: 32})
        
    }

    create() {
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
        this.lavas.create(128,525, 'lava')
        this.waters.create(340,525,'water')
        this.platforms.create(240,520,'platform')
        this.platforms.create(448,520,'platform')
        this.platforms.create(575,520,'platform')


        this.platforms.create(760,570,'platform')
        this.platforms.create(735,420,'platform')
        this.platforms.create(605,420,'platform')
        this.platforms.create(480,420,'platform')
        this.platforms.create(350,420,'platform')
        this.platforms.create(100,420,'platform')


        this.platforms.create(120,317,'platform')
        this.platforms.create(150,234,'vertikal_platform')
        this.platforms.create(67,180,'platform')
        this.platforms.create(250,317,'platform')
        this.platforms.create(380,317,'platform')
        this.platforms.create(510,317,'platform')
        this.platforms.create(640,317,'platform')
        this.platforms.create(380,317,'platform')

        this.plates.create(105,300,'plate')
        this.gates.create(500,360,'gate')

        this.fire_doors.create(400,280,'fdoor')
        this.water_doors.create(350,280,'wdoor')










        this.player = this.physics.add.sprite(100,530, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.2)

        this.player2 = this.physics.add.sprite(50,530, 'player2')
        this.player2.setCollideWorldBounds(true)
        this.player2.setBounce(0.2)

        this.cursor = this.input.keyboard.createCursorKeys();

        this.cursor2 = this.input.keyboard.addKeys('W,S,A,D');
        
        // Enable physics on player2 sprite
        this.physics.add.existing(this.player2);


        this.physics.add.collider(this.player, this.plates, this.handlePlateCollision, null, this);
        this.physics.add.collider(this.player2, this.plates, this.handlePlateCollision, null, this);

        

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
        // Disable the body and visibility of the gate
        this.gates.getChildren()[0].disableBody(true, true);
        this.gates.getChildren()[0].setVisible(false);
     
        // Enable the body and visibility of the water door
     }
     

    update() {
        
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

        // Move player2 with WASD keys
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