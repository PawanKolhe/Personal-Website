// Particle effect
(function(){
    let canvas = document.querySelector("#canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let ctx = canvas.getContext("2d");

    let TAU = 2 * Math.PI;

    times = [];
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        update();
        draw();
        requestAnimationFrame(loop);
    }

    class Ball {
        constructor(startX, startY, startVelX, startVelY) {
            this.x = startX || Math.random() * canvas.width;
            this.y = startY || Math.random() * canvas.height;
            this.vel = {
                x: startVelX || Math.random() * 2 - 1,
                y: startVelY || Math.random() * 2 - 1
            };
            this.update = function (canvas) {
                if (this.x > canvas.width + 50 || this.x < -50) {
                    this.vel.x = -this.vel.x;
                }
                if (this.y > canvas.height + 50 || this.y < -50) {
                    this.vel.y = -this.vel.y;
                }
                this.x += this.vel.x;
                this.y += this.vel.y;
            };
            this.draw = function (ctx, can) {
                ctx.beginPath();
                let distM = distMouse(this);
                if (distM > 200) {
                    ctx.fillStyle = "#050606";
                    ctx.globalAlpha = .2;
                }
                else {
                    ctx.fillStyle = '#3FABEF';
                    ctx.globalAlpha = 1 - distM / 240;
                }
                ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 4, 0, TAU, false);
                ctx.fill();
            };
        }
    }

    let balls = [];
    for (let i = 0; i < canvas.width * canvas.height / (105*105); i++) {
        balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    let lastTime = Date.now();
    function update() {
        let diff = Date.now() - lastTime;
        for (let frame = 0; frame * 16.6667 < diff; frame++) {
            for (let index = 0; index < balls.length; index++) {
            balls[index].update(canvas);
            }
        }
        lastTime = Date.now();
    }
    let mouseX = -1e9, mouseY = -1e9;
    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    function distMouse(ball) {
        return Math.hypot(ball.x - mouseX, ball.y - mouseY);
    }

    function draw() {
        for (let index = 0; index < balls.length; index++) {
            let ball = balls[index];
            ctx.beginPath();
            for (let index2 = balls.length - 1; index2 > index; index2 += -1) {
                let ball2 = balls[index2];
                let dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
                if (dist < 100) {
                    let distM = distMouse(ball2);
                    if (distM > 150) {
                        ctx.strokeStyle = "#8f9aa3";
                        ctx.globalAlpha = .2;
                    } else {
                        ctx.globalAlpha = 0;
                    }
                    ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
                    ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
                }
            }
            ctx.stroke();
            ball.draw(ctx, canvas);
        }
    }

    // Start
    loop();
})();