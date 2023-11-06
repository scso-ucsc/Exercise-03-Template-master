class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.map = this.add.image(0, 0, "map").setOrigin(0, 0); //Adding "map to background"

        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')
        //this.hero.anims.play("circular-attack"); //For testing

        //Camera Code
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height); //Affecting main camera bounds
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5); //Enable camera to follow player, doesn't round pixels, and has a 0.5 x and y lag

        //Changing physics bounds
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height); //Changing world bounds to the map

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)'
    }

    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step() //previously turn off temporarily for testing
    }
}