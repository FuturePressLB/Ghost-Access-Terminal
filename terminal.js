const terminal = document.getElementById("terminal");
const statusText = document.getElementById("statusText");

/* ---------------- LOGIN ---------------- */

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  if (user === "admin" && pass === "admin123") {
    document.getElementById("loginScreen").style.display = "none";
    document.querySelector(".terminal-container").style.display = "flex";
    boot();
  } else {
    error.textContent = "ACCESS DENIED";
  }
}

/* ---------------- BOOT ---------------- */

const bootLines = [
  "Initializing system...",
  "Connecting to secure server...",
  "Bypassing firewall...",
  "Access granted."
];

let index = 0;

function typeLine(text, cb) {
  const p = document.createElement("p");
  terminal.appendChild(p);

  let i = 0;

  function type() {
    if (i < text.length) {
      p.textContent += text[i++];
      setTimeout(type, Math.random() * 50 + 20);
    } else {
      scroll();
      setTimeout(() => cb && cb(), 400);
    }
  }

  type();
}

function boot() {
  if (index < bootLines.length) {
    typeLine(bootLines[index++], boot);
  } else {
    showInput();
  }
}

/* ---------------- INPUT ---------------- */

function showInput() {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <span class="command">guest@ghostsys:~$</span>
    <input autocomplete="off" spellcheck="false"
      style="background:none;border:none;outline:none;color:#00ff88;font-family:monospace;" />
  `;

  terminal.appendChild(wrapper);

  const input = wrapper.querySelector("input");
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const val = input.value.trim().toLowerCase();
    if (!val) return;

    printCommand(val);
    handleCommand(val);

    wrapper.remove();
  });
}

function printCommand(val) {
  const line = document.createElement("p");
  line.innerHTML = `<span class="command">guest@ghostsys:~$</span> ${val}`;
  terminal.appendChild(line);
  scroll();
}

function scroll() {
  terminal.scrollTop = terminal.scrollHeight;
}

/* ---------------- COMMAND ENGINE ---------------- */

function handleCommand(cmd) {
  switch (cmd) {

    case "help":
      showHelp();
      break;

    case "about":
      typeLine("Ghost Terminal v1.0 - experimental system", showInput);
      break;

    case "clear":
      terminal.innerHTML = "";
      showInput();
      break;

    case "ls":
      fakeLS();
      break;

    case "projects":
      showProjects();
      break;

    case "hack":
      hackMode();   // 👈 UPDATED GAME MODE
      break;

    case "shadow":
      shadowIntro();
      break;

    case "matrix":
      matrixEvent();
      break;

    default:
      typeLine("Command not found.", showInput);
  }
}

/* ---------------- HELP ---------------- */

function showHelp() {
  const cmds = [
    "help - list commands",
    "about - system info",
    "ls - show files",
    "projects - show projects",
    "hack - hacking simulation GAME",
    "shadow - shadow encounter",
    "matrix - trigger system event",
    "clear - clear terminal"
  ];

  let i = 0;

  function next() {
    if (i >= cmds.length) return showInput();
    typeLine(cmds[i++], next);
  }

  next();
}

/* ---------------- FAKE FILE SYSTEM ---------------- */

function fakeLS() {
  const files = ["projects/", "logs/", "shadow/", "system.cfg"];

  let i = 0;

  function next() {
    if (i >= files.length) return showInput();
    typeLine(files[i++], next);
  }

  next();
}

/* ---------------- PROJECTS ---------------- */

function showProjects() {
  const items = [
    "1. Ghost Terminal UI",
    "2. Matrix Engine",
    "3. Shadow Protocol (locked)"
  ];

  let i = 0;

  function next() {
    if (i >= items.length) return showInput();
    typeLine(items[i++], next);
  }

  next();
}

let hackListener = null;

/* ---------------- 🔥 HACK GAME (UPGRADED UI VERSION) ---------------- */

function hackMode() {
  typeLine("Initializing hack sequence...", () => {
    runHackStage(1);
  });
}

/* ---------------- CORE GAME ---------------- */

function runHackStage(stage) {
  const sizes = [6, 8, 10];
  const count = sizes[stage - 1];

  const keysList = ["a", "w", "s", "d", "1"];
  let requiredKeys = generateKeys(count, keysList);
  let progress = 0;

  if (hackListener) {
    document.removeEventListener("keydown", hackListener);
  }

  showPopups();

  /* ---------------- MODAL ---------------- */

  const modal = document.createElement("div");
  modal.className = "hack-modal";

  const title = document.createElement("p");
  title.textContent = `STAGE ${stage}`;
  title.style.color = "#00ff88";
  title.style.fontWeight = "bold";

  const keysBox = document.createElement("div");

  const progressText = document.createElement("p");
  progressText.textContent = `0 / ${count}`;

  /* ---------------- TIMER ---------------- */

  const timer = document.createElement("div");
  timer.className = "hack-timer";

  const fill = document.createElement("div");
  fill.className = "hack-timer-fill";

  timer.appendChild(fill);

  modal.appendChild(title);
  modal.appendChild(keysBox);
  modal.appendChild(progressText);
  modal.appendChild(timer);

  document.body.appendChild(modal);

  renderKeys();

  function renderKeys() {
    keysBox.innerHTML = "";

    requiredKeys.forEach((k) => {
      const el = document.createElement("span");
      el.textContent = k.toUpperCase();
      el.className = "hack-key";
      keysBox.appendChild(el);
    });
  }

  /* ---------------- TIMER LOGIC (10 sec) ---------------- */

  let timeLeft = 10;
fill.style.width = "100%";

const timerInterval = setInterval(() => {
  timeLeft -= 0.1;

  const percent = (timeLeft / 10) * 100;
  fill.style.width = percent + "%";

  /* 🟢 SAFE */
  if (timeLeft > 3) {

    fill.style.background = "#00ff88";

    modal.style.border = "2px solid #00ff88";
    modal.style.boxShadow = "0 0 15px #00ff88";

    modal.style.animation = "";

  }

  /* 🟠 WARNING */
  else if (timeLeft > 2) {

    fill.style.background = "orange";

    modal.style.border = "2px solid orange";
    modal.style.boxShadow = "0 0 20px orange";

  }

  /* 🔴 DANGER */
  else if (timeLeft > 1) {

    fill.style.background = "red";

    modal.style.border = "2px solid red";
    modal.style.boxShadow = "0 0 30px red";

  }

  /* 🚨 PANIC */
  else {

    fill.style.background = "red";

    modal.style.border = "2px solid red";
    modal.style.boxShadow = "0 0 40px red";

    modal.style.animation = "shake 0.15s infinite";

  }

  if (timeLeft <= 0) {

    clearInterval(timerInterval);

    document.removeEventListener("keydown", hackListener);

    modal.remove();

    typeLine("TIME FAILED - SYSTEM LOCKED", showInput);

  }

}, 100);

  /* ---------------- KEY LISTENER ---------------- */

  hackListener = function (e) {
    const key = e.key.toLowerCase();

    if (!["a", "w", "s", "d", "1"].includes(key)) return;

    const index = requiredKeys.indexOf(key);

    if (index === -1) {
      modal.style.border = "1px solid red";
      setTimeout(() => (modal.style.border = "1px solid #00ff88"), 120);
      return;
    }

    requiredKeys.splice(index, 1);
    progress++;

    progressText.textContent = `${progress} / ${count}`;

    renderKeys();

    if (progress >= count) {
      clearInterval(timerInterval);
      document.removeEventListener("keydown", hackListener);

      modal.remove();

      if (stage < 3) {
        typeLine(`Stage ${stage} complete...`, () => {
          runHackStage(stage + 1);
        });
      } else {
        typeLine("SYSTEM BREACH COMPLETE", showInput);
      }
    }
  };

  document.addEventListener("keydown", hackListener);
}


/* ---------------- RANDOM POPUPS ---------------- */

function showPopups() {
  const messages = [
    "SYSTEM WARNING",
    "FIREWALL BREACH",
    "TRACE DETECTED",
    "UNKNOWN ACCESS",
    "SECURITY OVERRIDE"
  ];

  let shown = 0;

  function popup() {
    if (shown >= 3) return;

    const msg = messages[Math.floor(Math.random() * messages.length)];

    const div = document.createElement("div");
    div.textContent = msg;
    div.style.position = "fixed";
    div.style.top = Math.random() * 80 + "%";
    div.style.left = Math.random() * 80 + "%";
    div.style.padding = "10px";
    div.style.border = "1px solid red";
    div.style.color = "red";
    div.style.background = "black";
    div.style.zIndex = 9999;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 1200);

    shown++;
    setTimeout(popup, 900);
  }

  popup();
}

/* ---------------- KEY GENERATOR ---------------- */

function generateKeys(count, list) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(list[Math.floor(Math.random() * list.length)]);
  }
  return arr;
}

/* ---------------- SHADOW STORY ---------------- */

function shadowIntro() {
  typeRedMessage("Shadow: You finally accessed me...", () => {
    typeRedMessage("Shadow: This system is unstable.", () => {
      typeRedMessage("Shadow: They are watching you.", showInput);
    });
  });
}

function typeRedMessage(text, cb) {
  const line = document.createElement("p");
  line.style.color = "red";
  line.style.textShadow = "0 0 10px red";
  terminal.appendChild(line);

  let i = 0;

  function type() {
    if (i < text.length) {
      line.textContent += text[i++];
      setTimeout(type, 40);
    } else {
      scroll();
      setTimeout(() => cb && cb(), 600);
    }
  }

  type();
}

/* ---------------- MATRIX EVENT ---------------- */

function matrixEvent() {
  statusText.textContent = "NOT SECURE";
  statusText.style.color = "red";
  statusText.style.textShadow = "0 0 10px red";

  typeRedMessage("Matrix protocol activated...", showInput);
}