const normalPin = "1234";
const duressPin = "9999";
let currentPin = "";
let batteryLevel = 18;

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

function pressPin(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    updateDots();
  }
}

function clearPin() {
  currentPin = currentPin.slice(0, -1);
  updateDots();
}

function updateDots() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`dot${i}`);
    if (i <= currentPin.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  }
}

function submitPin() {
  const message = document.getElementById("message");

  if (currentPin === normalPin) {
    message.textContent = "Unlock successful";
    setTimeout(() => {
      currentPin = "";
      updateDots();
      message.textContent = "";
      showScreen("homeScreen");
    }, 600);
  } else if (currentPin === duressPin) {
    currentPin = "";
    updateDots();
    localStorage.clear();
    showScreen("wipeScreen");
  } else {
    message.textContent = "Wrong PIN";
    currentPin = "";
    updateDots();
  }
}

function lockDevice() {
  currentPin = "";
  updateDots();
  showScreen("lockScreen");
}

function resetDemo() {
  currentPin = "";
  updateDots();
  showScreen("lockScreen");
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function toggleNotifications() {
  document.getElementById("notificationPanel").classList.toggle("hidden");
}

function toggleAppDrawer() {
  document.getElementById("appDrawer").classList.toggle("hidden");
}

function acceptCall() {
  document.getElementById("callStatus").textContent = "Call connected securely";
}

function rejectCall() {
  document.getElementById("callStatus").textContent = "Call rejected";
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

function updateBattery() {
  batteryLevel--;
  if (batteryLevel < 15) {
    batteryLevel = 100;
  }

  document.getElementById("batteryText").textContent = batteryLevel + "%";
  document.getElementById("batteryFill").style.width = batteryLevel + "%";

  if (batteryLevel > 50) {
    document.getElementById("batteryFill").style.background = "#22c55e";
  } else if (batteryLevel > 20) {
    document.getElementById("batteryFill").style.background = "#f59e0b";
  } else {
    document.getElementById("batteryFill").style.background = "#ef4444";
  }
}

function bootSequence() {
  let progress = 0;
  const bootBar = document.getElementById("bootProgress");

  const bootInterval = setInterval(() => {
    progress += 10;
    bootBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(bootInterval);
      showScreen("lockScreen");
    }
  }, 250);
}

updateClock();
setInterval(updateClock, 1000);
setInterval(updateBattery, 3000);
bootSequence();