const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 0.5,
    vy: Math.random() * 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((s) => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x > canvas.width) s.x = 0;
    if (s.y > canvas.height) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
    ctx.fill();

    stars.forEach(s2 => {
      let dx = s.x - s2.x;
      let dy = s.y - s2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(draw);
}

draw();

const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {
  document.body.classList.toggle("light");
};

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.onclick = () => {
  if (!playing) {
    music.play();
    musicBtn.innerText = "⏸";
  } else {
    music.pause();
    musicBtn.innerText = "🎵";
  }
  playing = !playing;
};

const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach(el => observer.observe(el));

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});