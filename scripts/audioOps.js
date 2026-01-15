console.log('testing audio');
const audio = document.querySelector('.js-audio');

if(audio) console.log('audio file there');


const playAudioButton = document.querySelector('.js-play-sound');
const pauseAudioButton = document.querySelector('.js-pause-sound');
const muteAudioButton = document.querySelector('.js-mute-sound');
const volumeAudioInput = document.querySelector('.js-audio-input');


audio.addEventListener('loadedmetadata', () => {
  console.log('loaded');
  volumeAudioInput.value=1;
})

playAudioButton?.addEventListener('click', () => {
  if(audio.paused) {
    console.log('start playing');
    audio.play();
  } else {
    console.log('stop playing');
    audio.pause();
  }
  
});

pauseAudioButton?.addEventListener('click', () => {
  audio.pause();
});

muteAudioButton?.addEventListener('click', () => {
  if(!audio.muted) {
    audio.muted = true;
    console.log('muted the audio');
    muteAudioButton.innerText = 'Unmute';
  } else {
    audio.muted = false;
    console.log('unmuted the audio');
    muteAudioButton.innerText = 'Mute';
  }
  
})

volumeAudioInput?.addEventListener("input", () => {
  console.log('volume input', Math.round(Number(volumeAudioInput.value)*100));
  const inputSound = Math.round(Number(volumeAudioInput.value)*100);
  audio.volume = volumeAudioInput.value;
})