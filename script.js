const audio = document.getElementById('bgAudio');
const soundBtn = document.getElementById('soundBtn');
const label = soundBtn.querySelector('.label');
const unlockEvents = ['click', 'keydown', 'touchstart'];

function updateButton() {
  const muted = audio.muted || audio.paused;
  soundBtn.classList.toggle('muted', muted);
  soundBtn.setAttribute('aria-pressed', String(muted));
  soundBtn.setAttribute('aria-label', muted ? 'Unmute background sound' : 'Mute background sound');
  label.textContent = muted ? 'Sound off' : 'Sound on';
}

// Autoplay on load; if the browser blocks it, start on the first interaction
function startAudio() {
  audio.play().then(updateButton).catch(() => {});
  unlockEvents.forEach(e => document.removeEventListener(e, startAudio));
}
audio.play().then(updateButton).catch(() => {
  updateButton();
  unlockEvents.forEach(e => document.addEventListener(e, startAudio));
});

// Mute / unmute button
soundBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (audio.paused) {
    audio.muted = false;
    audio.play().then(updateButton).catch(() => {});
  } else {
    audio.muted = !audio.muted;
  }
  updateButton();
});

audio.addEventListener('play', updateButton);
audio.addEventListener('pause', updateButton);
updateButton();
