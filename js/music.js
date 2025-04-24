// Получаем элементы с HTML страницы
const audioPlayer = document.getElementById('audioPlayer'); // HTML <audio> элемент
const vinyl = document.getElementById('vinyl'); // Элемент виниловой пластинки
const trackNameDisplay = document.getElementById('trackName'); // Элемент, где будет показано название трека

// Путь к папке с музыкой
const musicFolder = 'music/';

// Массив с названиями треков 
const trackList = [
  'a vow, 18FEARS - it matters where you are.mp3',
  'Aurenth - faraway.mp3',
  'daniel - 3 am walk.mp3',
  'oneheart-last-breath-ft-werve.mp3'
];

// Функция, выбирающая случайный трек из списка
function getRandomTrack() {
  const index = Math.floor(Math.random() * trackList.length);
  return musicFolder + trackList[index];
}

// Состояния плеера
let isPlaying = false; // Играет ли сейчас музыка
let hasTrackStarted = false; // Запущен ли уже какой-либо трек
let currentTrack = getRandomTrack(); // Выбираем трек при загрузке

// Вспомогательная функция: удаляет путь и расширение из названия файла
function extractTrackName(trackPath) {
  return trackPath.replace(musicFolder, '').replace(/\.mp3$/, '');
}

// Обновляет текстовое поле с названием трека
function updateTrackNameDisplay() {
  trackNameDisplay.textContent = extractTrackName(currentTrack);
}

// Обработчик клика по винилу (включение/пауза)
vinyl.addEventListener('click', () => {
  if (!isPlaying) {
    // Если плеер не играет
    if (!hasTrackStarted) {
      // Если трек ещё не был загружен
      audioPlayer.src = currentTrack;
      hasTrackStarted = true;
    }

    // Воспроизводим
    audioPlayer.play()
      .then(() => {
        vinyl.classList.add('rotate'); // Добавляем анимацию вращения
        isPlaying = true;
      })
      .catch(err => {
        console.error("Ошибка воспроизведения:", err);
      });
  } else {
    // Если уже играет — ставим на паузу
    audioPlayer.pause();
    vinyl.classList.remove('rotate');
    isPlaying = false;
  }
});

// Обработчик окончания трека — автоматически выбирается и запускается следующий
audioPlayer.addEventListener('ended', () => {
  currentTrack = getRandomTrack(); // Новый трек
  updateTrackNameDisplay(); // Обновляем название
  audioPlayer.src = currentTrack; // Загружаем его
  audioPlayer.play()
    .then(() => {
      vinyl.classList.add('rotate'); // Вращаем винил
      isPlaying = true;
      hasTrackStarted = true;
    })
    .catch(err => {
      console.error("Ошибка при переключении трека:", err);
    });
});

// При наведении мыши на винил показываем название трека
vinyl.addEventListener('mouseenter', () => {
  updateTrackNameDisplay();
  trackNameDisplay.style.opacity = 1;
});

// При уходе мыши с винила скрываем название трека
vinyl.addEventListener('mouseleave', () => {
  trackNameDisplay.style.opacity = 0;
});
