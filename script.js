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
    message.textContent = "";
    showScreen("homeScreen");
  } else if (input === duressPassword) {
    message.textContent = "";
    localStorage.clear();
    showScreen("wipeScreen");
  } else {
    message.textContent = "Wrong password";
  }

  document.getElementById("passwordInput").value = "";
}

function lockDevice() {
  showScreen("lockScreen");
}

function resetDemo() {
  showScreen("lockScreen");
}