let progress = Math.min(Math.max(-rect.top / (window.innerHeight * 2), 0), 1);
// --- 1. NAVIGATION & UI ---
function scrollToRegister() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function toggleProfile() {
    const modal = document.getElementById('user-profile-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function toggleParty() {
    const container = document.getElementById('party-effects-container');
    document.body.classList.toggle('party-mode-active');
    if (document.body.classList.contains('party-mode-active')) {
        container.innerHTML = '<div class="confetti"></div>'; // Add your CSS animations here
        console.log("Party Mode: ON");
    } else {
        container.innerHTML = '';
    }
}

// --- 2. CHAT & REVIEWS ---
function handleEnter(event, callback) {
    if (event.key === 'Enter') {
        callback();
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const display = document.getElementById('chat-display');
    if (input.value.trim() !== "") {
        const msg = document.createElement('p');
        msg.innerHTML = `<strong>You:</strong> ${input.value}`;
        display.appendChild(msg);
        input.value = "";
        display.scrollTop = display.scrollHeight;
    }
}

function postReview() {
    const text = document.getElementById('rev-text');
    const display = document.getElementById('reviews-display');
    if (text.value.trim() !== "") {
        const review = document.createElement('div');
        review.className = 'review-card';
        review.innerHTML = `<strong style="color:#00FFFF;">User_${Math.floor(Math.random()*100)}:</strong><p>${text.value}</p>`;
        display.prepend(review);
        text.value = "";
    }
}

// --- 3. GAMES ---
let score = 0;
function increaseScore() {
    score++;
    document.getElementById('score').innerText = score;
}

// --- 4. REGISTRATION ---
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username-signup').value;
    alert(`Welcome to the Club, ${username}! Your vault key is ready.`);
    // Logic to save to Firebase 'db' would go here
}

// --- 5. MUSIC PLAYER ---
function playMusic(input) {
    const playerArea = document.getElementById('music-player-area');
    if (input.files && input.files[0]) {
        const url = URL.createObjectURL(input.files[0]);
        playerArea.innerHTML = `<audio controls autoplay src="${url}" style="width:100%; margin-top:10px;"></audio>`;
    }
}
// --- 1. FIREBASE INITIALIZATION ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9Bb3ySLVKdlsrMmJD_iGFw2cbCplxFbI",
  authDomain: "fresh-entertainment.firebaseapp.com",
  projectId: "fresh-entertainment",
  storageBucket: "fresh-entertainment.firebasestorage.app",
  messagingSenderId: "394515293409",
  appId: "1:394515293409:web:9a8d47e04e515b660a83a0",
  measurementId: "G-5KSB33VJR6"
};

// Start the engine
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// Function to test the database connection
async function testDatabaseWrite() {
  try {
    const testRef = doc(db, "connection_tests", "test_id_001");
    await setDoc(testRef, {
      status: "Successful",
      timestamp: new Date().toISOString(),
      message: "Fresh Entertainment is officially connected to Firestore!"
    });
    console.log("SUCCESS: Test data written to Firestore!");
    alert("Database connection verified!");
  } catch (error) {
    console.error("ERROR writing to database:", error);
  }
async function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('username-signup').value;
  
  if (username) {
    try {
      // Save to Database
      await setDoc(doc(db, "users", username), {
        username: username,
        joinedAt: serverTimestamp(),
        points: 0,
        rank: "ROOKIE"
      });
      
      localStorage.setItem('freshUser', username);
      alert('WELCOME TO THE CLUB, ' + username + '. Data synced to Cloud.');
      document.getElementById('joinForm').reset();
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  }
}

// Run the test after a short delay to ensure Firebase is ready
setTimeout(() => {
  testDatabaseWrite();
}, 2000);
// --- USER ICON SCROLL ---
<div id="user-profile-modal" class="profile-modal">
  <div class="profile-card">
    <span class="close-profile" onclick="toggleProfile()">×</span>
    <div class="profile-header">
      <img id="p-img" src="https://i.pravatar.cc/150?u=fresh" alt="User">
        <h2 id="p-name">Guest</h2>
        <div class="rank-badge" id="p-rank">ROOKIE</div>
    </div>
    <div class="profile-stats">
      <div><strong id="p-points">0</strong><span>Points</span></div>
      <div><strong>12</strong><span>Friends</span></div>
      <div><strong>45</strong><span>Likes</span></div>
    </div>
    <div class="profile-actions">
      <button onclick="editProfile()">Edit Details</button>
      <button onclick="addFriend()">Add Friend</button>
      <button onclick="likeUser()">Give Like ❤️</button>
    </div>
    <div class="profile-bio">
      <h3>About Me</h3>
      <p id="p-bio" contenteditable="false">Just here for the Fresh vibes. Music lover and gamer.</p>
    </div>
  </div>
</div>

// --- 2. GLOBAL ENTER KEY HANDLER ---
// Pass the event and the function to call
function handleEnter(event, callback) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default new line in textarea
    callback();
  }
}

// --- 3. VAULT ACCESS LOGIC ---
function enterVault(event) {
  event.preventDefault(); // Handles Enter Key Natively via form submit
  const keyInput = document.getElementById('vault-key').value.trim();
  const panel = document.getElementById('vault-panel');
  const storedUser = localStorage.getItem('freshUser');

  if ((storedUser && keyInput === storedUser) || keyInput === "FRESH2026") {
    panel.classList.add('unlocked');
    document.getElementById('vault-text').innerText = "🔓 ACCESS GRANTED";
    document.getElementById('vault-text').style.color = "#00ff00";
    panel.style.boxShadow = "0 0 100px #00ff00";

    setTimeout(() => {
      window.location.href = "THE_VAULT.html";
    }, 1500);
  } else {
    panel.style.animation = "shake 0.5s";
    setTimeout(() => panel.style.animation = "", 500);
    alert("ACCESS DENIED. PLEASE REGISTER IN THE 'JOIN THE CLUB' SECTION FIRST.");
  }
}

// --- 4. PARTY MODE EXTRAS ---
let partyInterval;
let mouseListener;

function toggleParty() {
  const body = document.body;
  body.classList.toggle('party-mode');

  const container = document.getElementById('party-emojis');

  if (body.classList.contains('party-mode')) {

    // Feature 1: Neon Mouse Trail
    mouseListener = document.addEventListener('mousemove', function (e) {
      let dot = document.createElement('div');
      dot.className = 'trail-dot';
      dot.style.left = e.pageX + 'px';
      dot.style.top = e.pageY + 'px';
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    });

    // Feature 2: Emojis inside Mirror Box
    partyInterval = setInterval(() => {
      const emoji = document.createElement('div');
      emoji.innerText = ['🔥', '⚡', '🎵', '💿', '💃', '🕺'][Math.floor(Math.random() * 6)];
      emoji.className = 'float-emoji';
      emoji.style.left = Math.random() * 100 + '%';
      container.appendChild(emoji);
      setTimeout(() => emoji.remove(), 4000);
    }, 500);

  } else {
    // Cleanup
    clearInterval(partyInterval);
    container.innerHTML = '';
    document.removeEventListener('mousemove', mouseListener);
  }
}

// --- 5. SECTIONS NAVIGATION ---
function openSection(sectionId) {
  const sections = document.querySelectorAll('.app-section');
  sections.forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 6. INTERACTIVE FEATURES ---

// Chat
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const username = localStorage.getItem('freshUser') || "Guest";
  
  if (input.value.trim() !== "") {
    await addDoc(collection(db, "global_chat"), {
      user: username,
      text: input.value,
      time: serverTimestamp()
    });
    input.value = '';
    // Note: You'll need a "listener" to display messages in real-time
  }
}

// Clicker
let score = 0;
function increaseScore() {
  score++;
  document.getElementById('score').innerText = score;
}

// Music
function playMusic(input) {
  const playerArea = document.getElementById('music-player-area');
  if (input.files && input.files[0]) {
    const audioUrl = URL.createObjectURL(input.files[0]);
    playerArea.innerHTML = `<audio controls autoplay src="${audioUrl}" style="width:100%"></audio>`;
  }
}

// TikTok Upload
function uploadToFeed(input) {
  if (input.files && input.files[0]) {
    const feed = document.getElementById('main-feed');
    const file = input.files[0];
    const url = URL.createObjectURL(file);

    const newItem = document.createElement('div');
    newItem.className = 'feed-item';
    newItem.innerHTML = `
      <video src="${url}" loop autoplay onclick="this.paused ? this.play() : this.pause()"></video>
      <p class="vid-caption">@User_Upload #FreshEnt</p>
    `;
    feed.prepend(newItem);
  }
}

// --- 7. GAMES (CYAN Updated) ---

// TTT
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const boardEl = document.getElementById('ttt-board');

function createTTT() {
  if (!boardEl) return;
  boardEl.innerHTML = "";
  tttBoard.forEach((cell, i) => {
    const div = document.createElement('div');
    div.style = "background: #111; border: 1px solid #00FFFF; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #00FFFF; cursor: pointer; text-shadow: 0 0 10px #00FFFF;";
    div.innerText = cell;
    div.onclick = () => {
      if (tttBoard[i] === "") {
        tttBoard[i] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        createTTT();
      }
    };
    boardEl.appendChild(div);
  });
}
function resetTTT() { tttBoard = ["", "", "", "", "", "", "", "", ""]; createTTT(); }
createTTT();

// Jump Game
let isJumping = false;
let jumpScore = 0;
function startJumpGame() {
  const player = document.getElementById('player');
  const obstacle = document.getElementById('obstacle');

  if (!player || !obstacle) return;

  obstacle.style.animation = "moveObstacle 1.5s infinite linear";

  document.addEventListener('keydown', (e) => {
    if (e.code === "Space") jump();
  });

  const checkDead = setInterval(() => {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Approx collision
    if (obstacleLeft < 80 && obstacleLeft > 50 && playerBottom < 40) {
      alert("GAME OVER! Score: " + jumpScore);
      obstacle.style.animation = "none";
      jumpScore = 0;
      document.getElementById('jump-score').innerText = "Score: 0";
    } else if (obstacleLeft < 0) {
      jumpScore++;
      document.getElementById('jump-score').innerText = "Score: " + Math.floor(jumpScore / 10);
    }
  }, 10);
}

function jump() {
  if (isJumping) return;
  const player = document.getElementById('player');
  isJumping = true;
  player.style.transition = "0.3s";
  player.style.bottom = "100px";
  setTimeout(() => {
    player.style.bottom = "0";
    setTimeout(() => { isJumping = false; }, 300);
  }, 300);
}

// Add keyframes for obstacle
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes moveObstacle {
    0% { right: -50px; }
    100% { right: 100%; }
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  }
`;
document.head.appendChild(styleSheet);

// Scroll Events
function scrollEvents(direction) {
  const slider = document.getElementById('event-slider');
  slider.scrollBy({ left: direction * 150, behavior: 'smooth' }); // Adjusted for shorter box
    let progress = Math.min(Math.max(-rect.top / (window.innerHeight * 2), 0), 1);
}
// Post Review
function postReview() {
  const text = document.getElementById('rev-text').value;
  const list = document.getElementById('reviews-display');
  const username = localStorage.getItem('freshUser') || "Fresh_Guest";

  if (text) {
    const div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `<strong style="color:#00FFFF;">${username}:</strong> <p>${text}</p>`;
    list.prepend(div);
    document.getElementById('rev-text').value = '';
  }
}
