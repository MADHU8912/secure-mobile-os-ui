const normalPassword = "1234";
const duressPassword = "9999";

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

function unlockDevice() {
  const input = document.getElementById("passwordInput").value;
  const message = document.getElementById("message");

  if (input === normalPassword) {
    message.textContent = "Unlock successful";
    setTimeout(() => {
      message.textContent = "";
      showScreen("homeScreen");
    }, 600);
  } else if (input === duressPassword) {
    message.textContent = "";
    localStorage.clear();
    showScreen("wipeScreen");
  } else {
    message.textContent = "Wrong password";
  }

  document.getElementById("passwordInput").value = "";
}

function swipeUnlock() {
  document.getElementById("message").textContent = "Swipe verified. Enter password to continue.";
}

function lockDevice() {
  showScreen("lockScreen");
}

function resetDemo() {
  showScreen("lockScreen");
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const date = now.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  document.getElementById("timeNow").textContent = time;
  document.getElementById("lockClock").textContent = time;
  document.getElementById("lockDate").textContent = date;
}

updateClock();
setInterval(updateClock, 1000);