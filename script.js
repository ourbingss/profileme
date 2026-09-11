// Deklarasi Elemen DOM
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const soundWave = document.getElementById('sound-wave');
const currentTimeEl = document.getElementById('current-time');

// Batas durasi maksimal pemutaran (disesuaikan jadi 90 detik atau 1 menit 30 detik sesuai teks asli)
const maxDuration = 90; 

// Fungsi pembantu format detik ke 00:00
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Toggle Play / Pause Lagu dengan penanganan Promise
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      playIcon.classList.replace('fa-play', 'fa-pause');
      if (soundWave) soundWave.classList.add('playing');
    }).catch(error => {
      console.error("Gagal memutar audio. Periksa path file atau interaksi browser:", error);
    });
  } else {
    audio.pause();
    playIcon.classList.replace('fa-pause', 'fa-play');
    if (soundWave) soundWave.classList.remove('playing');
  }
});

// Update Progress Bar & Teks Waktu
audio.addEventListener('timeupdate', () => {
  // Update tampilan teks menit & detik
  if (currentTimeEl) {
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
  
  // Persentase progress bar berdasarkan maxDuration
  const progress = (audio.currentTime / maxDuration) * 100;
  if (progressBar) {
    progressBar.value = Math.min(progress, 100);
  }
  
  // Jika lagu mencapai batas maksimal, otomatis pause dan reset ke awal
  if (audio.currentTime >= maxDuration) {
    audio.pause();
    audio.currentTime = 0;
    playIcon.classList.replace('fa-pause', 'fa-play');
    if (soundWave) soundWave.classList.remove('playing');
  }
});

// Navigasi Progress Bar saat ditarik/digerakkan
if (progressBar) {
  progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * maxDuration;
  });
}