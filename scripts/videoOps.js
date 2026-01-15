const videoSong = document.querySelector('.js-video');

const playButton = document.querySelector('.js-play-button');
const stopButton = document.querySelector('.js-stop-button');
const skipForwardButton = document.querySelector('.js-skip-forward-button');
const skipBackwardButton = document.querySelector('.js-skip-backward-button');
const jumpButton = document.querySelector('.js-jump-button');
const loopButton = document.querySelector('.js-loop-button');
const autoPlayButton = document.querySelector('.js-autoplay-button');
const jumpTimeInput = document.querySelector('.js-video-time-stamp');
const volumeInput = document.querySelector('.js-volume-input');
const muteButton = document.querySelector('.js-mute-button');
const nextButton = document.querySelector('.js-next-button');
const previousButton = document.querySelector('.js-previous-button');
const replayButton = document.querySelector('.js-replay-button');
const playBackSpeed = document.querySelector('.js-select-speed');
const videoSeekBar = document.querySelector('.js-video-seekbar');
const fullScreenButton = document.querySelector('.js-full-screen-button');

let loopVideo = false;
let autoPlay = false;
let isSeeking = false;
let selectedSpeed = Number(playBackSpeed?.value) || 1;
let playlist = [
  '/public/day1.mp4',
  '/public/123.mp4'
];
let videoHistory = [];
let playingIndex = 0;
//videoSong.play();


videoSong.src = playlist[playingIndex];
videoSong.playbackRate = selectedSpeed;
videoHistory.unshift(videoSong.src);

playButton?.addEventListener('click', ()=> {
  if(videoSong.paused) {
    videoSong.play();
    console.log('video is playing');
  }else {
    videoSong.pause();
    console.log('video is paused');
    console.log(videoSong.currentTime);
  }
  
});

stopButton?.addEventListener('click', ()=> {
  videoSong.pause();
});


skipForwardButton?.addEventListener('click', ()=> {
  videoSong.currentTime += 10;
});

skipBackwardButton?.addEventListener('click', ()=> {
  videoSong.currentTime -= 10;
  //console.log('forwarded 10 sec')
});

jumpButton?.addEventListener('click', ()=> {
  timeStamp = Number(jumpTimeInput.value);
  videoSong.currentTime = timeStamp;
  //console.log('forwarded 10 sec')
});

loopButton?.addEventListener('click', () => {
  if(loopVideo) {
    loopVideo = false;
    loopButton.classList.remove('active');
    console.log('loop disabled');
  } else {
    loopVideo = true;
    loopButton.classList.add('active');
    console.log('loop enabled');
  }
});

autoPlayButton?.addEventListener('click', ()=> {
  if(autoPlay) {
    autoPlay = false;
    autoPlayButton.classList.remove('active');
    console.log('autoplay disabled');
  } else {
    autoPlay = true;
    autoPlayButton.classList.add('active');
    console.log('autoPlay is enabled');
  }
})


volumeInput?.addEventListener('input', () => {
  if(videoSong.muted) videoSong.muted = false;
  const setVolume = (Number(volumeInput.value)/100).toFixed(2);
  console.log(Math.round(setVolume*100));
  videoSong.volume = setVolume;
});

muteButton?.addEventListener('click', ()=> {
  console.log('mute button clicked');
  if(!videoSong.muted) {
    videoSong.muted = true;
    muteButton.classList.add('active');
  } else {
    videoSong.muted = false;
    muteButton.classList.remove('active');
  }
});


replayButton?.addEventListener('click', ()=> {
  videoSong.currentTime=0;
  videoSong.play();
});

nextButton?.addEventListener('click', ()=> {
  if(playingIndex < playlist.length -1) {
    playingIndex++;
    videoSong.src=playlist[playingIndex];
    videoHistory.unshift(videoSong.src);
    videoSong.play();
  }
});

previousButton?.addEventListener('click', ()=> {
  if(playingIndex > 0) {
    playingIndex--;
    videoSong.src=playlist[playingIndex];
    videoSong.play();
  }
});

playBackSpeed?.addEventListener('input', () => {
  selectedSpeed = Number(playBackSpeed.value);
  videoSong.playbackRate = selectedSpeed;
})


videoSeekBar?.addEventListener('input', () => {
  //console.log(videoSeekBar.value);
  isSeeking = true;
  videoSong.currentTime = videoSeekBar.value;
});


fullScreenButton?.addEventListener("click", () => {
  videoSong.requestFullscreen();
})



function updateSeekBar() {
  if(!isSeeking && !videoSong.paused && !videoSong.ended) {
    videoSeekBar.value = videoSong.currentTime;
  }
  requestAnimationFrame(updateSeekBar);
}



videoSong?.addEventListener('loadedmetadata', ()=> {
  videoSeekBar.max = videoSong.duration.toFixed(2);
  videoSeekBar.value = 0;
  //console.log('loaded');
  //console.log(videoSeekBar.max);
});


videoSong.addEventListener('waiting', () => {
  //console.log('waiting');
})

videoSong.addEventListener('canplay', () => {
  //console.log('in resume, can play');
})

videoSong?.addEventListener('timeupdate', () => {
  //videoSeekBar.value = videoSong.currentTime;
  //console.log('time update', videoSong.currentTime);
})

videoSong?.addEventListener('play', () => {
  selectedSpeed = Number(playBackSpeed.value);
  videoSong.playbackRate = selectedSpeed;
  videoSeekBar.value = videoSong.currentTime;
  //console.log('playing');
  updateSeekBar();
})

videoSong.addEventListener('ended', ()=> {
  console.log('video ended');
  if(loopVideo) {
    videoSong.play();
  }else {
    if(autoPlay) {
      playingIndex++;
      if(playingIndex < playlist.length) {
        videoSong.src= playlist[playingIndex];
        videoHistory.unshift(videoSong.src);
        videoSong.play();
      } else {
        autoPlay = false;
        playingIndex = 0;
      }
      
    }
  }
});




