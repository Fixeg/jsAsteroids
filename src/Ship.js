function Ship(pos, vel, angle, imageInfo) {
    var self = this;

    self.pos = pos;
    self.vel = vel;
    self.thrust = false;
    self.shooting = false;
    self.angle = angle;
    self.angle_vel = 0;
    self.image = imageInfo.image;
    self.image_center = imageInfo.center;
    self.image_size = imageInfo.size;
    self.radius = imageInfo.radius;
    self.last_shooting = 0;
    self.invulnerability = RESPAWN_INVULNERABILITY;

    self.shipThrustSound = document.getElementById('ship_thrust_sound');

    self.draw = function (canvas) {
        var crop;
        if (self.thrust == true) {
            self.shipThrustSound.play();
            crop = (self.invulnerability > 0 && self.invulnerability % 4 < 2)
                ? new Rectangle(270, 0, 90, 90)
                : new Rectangle(90, 0, 90, 90);
        } else {
            self.shipThrustSound.pause();
            crop = (self.invulnerability > 0 && self.invulnerability % 4 < 2)
                ? new Rectangle(180, 0, 90, 90)
                : new Rectangle(0, 0, 90, 90);
        }
        canvas.drawImage({
            image: Media.shipImg.image,
            draw: new Rectangle({ center: new Point(self.pos.x, self.pos.y), size: new Size(90, 90) }),
            crop: crop,
            angle: self.angle
        });
    };

    self.destroy = function () {
        lives -= 1;

        explosions.push(new Sprite(Media.getExplosionImg(), self.pos, {
            sound: Media.explosionSound,
            animated: true,
            lifespan: 1000,
            img_size: { width: 128, height: 128 }
        }));

        if (lives <= 0) {
            game_over = true;
        } else {
            self.invulnerability = RESPAWN_INVULNERABILITY;
        }
    };

    self.check_collision = function () {
        for (var i = 0; i < rocks.length; i++) {
            var dst = Helpers.dist(self.pos, rocks[i].pos);
            if (dst <= self.radius + rocks[i].radius) {
                if (self.invulnerability <= 0) {
                    self.destroy();
                    rocks[i] = rocks[rocks.length - 1];
                    rocks.pop();
                    i--;
                }
            }
        }
    };

    self.get_speed = function () {
        return Math.sqrt(Math.pow(self.vel.x, 2.0) + Math.pow(self.vel.y, 2.0));
    };

    self.update = function () {
        if (self.invulnerability > 0) {
            self.invulnerability -= 1;
        }

        self.angle = self.angle + self.angle_vel;
        while (self.angle > 2 * Math.PI) {
            self.angle -= 2 * Math.PI;
        }
        while (self.angle < 0) {
            self.angle += 2 * Math.PI;
        }

        var acceleration = { x: 0, y: 0 };
        if (self.thrust == true) {
            acceleration = Helpers.angle_to_vector(self.angle);
            acceleration.x *= ACCELERATION_COEF;
            acceleration.y *= ACCELERATION_COEF;
        }

        var friction = { x: self.vel.x * FRICTION_COEF, y: self.vel.y * FRICTION_COEF };

        if (Helpers.dist(self.vel) <= MAX_VEL) {
            self.vel.x += acceleration.x;
            self.vel.y += acceleration.y;
        }

        self.vel.x -= friction.x;
        self.vel.y -= friction.y;

        self.pos.x += self.vel.x;
        self.pos.y += self.vel.y;

        // cyclic space
        if (self.pos.x > WIDTH) {
            self.pos.x = 0;
        } else if (self.pos.x < 0) {
            self.pos.x = WIDTH;
        }

        if (self.pos.y > HEIGHT) {
            self.pos.y = 0;
        } else if (self.pos.y < 0) {
            self.pos.y = HEIGHT;
        }

        if (self.shooting == true && (time - self.last_shooting > TIME_BETWEEN_SHOOTING)) {
            var missile_vector = Helpers.angle_to_vector(self.angle, MISSILE_SPEED + self.get_speed());

            // setting missile position
            var missile_position = { x: self.pos.x, y: self.pos.y };
            var ship_size_vector = Helpers.angle_to_vector(self.angle, self.radius);
            missile_position.x += ship_size_vector.x;
            missile_position.y += ship_size_vector.y;

            var item = new Sprite(Media.missileImg, missile_position, {
                angle: self.angle,
                sound: Media.missileSound,
                vel: missile_vector,
                lifespan: 30
            });
            missiles.push(item);

            self.last_shooting = time;
        }

        self.check_collision();
    };
}