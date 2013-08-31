function Ship(game, pos, vel, angle, image, info) {
    var self = this;

    self.GameState = game;
    self.pos = pos;
    self.vel = vel;
    self.thrust = false;
    self.shooting = false;
    self.angle = angle;
    self.angle_vel = 0;
    self.image = image;
    self.image_center = info.center;
    self.image_size = info.size;
    self.radius = info.radius;
    self.last_shooting = 0;
    self.invulnerability = RESPAWN_INVULNERABILITY;

    self.shipThrustSound = document.getElementById('ship_thrust_sound');

    self.draw = function (canvas) {
        if (self.thrust == true) {
            self.shipThrustSound.play();
            canvas.drawImage({
                image: ship_image,
                draw: new Rectangle({ center: new Point(self.pos.x, self.pos.y), size: new Size(90, 90)}),
                crop: new Rectangle(90, 0, 90, 90),
                //center: new Point(self.pos.x, self.pos.y),
                angle: self.angle
            });
        } else {
            self.shipThrustSound.pause();
            canvas.drawImage({
                image: ship_image,
                draw: new Rectangle({ center: new Point(self.pos.x, self.pos.y), size: new Size(90, 90)}),
                crop: new Rectangle(0, 0, 90, 90),
                //center: new Point(self.pos.x, self.pos.y),
                angle: self.angle
            });
        }

//        if (self.invulnerability > 0 && self.invulnerability % 5 == 0) {
//            canvas.draw_circle(self.pos, ship_info.radius + 10.0, 1, "White");
//        }
    };

    self.destroy = function () {
        game.lives -= 1;

        //explosions.append(new Explosion(self.pos));

        /*if (lives <= 0) {
         game.game_over = true;
         } else {
         self.invulnerability = RESPAWN_INVULNERABILITY;
         }*/
    };

    /*self.check_collision = function (self) {
     for (var rock in rocks) {
     var dst = dist(self.pos, rock.pos);
     if (dst <= self.radius + rock.radius) {
     if (self.invulnerability <= 0) {
     self.destroy();
     rocks.remove(rock);
     }
     }
     }
     };*/

    self.get_speed = function () {
        return Math.sqrt(Math.pow(self.vel.x, 2.0) + Math.pow(self.vel.y, 2.0))
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

        var acceleration = {x: 0, y: 0};
        if (self.thrust == true) {
            acceleration = angle_to_vector(self.angle);
            acceleration.x *= ACCELERATION_COEF;
            acceleration.y *= ACCELERATION_COEF;
        }

        var friction = {x: self.vel.x * FRICTION_COEF, y: self.vel.y * FRICTION_COEF};

        if (dist(self.vel) <= MAX_VEL) {
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
        }
        else if (self.pos.y < 0) {
            self.pos.y = HEIGHT;
        }

//        if (self.shooting == true && (time - self.last_shooting > TIME_BETWEEN_SHOOTING)) {
//            missle_vector = angle_to_vector(self.angle, MISSILE_SPEED + self.speed())
//
//            // setting missle position
//            missle_position = list(self.pos);
//            ship_size = ship_info.get_radius() + 1.0;
//            ship_size_vect = angle_to_vector(self.angle, ship_size);
//            missle_position[0] += ship_size_vect[0];
//            missle_position[1] += ship_size_vect[1];
//
//            item = (time, Sprite(missle_position, missle_vector, self.angle, 0, missile_image, missile_info, missile_sound));
//            missiles.append(item);
//
//            self.last_shooting = time;
//        }

//        self.check_collision();
    }
}