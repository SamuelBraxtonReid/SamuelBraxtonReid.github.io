var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

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
}

var circleCount = 128;
var radii = [];
var circles = [];

for (var i = 0; i < circleCount; i++) {
  radii.push((Math.random() + 0.5) * 6);
}
radii.sort();

for (var i = 0; i < circleCount; i++) {
  var radius = radii[i];
  var x = Math.random() * (innerWidth - 2 * radius) + radius;
  var y = Math.random() * (innerHeight - 2 * radius) + radius;
  var dx = (Math.random() - 0.5) * 2;
  var dy = (Math.random() - 0.5) * 2;
  circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleCount; i++) {
    circles[i].x += circles[i].dx; 
    if (circles[i].x <= radii[i]) {
      circles[i].x == radii[i];
      circles[i].dx *= -1;
    } else if (circles[i].x >= window.innerWidth - radii[i]) {
    circles[i].x = window.innerWidth - radii[i]; 
    circles[i].dx *= -1;
    }
    circles[i].y += circles[i].dy;
    if (circles[i].y <= radii[i]) {
      circles[i].y == radii[i];
      circles[i].dy *= -1;
    } else if (circles[i].y >= window.innerHeight - radii[i]) {
    circles[i].y = window.innerHeight - radii[i]; 
    circles[i].dy *= -1;
    }
    var distance = Math.max((Math.pow(circles[i].x - mouseX, 2) + Math.pow(circles[i].y - mouseY, 2)) / 1000, 1);
    if (distance < 600) {
      circles[i].brightness = Math.floor(Math.max(circles[i].brightness, 255 / distance));
    }
    if (circles[i].brightness > 5) {
      context.beginPath();
      context.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2, false);
      //context.fillStyle = 'rgb(0, ' + circles[i].brightness + ', 0)';
      let r = circles[i].brightness * 3;
      let g = r - 255;
      let b = r - 510;
      r = Math.min(r, 255);
      g = Math.max(Math.min(g, 255), 0);
      b = Math.max(b, 0);
      context.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      context.fill();
    }
    if (circles[i].brightness > 0) {
      circles[i].brightness = Math.floor(circles[i].brightness * .97);
    }
  }

  requestAnimationFrame(animate);

}

animate();

