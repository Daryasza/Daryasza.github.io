(function() {

let intervalId;
let soundControl;
let durationControl;

const video = document.getElementById('video');
const playBtn = document.querySelector('.video__play-btn');
const playBtnB = document.querySelector('.video__btn-playB');
const soundBtn = document.querySelector('.video__sound-btn');

// Play/Pause events (for mobile players)
video.addEventListener('pause', invertVideoBtns);
video.addEventListener('play', invertVideoBtns);

// Clicking on key points of the video
video.addEventListener('click', playStop);
playBtnB.addEventListener('click', playStop);
playBtn.addEventListener('click', playStop);

// Changing the video playback slider
durationControl = document.getElementById('durationLevel');
durationControl.addEventListener('input', setVideoDuration);

durationControl.min = 0;
video.onloadedmetadata = function() {
  durationControl.max = video.duration * 1000;
};
durationControl.value = 0;

// Clicking the mute/unmute button
let micControl = document.getElementById("soundOff/On");
micControl.addEventListener('click', soundOff);

// Changing the volume slider
soundControl = document.getElementById('sound-level');
soundControl.addEventListener('input', changeSoundVolume);
soundControl.min = 0;
soundControl.max = 10;

// Default volume values
soundControl.value = soundControl.max;
let step = soundControl.max / 1000;
let percent = video.volume / step;
soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

// Variable to store the last volume level
let soundControlBfr = soundControl.value

// Video end event
video.addEventListener('ended', endOfVideo);



function playStop() {

  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 10);

  } else {
    video.pause();
    clearInterval(intervalId);
  }
}

function invertVideoBtns() {
  playBtnB.classList.toggle("video__btn-playB--active");
  playBtn.classList.toggle('video__play-btn--active');
}

function setVideoDuration() {
  video.currentTime = durationControl.value / 1000;
  updateDuration();
}

function updateDuration() {
  durationControl.value = video.currentTime * 1000;

  let step = video.duration / 100;
  let percent = video.currentTime / step;
  durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;
}


function soundOff() {
  if (video.volume === 0) {
    soundControl.value = soundControlBfr;
    // Not working on iOS (video.volume is read-only and always =1)
    // https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
    video.volume = soundControlBfr / 10;
    soundBtn.classList.toggle('video__sound-btn--active');
    let step = soundControl.max / 1000;
    let percent = video.volume / step;
    soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

  } else {
    soundControlBfr = soundControl.value;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.toggle('video__sound-btn--active');
    soundControl.style.background = `#868686`;
  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  let step = soundControl.max / 1000;
  let percent = video.volume / step;
  soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;

  if (video.volume == 0) {
    soundBtn.classList.add('video__sound-btn--active');
  } else {
    soundBtn.classList.remove('video__sound-btn--active');
    let step = soundControl.max / 1000;
    let percent = video.volume / step;
    soundControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #868686 ${percent}%)`;
  }
}

function endOfVideo() {
  video.currentTime = 0;
  durationControl.value = 0;
  durationControl.style.background = `#868686`;
  
  playBtnB.classList.remove('video__btn-playB--active');
  playBtn.classList.remove('video__play-btn--active');
  video.load();
}

})();
