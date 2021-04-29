var musicContainer = document.querySelector(".music-container");
var playBtn = document.querySelector("#play");
var prevBtn = document.querySelector("#prev");
var nextBtn = document.querySelector("#next");
var audio = document.querySelector("#audio");
var progress = document.querySelector("#progress");
var progressLine = document.querySelector("#progress-line");
var progressContainer = document.querySelector("#progress-container");
var title = document.querySelector("#title");
var cover = document.querySelector("#cover");
// Array of Song titles
var songs = [
  "funk-me-baby",
  "spectacular",
  "the-corporate",
  "write-your-story",
];
// Keep track of songs to determine which song is currently being played
var songIndex = 2;
// Update song details
/**
 *
 * updates the song to be played
 * updates title, audio src, cover src
 * @param {string} song
 */
function loadSong(song) {
  title.innerText = song;
  audio.src = "../music/" + song + ".mp3";
  cover.src = "../img/" + song + ".jpg";
}

// initially laod song to be played
loadSong(songs[songIndex]);

/**
 * Function to play the audio
 *
 */
function playSong() {
  musicContainer.classList.add("play");
  cover.classList.add("animate-spin");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

/**
 * Function to pause the audio
 *
 */
function pauseSong() {
  musicContainer.classList.remove("play");
  cover.classList.remove("animate-spin");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

/**
 * Funtion to goto previous audio
 *
 */
function prevSong() {
  //Decrementting the song index
  songIndex--;

  // push back to last index is less then 0
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

/**
 * Function to goto next audio
 *
 */
function nextSong() {
  //incrementing the song index
  songIndex++;

  // push to index 0 is last song
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

/**
 * Function to show and update the progress bar
 *
 * @param {*} e
 */
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.left = `${progressPercent}%`;
  progressLine.style.width = `${progressPercent}%`;
}

/**
 * Function to skip into certain portion of the audio
 *
 * @param {*} e
 */
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Change audio events

// Event Listener to play or pause the audio
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
