//https://www.youtube.com/watch?v=lsP_ZVtlySc&ab_channel=Codegrid
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let mouseMoved = false;

const pointer = {
  x: 0.5 * window.innerWidth,
  y: 0.5 * window.innerHeight,
};

const params = {
  pointsNumber: 10,
  widthFactor: 5,
  mouseThreshold: 0.5,
  spring: 0.25,
  friction: 0.5,
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
  trail[i] = {
    x: pointer.x,
    y: pointer.y,
    dx: 0,
    dy: 0,
  };
}

window.addEventListener("click", (e) => {
  updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("mousemove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", (e) => {
  mouseMoved = true;
  updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
  pointer.x = eX;
  pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);

function update(t) {
  if (!mouseMoved) {
    pointer.x =
      (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
      window.innerWidth;
    pointer.y =
      (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
      window.innerHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trail.forEach((p, pIdx) => {
    const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
    const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
    p.dx += (prev.x - p.x) * spring;
    p.dy += (prev.y - p.y) * spring;
    p.dx *= params.friction;
    p.dy *= params.friction;
    p.x += p.dx;
    p.y += p.dy;
  });

  var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(204, 51, 255, 1");
  gradient.addColorStop(0.5, "rgba(255,255,255, 1");
  gradient.addColorStop(1, "rgba(77, 104, 240, 1");

  ctx.strokeStyle = gradient;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);
  for (let i = 1; i < trail.length - 1; i++) {
    const xc = 0.5 * (trail[i].x + trail[i + 1].x);
    const yc = 0.5 * (trail[i].y + trail[i + 1].y);
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
    ctx.lineWidth = params.widthFactor * (params.pointsNumber - 1);
    ctx.stroke();
  }

  ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
  ctx.stroke();

  window.requestAnimationFrame(update);
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function toRandomPage() {
  const allPages = [
    "heartbeat.html",
    "question.html",
    "shimmer.html",
    "june-2021.html",
    "bathroom.html",
    "auntie.html",
    "zora.html",
    "tomato-mart.html",
    "buzzcut-girl.html",
    "queen.html",
    "breakfast-club.html",
    "offski-leaned-in.html",
  ];

  const randomIndex = Math.floor(Math.random() * allPages.length);
  window.location.href = allPages[randomIndex];
}
