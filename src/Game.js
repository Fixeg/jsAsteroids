// constants for user interface
var FPS = 60;
var WIDTH = 800;
var HEIGHT = 600;

// game constants
var MAX_VEL = 7;
var ACCELERATION_COEF = 0.5;
var FRICTION_COEF = 0.05;
var TIME_BETWEEN_SHOOTING = 10;
var MISSILE_LIFETIME = 30;
var MISSILE_SPEED = 15;
var ROCK_VEL_MULTIPLIER = 3;
var INITIAL_LIVES = 3;
var RESPAWN_INVULNERABILITY = 200;

// globals for UI
var score = 0;
var lives = INITIAL_LIVES;
var time = 0;
var game_over = false;

var my_ship;

var debris_img = new ImageInfo('res/sprites/debris2_blue.png');
var nebula_img = new ImageInfo('res/sprites/nebula_blue.png');
var ship_img = new ImageInfo('res/sprites/double_ship.png');

var missile_img = new ImageInfo('res/sprites/shot2.png');

// asteroid images - asteroid_blue.png, asteroid_brown.png, asteroid_blend.png
var asteroid_img = new ImageInfo('res/sprites/asteroid_blue.png');

// animated explosion - explosion_orange.png, explosion_blue.png, explosion_blue2.png, explosion_alpha.png
var explosion_img = new ImageInfo('res/sprites/explosion_alpha.png');

var soundtrack;
var missile_sound;
var explosion_sound;

var canvas;

// helper functions to handle transformations
function angle_to_vector(ang, r) {
    r = r ? r : 1;
    return {x: r * Math.cos(ang), y: r * Math.sin(ang)};
}

function dist(p, q) {
    if (!q) q = {x: 0, y: 0};
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}

// storage for sprites
var missiles = [];
var rocks = [];
var explosions = [];

// timer handler that spawns a rock
function spawn_rock(rock_pos, large) {
    rock_pos = rock_pos ? rock_pos : { x: Random.randRange(0, WIDTH), y: Random.randRange(0, HEIGHT) };
    var mul1 = Random.random() * (Random.randRange(0, 100) % 2 == 0 ? ROCK_VEL_MULTIPLIER : -ROCK_VEL_MULTIPLIER);
    var mul2 = Random.random() * (Random.randRange(0, 100) % 2 == 0 ? ROCK_VEL_MULTIPLIER : -ROCK_VEL_MULTIPLIER);

    var params = {
        vel: { x: mul1, y: mul2}
    };
    rocks.push(new Sprite(asteroid_img, rock_pos, params));
}

function on_key_down(evt) {
    var key = evt.keyIdentifier;
    if (key == "Up") {
        my_ship.thrust = true;
    } else if (key == "Down") {
    } else if (key == "Left") {
        my_ship.angle_vel = -Math.PI * 0.03;
    } else if (key == "Right") {
        my_ship.angle_vel = Math.PI * 0.03;
    } else if (key == "U+0020") {
        // space key
        my_ship.shooting = true;
    }
}

function on_key_up(evt) {
    var key = evt.keyIdentifier;
    if (key == "Up") {
        my_ship.thrust = false;
    } else if (key == "Down") {
    } else if (key == "Left") {
        my_ship.angle_vel = 0;
    } else if (key == "Right") {
        my_ship.angle_vel = 0;
    } else if (key == "U+0020") {
        // space key
        my_ship.shooting = false;
    }
}

function on_click(position) {
    if (game_over == true) {
        game_over = false;
        score = 0;
        lives = INITIAL_LIVES;

        respawn()
    }
}

function respawn() {
    my_ship = new Ship(self, {
        x: WIDTH / 2,
        y: HEIGHT / 2
    }, {
        x: 0,
        y: 0
    }, 0, ship_img.image, ship_img);

    my_ship.angle = Random.random() * Math.PI;
    rocks = [];
    missiles = [];
    explosions = [];
}

function redraw() {
    time += 1;

    canvas.drawImage(nebula_img.image, 0, 0);
    canvas.drawImage(debris_img.image, 0, 0);

    my_ship.update();
    my_ship.draw(canvas);

    for (var i = 0; i < missiles.length; i++) {
        missiles[i].update();
        missiles[i].draw();
    }

    for (i = 0; i < rocks.length; i++) {
        rocks[i].update();
        rocks[i].draw();
    }

    for (i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
    }
}

function init() {
    LibCanvas.extract();
    canvas = document.getElementById('mainCanvas').getContext("2d-libcanvas");

    soundtrack = document.getElementById('soundtrack');
    missile_sound = document.getElementById('missileSound');
    //missile_sound.volume = 0.5;
    explosion_sound = document.getElementById('explosion_sound');

    setInterval(redraw, 1000 / FPS);
    respawn();

    setInterval(function () {
        spawn_rock({ x: Random.randRange(0, WIDTH), y: Random.randRange(0, HEIGHT)});
    }, 2000);

    //soundtrack.play();
}
