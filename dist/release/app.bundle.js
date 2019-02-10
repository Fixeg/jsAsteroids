!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i={left:37,right:39,up:38,down:40,space:32};function r(e,t,n){var i,r,o=new Image;o.onload=function(){i=t||{width:o.width,height:o.height},r=Math.max(i.width,i.height)/2,n=n||0},o.src=e,this.getImage=function(){return o},this.getWidth=function(){return i.width},this.getHeight=function(){return i.height},this.getRadius=function(){return r},this.isAnimated=function(){return!!n},this.getAnimationTime=function(){return n}}var o={randRange:function(e,t){var n=parseInt((t-e)*Math.random()+e);return n===t?n-1:n},random:function(){return Math.random()}};var s=new function(){var e,t;!function(){e=[new r("res/sprites/asteroid_blue.png"),new r("res/sprites/asteroid_blend.png"),new r("res/sprites/asteroid_brown.png")];var n={width:128,height:128};t=[new r("res/sprites/explosion_alpha.png",n,240),new r("res/sprites/explosion_blue.png",n,240),new r("res/sprites/explosion_blue2.png",n,240),new r("res/sprites/explosion_orange.png",n,240)]}(),this.nebulaImg=new r("res/sprites/the_great_nebula.jpg"),this.debrisImg=new r("res/sprites/debris2_blue.png"),this.shipImg=new r("res/sprites/double_ship.png",{width:90,height:90}),this.missileImg=new r("res/sprites/shot2.png"),this.getAsteroidImg=function(){return e[o.randRange(0,e.length)]},this.getExplosionImg=function(){return t[o.randRange(0,t.length)]}},a={MAX_VEL:7,ACCELERATION_COEF:.5,FRICTION_COEF:.05,TIME_BETWEEN_SHOOTING:10,SHIP_TURNING_COEF:.03,FPS:60,MISSILE_LIFETIME:200,MISSILE_SPEED:15,MISSILE_RADIUS:10,ROCK_VEL_MULTIPLIER:3,ROCK_SPAWN_TIME:2e3,LARGE_ROCK_RADIUS:45,SMALL_ROCK_RADIUS:22.75,SHIP_RADIUS:45,TICK_TIME:17,INITIAL_LIVES:3,RESPAWN_INVULNERABILITY:200,PLAY_SOUNDTRACK:!0};var u={angleToVector:function(e,t){return{x:(t=t||1)*Math.cos(e),y:t*Math.sin(e)}},dist:function(e,t){return t||(t={x:0,y:0}),Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}};function g(e){var t=s.shipImg;this.render=function(n){var i,r=e.getPosition();Debug.isDebugMode()&&(n.beginPath(),n.arc(r.x,r.y,e.getRadius(),0,2*Math.PI,!1),n.fillStyle="green",n.fill(),n.lineWidth=3,n.strokeStyle="#003300",n.stroke());i=e.isThrusting()?e.isInvulnerable()&&e.getRemainingInvulnerability()%4<2?3*t.getWidth():t.getWidth():e.isInvulnerable()&&e.getRemainingInvulnerability()%4<2?2*t.getWidth():0;n.drawImage({image:t.getImage(),draw:new Rectangle({center:new Point(r.x,r.y),size:new Size(2*e.getRadius(),2*e.getRadius())}),crop:new Rectangle(i,0,t.getWidth(),t.getHeight()),angle:e.getAngle()})}}function l(e,t,n){var i=e,r=t,o=!1,s=!1,l=n,h=0,c=a.RESPAWN_INVULNERABILITY;function d(){return!!o}this.getPosition=function(){return i},this.getRadius=function(){return a.SHIP_RADIUS},this.getAngle=function(){return l},this.getVelocity=function(){return r},this.getSpeed=function(){return Math.sqrt(Math.pow(r.x,2)+Math.pow(r.y,2))},this.startTurningLeft=function(){h=-Math.PI*a.SHIP_TURNING_COEF},this.startTurningRight=function(){h=Math.PI*a.SHIP_TURNING_COEF},this.stopTurning=function(){h=0},this.startThrusting=function(){o=!0},this.stopThrusting=function(){o=!1},this.isThrusting=d,this.isShooting=function(){return s},this.startShooting=function(){s=!0},this.stopShooting=function(){s=!1},this.getRemainingInvulnerability=function(){return c},this.makeInvulnerable=function(){c=a.RESPAWN_INVULNERABILITY},this.isInvulnerable=function(){return c>0},this.processTick=function(){c>0&&(c-=1);(function(){l+=h;for(;l>2*Math.PI;)l-=2*Math.PI;for(;l<0;)l+=2*Math.PI})(),function(){var e={x:0,y:0};d()&&((e=u.angleToVector(l)).x*=a.ACCELERATION_COEF,e.y*=a.ACCELERATION_COEF);var t={x:r.x*a.FRICTION_COEF,y:r.y*a.FRICTION_COEF};u.dist(r)<=a.MAX_VEL&&(r.x+=e.x,r.y+=e.y);r.x-=t.x,r.y-=t.y,i.x+=r.x,i.y+=r.y}(),function(){i.x>S.getFieldWidth()?i.x=0:i.x<0&&(i.x=S.getFieldWidth());i.y>S.getFieldHeight()?i.y=0:i.y<0&&(i.y=S.getFieldHeight())}()},this.render=new g(this).render}var h=new function(){var e=!1;this.log=function(t){e&&console.log(t)},this.isDebugMode=function(){return e},this.enableDebugMode=function(){e=!0},this.disableDebugMode=function(){e=!1}};function c(e){var t=s.missileImg;this.render=function(n){var i=e.getPosition();h.isDebugMode()&&(n.beginPath(),n.arc(i.x,i.y,e.getRadius(),0,2*Math.PI,!1),n.fillStyle="yellow",n.fill(),n.lineWidth=3,n.strokeStyle="#BDB76B",n.stroke());n.drawImage({image:t.getImage(),draw:new Rectangle({center:new Point(i.x,i.y),size:new Size(2*e.getRadius(),2*e.getRadius())}),crop:new Rectangle(0,0,t.getWidth(),t.getHeight()),angle:e.getAngle()})}}function d(e,t,n){var i={x:e.x,y:e.y},r={x:t.x,y:t.y},o=n,s=a.MISSILE_LIFETIME;this.processTick=function(){i.x+=r.x,i.y+=r.y,s--},this.getPosition=function(){return i},this.getAngle=function(){return o},this.isExpired=function(){return s<=0},this.getRadius=function(){return a.MISSILE_RADIUS},this.render=new c(this).render}function f(e){var t=s.getAsteroidImg();this.render=function(n){var i=e.getPosition();Debug.isDebugMode()&&(n.beginPath(),n.arc(i.x,i.y,e.getRadius(),0,2*Math.PI,!1),n.fillStyle="red",n.fill(),n.lineWidth=3,n.strokeStyle="#330000",n.stroke());n.drawImage({image:t.getImage(),draw:new Rectangle({center:new Point(i.x,i.y),size:new Size(2*e.getRadius(),2*e.getRadius())}),crop:new Rectangle(0,0,t.getWidth(),t.getHeight()),angle:e.getAngle()})}}function I(e,t,n){var i={x:e.x,y:e.y},r={x:t.x,y:t.y},s=Math.PI*o.random(),u=n;function g(){return u}this.processTick=function(){i.x+=r.x,i.y+=r.y,i.x>S.getFieldWidth()?i.x=0:i.x<0&&(i.x=S.getFieldWidth());i.y>S.getFieldHeight()?i.y=0:i.y<0&&(i.y=S.getFieldHeight())},this.getPosition=function(){return i},this.getAngle=function(){return s},this.isLarge=g,this.getRadius=function(){return g()?a.LARGE_ROCK_RADIUS:a.SMALL_ROCK_RADIUS},this.render=new f(this).render}function p(e){var t=0,n=s.getExplosionImg();this.render=function(i){var r=e.getPosition(),o={x:n.getWidth()/2,y:n.getHeight()/2},s={x:o.x+t*n.getWidth(),y:o.y};t++,i.drawImage({image:n.getImage(),draw:new Rectangle({center:new Point(r.x,r.y),size:new Size(n.getWidth(),n.getHeight())}),crop:new Rectangle({center:s,size:new Size(n.getWidth(),n.getHeight())}),angle:e.getAngle()})},this.isFinished=function(){return t>=n.getAnimationTime()}}function y(e){var t={x:e.x,y:e.y},n=o.random()*Math.PI,i=new p(this);this.isExpired=function(){return i.isFinished()},this.getPosition=function(){return t},this.getAngle=function(){return n},this.render=i.render}var x=new function(){var e=[],t=[],n=[];this.initialize=function(){e=[],t=[],n=[]},this.createMissile=function(t){t=t||v.getShip();var n=u.angleToVector(t.getAngle(),a.MISSILE_SPEED+t.getSpeed()),i=u.angleToVector(t.getAngle(),t.getRadius()),r=new d({x:t.getPosition().x+i.x,y:t.getPosition().y+i.y},n,t.getAngle());return e.push(r),r},this.getMissiles=function(){return e},this.removeObsoleteMissiles=function(){for(var t=[],n=0;n<e.length;n++){var i=e[n],r=i.getPosition(),o=r.x>0&&r.y>0&&r.x<S.getFieldWidth()&&r.y<S.getFieldHeight();!e[n].isExpired()&&o&&t.push(i)}e=t},this.createRock=function(e,n,i){var r=new I(e,n,i);return t.push(r),r},this.getRocks=function(){return t},this.createExplosion=function(e){var t=new y(e);return n.push(t),t},this.getExplosions=function(){return n},this.removeObsoleteExplosions=function(){for(var e=[],t=0;t<n.length;t++){var i=n[t];i.isExpired()||e.push(i)}n=e}};var R=new function(){var e=new Audio("res/sounds/soundtrack.mp3"),t=new Audio("res/sounds/missile.mp3"),n=new Audio("res/sounds/explosion.mp3"),i=new Audio("res/sounds/thrust.mp3");function r(e){e.pause(),e.currentTime=0}this.playSoundtrack=function(){e.play()},this.playMissileSound=function(){t.play()},this.playExplosionSound=function(){n.play()},this.playThrustSound=function(){i.play()},this.stopThrustSound=function(){r(i)},this.stopAllSounds=function(){r(i),r(t),r(n)}};var v=new function(){var e,t=!1,n=0,i=a.INITIAL_LIVES,r=0,s=0,g=!1;function h(){if(!g){var t;r++,e.processTick(),!0===e.isShooting()&&r-s>a.TIME_BETWEEN_SHOOTING&&(x.createMissile(e),R.playMissileSound(),s=r),e.isThrusting()?R.playThrustSound():R.stopThrustSound();var o=x.getMissiles();for(t=0;t<o.length;t++)o[t].processTick();var l=x.getRocks();for(t=0;t<l.length;t++)l[t].processTick();x.removeObsoleteMissiles(),x.removeObsoleteExplosions(),function(){for(var e=x.getMissiles(),t=x.getRocks(),i=e.length-1;i>=0;i--){for(var r=!1,o=t.length-1;o>=0;o--){var s=u.dist(e[i].getPosition(),t[o].getPosition());if(s<=e[i].getRadius()+t[o].getRadius()){x.createExplosion(t[o].getPosition()),t[o].isLarge()&&(d(t[o]),d(t[o]),d(t[o])),r=!0,n+=1,t.splice(o,1);break}}r&&(e.splice(i,1),R.playExplosionSound())}}(),function(){if(!e.isInvulnerable())for(var t=x.getRocks(),n=t.length-1;n>=0;n--){var r=u.dist(t[n].getPosition(),e.getPosition());if(r<=t[n].getRadius()+e.getRadius()){x.createExplosion(e.getPosition()),i-=1,e.makeInvulnerable(),R.playExplosionSound(),0===i&&(g=!0,R.stopAllSounds()),t.splice(n,1);break}}}()}}function c(){if(!g){var t,n,i=function(){var t;do{t={x:o.randRange(0,S.getFieldWidth()),y:o.randRange(0,S.getFieldHeight())}}while(u.dist(t,e.getPosition())<3*(e.getRadius()+a.LARGE_ROCK_RADIUS));return t}(),r=(t=o.randRange(0,100)%2==0?a.ROCK_VEL_MULTIPLIER:-a.ROCK_VEL_MULTIPLIER,n=o.randRange(0,100)%2==0?a.ROCK_VEL_MULTIPLIER:-a.ROCK_VEL_MULTIPLIER,{x:o.random()*t,y:o.random()*n});x.createRock(i,r,!0)}}function d(e){var t={x:o.randRange(-a.ROCK_VEL_MULTIPLIER,a.ROCK_VEL_MULTIPLIER),y:o.randRange(-a.ROCK_VEL_MULTIPLIER,a.ROCK_VEL_MULTIPLIER)},n={x:e.getPosition().x+t.x,y:e.getPosition().y+t.y};return x.createRock(n,t,!1)}this.initialize=function(){t||(setInterval(h,a.TICK_TIME),setInterval(c,a.ROCK_SPAWN_TIME),t=!0)},this.getScore=function(){return n},this.getLives=function(){return i},this.getTime=function(){return r},this.isGameOver=function(){return!!g},this.getShip=function(){return e},this.restartGame=function(){var t,u;t={x:S.getFieldWidth()/2,y:S.getFieldHeight()/2},u=o.random()*Math.PI,e=new l(t,{x:0,y:0},u),n=0,r=0,s=0,i=a.INITIAL_LIVES,g=!1,x.initialize()}};var S=new function(){var e,t=!1,n=1024,i=768;function r(){if(e.drawImage(s.nebulaImg.getImage(),0,0),e.drawImage(s.debrisImg.getImage(),0,0),v.isGameOver())return e.font="36px Arial",e.fillStyle="#FF0000",e.fillText("GAME OVER (Click to continue)",n/2-240,i/2),e.font="24px Arial",void e.fillText("Score: "+v.getScore(),n/2-60,i/2+40);var t,r;h.isDebugMode()&&function(){var t=40;e.font="10px Arial",e.fillStyle="#00FF00";var n=v.getShip();e.fillText("Ship:",20,t),t+=10;var i="{ x: "+parseInt(n.getPosition().x)+", y: "+parseInt(n.getPosition().y)+"}";e.fillText("Coords: "+i,20,t),t+=10,e.fillText("Angle: "+n.getAngle().toFixed(2),20,t),t+=10,e.fillText("Shooting: "+(n.isShooting()?"yes":"no"),20,t),t+=10,e.fillText("Invulnerable: "+(n.isInvulnerable()?"yes":"no"),20,t),t+=20,e.fillStyle="#00AAAA",e.fillText("MissileCount: "+x.getMissiles().length,20,t),t+=20,e.fillStyle="#FF0000",e.fillText("RockCount: "+x.getRocks().length,20,t),t+=20,e.fillStyle="#AAAAAA",e.fillText("ExplosionsCount: "+x.getExplosions().length,20,t),t+=20}(),t="Score: "+v.getScore(),e.font="20px Arial",e.fillStyle="#FFFFFF",e.fillText(t,10,20),r="Lives: "+v.getLives(),e.font="20px Arial",e.fillStyle="#FFFFFF",e.fillText(r,n-100,20),function(){for(var t=x.getExplosions(),n=0;n<t.length;n++)t[n].render(e)}(),v.getShip().render(e),function(){for(var t=x.getMissiles(),n=0;n<t.length;n++)t[n].render(e)}(),function(){for(var t=x.getRocks(),n=0;n<t.length;n++)t[n].render(e)}()}function o(){return document.getElementById("mainCanvas")}this.initialize=function(){t||(setInterval(r,1e3/a.FPS),e=o().getContext("2d-libcanvas"),t=!0)},this.resize=function(e,t){n=e,i=t;var r=o();r.width=n,r.height=i,r.style.width=n+"px",r.style.height=i+"px"},this.getFieldWidth=function(){return n},this.getFieldHeight=function(){return i}};var E={onKeyDown:function(e){var t=e.keyCode,n=v.getShip();t===i.up?n.startThrusting():t===i.left?n.startTurningLeft():t===i.right?n.startTurningRight():t===i.space&&n.startShooting()},onKeyUp:function(e){var t=e.keyCode,n=v.getShip();t===i.up?n.stopThrusting():t===i.left||t===i.right?n.stopTurning():t===i.space&&n.stopShooting()},onClick:function(){v.isGameOver()&&v.restartGame()},onResize:function(e){S.resize(e.target.innerWidth,e.target.innerHeight)}};function m(){LibCanvas.extract(),S.initialize(),S.resize(window.innerWidth,window.innerHeight),v.initialize(),v.restartGame(),a.PLAY_SOUNDTRACK&&R.playSoundtrack()}window.Debug=h,function(){document.body||(document.body=document.createElement("body"));var e=document.body;if(!document.getElementById("mainCanvas")){var t=document.createElement("canvas");t.id="mainCanvas",document.body.appendChild(t)}e.onload=m,e.onkeydown=E.onKeyDown,e.onkeyup=E.onKeyUp,e.onclick=E.onClick,e.onresize=E.onResize,e.style.margin="0",e.style.overflow="hidden"}()}]);