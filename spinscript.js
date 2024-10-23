const sectors = [
  { color: "#003366", text: "#ffffff", label: "Union Legislature", articles: ["Article 1A", "Article 1B", "Article 1C"] },
  { color: "#3399ff", text: "#ffffff", label: "State Legislature", articles: ["Article 2A", "Article 2B", "Article 2C"] },
  { color: "#003366", text: "#ffffff", label: "Union Judiciary", articles: ["Article 3A", "Article 3B", "Article 3C"] },
  { color: "#3399ff", text: "#ffffff", label: "State Judiciary", articles: ["Article 4A", "Article 4B", "Article 4C"] },
  { color: "#003366", text: "#ffffff", label: "Union Legislature", articles: ["Article 1A", "Article 1B", "Article 1C"] },
  { color: "#3399ff", text: "#ffffff", label: "State Legislature", articles: ["Article 2A", "Article 2B", "Article 2C"] },
  { color: "#003366", text: "#ffffff", label: "Union Judiciary", articles: ["Article 3A", "Article 3B", "Article 3C"] },
  { color: "#3399ff", text: "#ffffff", label: "State Judiciary", articles: ["Article 4A", "Article 4B", "Article 4C"] },
];

const events = {
  listeners: {},
  addListener: function (eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  },
  fire: function (eventName, ...args) {
    if (this.listeners[eventName]) {
      for (let fn of this.listeners[eventName]) {
        fn(...args);
      }
    }
  },
};

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

let spinButtonClicked = false;

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();

  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();

  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = sector.text;
  ctx.font = "bold 30px 'Lato', sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);

  ctx.restore();
}

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

  if (!angVel) {
    spinEl.textContent = "SPIN";
    spinEl.style.background = "#003366";
    spinEl.style.color = "#ffffff";
  } else {
    spinEl.textContent = "?";
    spinEl.style.background = "#003366";
    spinEl.style.color = "#ffffff";
  }
}

function frame() {
  // Fire an event after the wheel has stopped spinning
  if (!angVel && spinButtonClicked) {
    const finalSector = sectors[getIndex()];
    events.fire("spinEnd", finalSector);
    spinButtonClicked = false; // reset the flag
    return;
  }

  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function getRandomArticle(articles) {
  const randomIndex = Math.floor(Math.random() * articles.length);
  return articles[randomIndex];
}

function showPopup(article) {
  const popup = document.querySelector(".popup");
  const popupContent = popup.querySelector(".popup-content");
  popupContent.textContent = `Random Article: ${article}`;
  popup.classList.add("active");
}

function closePopup() {
  document.querySelector(".popup").classList.remove("active");
}

function init() {
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  spinEl.addEventListener("click", () => {
    if (!angVel) angVel = rand(0.25, 0.45);
    spinButtonClicked = true;
  });
}

init();

events.addListener("spinEnd", (sector) => {
  const randomArticle = getRandomArticle(sector.articles);
  showPopup(randomArticle);
});



