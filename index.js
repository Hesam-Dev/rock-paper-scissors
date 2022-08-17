"use strict";

const playBtns = document.querySelectorAll(".play_btns");
const scoreEl = document.querySelector(".score_number");
const rulesBtn = document.querySelector(".box_btn_rules");
const overlayEl = document.querySelector(".overlay");
const modalEl = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close_modal");
const pickEl = document.querySelector(".pick");
const playEl = document.querySelector(".play");
const resultEl = document.querySelector(".result");

let userSelected;
let computerSelected;
let options = ["rock", "paper", "scissors"];
let gameMessage;
let score = 0;
scoreEl.textContent = 0;
// MODAL

// function showing modal
function showModal(e) {
  overlayEl.classList.remove("hidden");
  modalEl.classList.remove("hidden");
}
// function close modal
function closeModal() {
  overlayEl.classList.add("hidden");
  modalEl.classList.add("hidden");
}
// showing modal event listener
rulesBtn.addEventListener("click", showModal);
// closing modal event listener
btnCloseModal.addEventListener("click", closeModal);

// PLAYING GAME

function checkWinner(user, computer) {
  if (user === computer) {
    gameMessage = "Tie";
  } else if (user === "scissors" && computer === "paper") {
    gameMessage = "You win";
  } else if (user === "paper" && computer === "rock") {
    gameMessage = "You win";
  } else if (user === "rock" && computer === "scissors") {
    gameMessage = "You win";
  } else {
    gameMessage = "You lose";
  }
}

function displayResult(html) {
  resultEl.insertAdjacentHTML("beforeend", html);

  // make computer result visible
  setTimeout(() => {
    document.querySelector(".placeholder").classList.remove("placeholder");
    document.querySelector(".com").classList.remove("com");
  }, 2000);

  // display winner message
  setTimeout(() => {
    document.querySelector(".message").classList.add("mm");
    if (gameMessage.toLowerCase() === "you win") {
      score++;
      scoreEl.textContent = score;
      localStorage.setItem("dscore", JSON.stringify(score));
    } else if (gameMessage.toLowerCase() === "you lose") {
      document.querySelector(".btn_play-again").style.color = "red";
    }
  }, 2350);
}

function userPlays(e) {
  const target = e.target.closest(".play_btns");
  userSelected = target.dataset.type;

  const randomNumber = Math.round(Math.random() * 2);
  computerSelected = options[randomNumber];

  pickEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  checkWinner(userSelected, computerSelected);

  const html = `
  <div class="user">
    <h2>You picked</h2>
    <div class="play_btns btn_${userSelected}" data-type="${userSelected}">
      <div class="img_container">
        <img
          src="images/icon-${userSelected}.svg"
          class="img-${userSelected}"
          alt="${userSelected} icon"
        />
      </div>
    </div>
  </div>
  <div class="message">
    <h1 class="result_message">${gameMessage}</h1>
    <button class="btn_play-again">Play again</button>
  </div>
  <div class="computer">
  <h2>computer picked</h2>
  <div class="play_btns btn_${computerSelected} placeholder" data-type="${computerSelected}">
    <div class="img_container com">
      <img
        src="images/icon-${computerSelected}.svg"
        class="img-${computerSelected}"
        alt="${computerSelected} icon"
      />
    </div>
   </div>
  </div>
  `;

  displayResult(html);
}

function playAgain(e) {
  if (!e.target.classList.contains("btn_play-again")) return;

  userSelected = "";
  computerSelected = "";
  gameMessage = "";

  pickEl.classList.remove("hidden");
  resultEl.innerHTML = "";
  resultEl.classList.add("hidden");
}
function handleScore() {
  const dScore = localStorage.getItem("dscore");
  if(!dScore) return;
  score = +dScore
  scoreEl.textContent = dScore;
}

playBtns.forEach((btn) => btn.addEventListener("click", userPlays));
document.addEventListener("click", playAgain);
window.addEventListener("load", handleScore);
