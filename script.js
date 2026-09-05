// Deklarasi Elemen DOM
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const soundWave = document.getElementById('sound-wave');
const heartBtn = document.getElementById('heart-btn');
const currentTimeEl = document.getElementById('current-time');
const likeButton = document.getElementById("likeButton");
const likeCount = document.getElementById("likeCount");
const likeNotification = document.getElementById("likeNotification");
// Batas durasi maksimal pemutaran (45 detik)
const maxDuration = 90; // 1 menit 30 detik dalam detik

// Fungsi pembantu format detik ke 00:00
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Toggle Play / Pause Lagu
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.replace('fa-play', 'fa-pause');
    soundWave.classList.add('playing');
  } else {
    audio.pause();
    playIcon.classList.replace('fa-pause', 'fa-play');
    soundWave.classList.remove('playing');
  }
});
// Update Progress Bar & Teks Waktu (Maksimal 45 Detik)
audio.addEventListener('timeupdate', () => {
  // Update tampilan teks menit & detik
  if (currentTimeEl) {
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
  // Persentase progress bar berdasarkan batas 45 detik
  const progress = (audio.currentTime / maxDuration) * 100;
  progressBar.value = Math.min(progress, 100);
  // Jika lagu mencapai batas 45 detik, otomatis pause dan reset ke awal
  if (audio.currentTime >= maxDuration) {
    audio.pause();
    audio.currentTime = 0;
    playIcon.classList.replace('fa-pause', 'fa-play');
    soundWave.classList.remove('playing');
  }
});
// Navigasi Progress Bar saat ditarik/digerakkan
progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * maxDuration;
});
// Toggle Like / Heart Button
heartBtn.addEventListener('click', () => {
  heartBtn.classList.toggle('active');
});


// Ambil data like dari localStorage
let likes = localStorage.getItem("likes") || 0;
let liked = localStorage.getItem("liked") === "true";

// Tampilkan jumlah like
likeCount.textContent = `${likes} Likes`;

// Jika sebelumnya sudah like
if (liked) {
    likeButton.classList.add("liked");
    likeButton.innerHTML = '<i class="fa-solid fa-heart"></i> Liked Me';
}

// Ketika tombol Like diklik
likeButton.addEventListener("click", function () {

    // Supaya satu orang tidak bisa like berkali-kali
    //if (!liked) {

      // likes++;
       //liked = true;

        // Simpan ke browser
        localStorage.setItem("likes", likes);
        localStorage.setItem("liked", "true");

        // Update tampilan
        likeCount.textContent = `${likes} Likes`;

        likeButton.classList.add("liked");
        likeButton.innerHTML = '<i class="fa-solid fa-heart"></i> Liked!';

        // Tampilkan notifikasi
        likeNotification.classList.add("show");

        setTimeout(() => {
            likeNotification.classList.remove("show");
        }, 2500);
    }
);