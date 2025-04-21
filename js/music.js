const audioPlayer = document.getElementById('audioPlayer');
const vinyl = document.getElementById('vinyl');
const trackNameDisplay = document.getElementById('trackName');

const musicFolder = 'music/';
const trackList = [
  'a vow, 18FEARS - it matters where you are.mp3',
  'Aurenth - faraway.mp3',
  'daniel - 3 am walk.mp3',
  'oneheart-last-breath-ft-werve.mp3'
];

function getRandomTrack() {
  const index = Math.floor(Math.random() * trackList.length);
  return musicFolder + trackList[index];
}

let isPlaying = false;
let hasTrackStarted = false;
let currentTrack = getRandomTrack();

// Вспомогательная функция для извлечения имени трека
function extractTrackName(trackPath) {
  return trackPath.replace(musicFolder, '').replace(/\.mp3$/, '');
}

// Обновляем текст названия трека
function updateTrackNameDisplay() {
  trackNameDisplay.textContent = extractTrackName(currentTrack);
}

// Запуск/остановка музыки по клику на винил
vinyl.addEventListener('click', () => {
  if (!isPlaying) {
    if (!hasTrackStarted) {
      audioPlayer.src = currentTrack;
      hasTrackStarted = true;
    }
    audioPlayer.play()
      .then(() => {
        vinyl.classList.add('rotate');
        isPlaying = true;
      })
      .catch(err => {
        console.error("Ошибка воспроизведения:", err);
      });
  } else {
    audioPlayer.pause();
    vinyl.classList.remove('rotate');
    isPlaying = false;
  }
});

// При окончании текущего трека выбирается новый и запускается он автоматически
audioPlayer.addEventListener('ended', () => {
  currentTrack = getRandomTrack();
  updateTrackNameDisplay();
  audioPlayer.src = currentTrack;
  audioPlayer.play()
    .then(() => {
      vinyl.classList.add('rotate');
      isPlaying = true;
      hasTrackStarted = true;
    })
    .catch(err => {
      console.error("Ошибка при переключении трека:", err);
    });
});

// Показ названия трека при наведении на виниловую пластинку
vinyl.addEventListener('mouseenter', () => {
  updateTrackNameDisplay();
  trackNameDisplay.style.opacity = 1;
});

// Скрытие названия трека при выходе мыши за пределы винила
vinyl.addEventListener('mouseleave', () => {
  trackNameDisplay.style.opacity = 0;
});
