var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
context.strokeStyle = 'black';
context.fillStyle = 'rgb(0, 255, 255)';

var mouseX;
var mouseY; 

window.addEventListener('mousemove', function(event) {

	mouseX = event.x;
	mouseY = event.y;

});

function Circle(x, y, dx, dy, radius) {

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.brightness = 0;

	this.draw = function() {
		var distance = Math.max((Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2))/1000, 1);
		if (distance < 600) {
			this.brightness = Math.floor(Math.max(this.brightness, 255/distance));
		}
		if (this.brightness > 15) {
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			context.fillStyle = 'rgb(0, ' + this.brightness + ', ' + this.brightness + ')';
			context.fill();
		}
	}

	this.update = function() {
		
		if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
			this.dx = -this.dx;
		}
		
		if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;
		
		if (this.brightness > 0) {
			this.brightness = Math.floor(this.brightness * .97);
		}
	}

}

var circles = [];

var circleCount = 5000;

for (var i = 0; i < circleCount; i++) {

	var radius = Math.random() + 2;
	var x = Math.random() * (innerWidth - 2 * radius) + radius;
	var y = Math.random() * (innerHeight - 2 * radius) + radius;
	var dx = (Math.random() - 0.5) * 2;
	var dy = (Math.random() - 0.5) * 2;
	circles.push(new Circle(x, y, dx, dy, radius));

}

function animate() {

	context.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < circleCount; i++) {
		circles[i].update();
		circles[i].draw();
	}

	requestAnimationFrame(animate);

}

animate();


