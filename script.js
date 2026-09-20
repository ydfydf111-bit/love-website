const startBtn = document.getElementById("startBtn");
const envelope = document.getElementById("envelope");
const envelopeElement = envelope.querySelector(".envelope");
const againBtn = document.getElementById("againBtn");
const musicBtn = document.getElementById("musicBtn");


// ============================
// OPEN HEART
// ============================

startBtn.addEventListener("click", () => {

  document
    .getElementById("letterSection")
    .scrollIntoView({
      behavior: "smooth"
    });

});


// ============================
// ENVELOPE
// ============================

envelope.addEventListener("click", () => {

  envelopeElement.classList.toggle("open");

  if (envelopeElement.classList.contains("open")) {
    createHearts();
  }

});


// ============================
// OPEN AGAIN
// ============================

againBtn.addEventListener("click", () => {

  envelopeElement.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


// ============================
// FLOATING HEART
// ============================

function createHeart() {

  const heart = document.createElement("div");

  heart.className = "floating-heart";

  heart.innerHTML =
    Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.fontSize =
    10 + Math.random() * 20 + "px";

  const duration =
    4 + Math.random() * 5;

  document.body.appendChild(heart);

  const move =
    -100 + Math.random() * 200;

  heart.animate(
    [
      {
        transform:
          "translate(0,0) scale(.5) rotate(0deg)",
        opacity: 0
      },

      {
        transform:
          "translate(" +
          move / 2 +
          "px,-50vh) scale(1) rotate(180deg)",
        opacity: 1
      },

      {
        transform:
          "translate(" +
          move +
          "px,-110vh) scale(1.4) rotate(360deg)",
        opacity: 0
      }
    ],
    {
      duration: duration * 1000,
      easing: "linear"
    }
  );

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);

}


// ============================
// HEARTS
// ============================

function createHearts() {

  for (let i = 0; i < 20; i++) {

    setTimeout(
      createHeart,
      i * 100
    );

  }

  if (!window.heartLoop) {

    window.heartLoop = setInterval(() => {

      if (
        envelopeElement.classList.contains("open")
      ) {
        createHeart();
      }

    }, 500);

  }

}


// ============================
// SIMPLE LOVE SOUND
// ============================

let audioContext = null;
let musicPlaying = false;
let oscillator = null;

musicBtn.addEventListener("click", () => {

  if (!audioContext) {

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

  }

  if (!musicPlaying) {

    oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value =
      261.63;

    gain.gain.value =
      0.025;

    oscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );

    oscillator.start();

    musicPlaying = true;

  } else {

    if (oscillator) {

      oscillator.stop();

      oscillator = null;

    }

    musicPlaying = false;

  }

});
