let isPlaying = false; // Define isPlaying variable at the top

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/music.mp3');
}

function setup() {
  noCanvas();

  const playButton = createButton('Play Puppy Song');
  playButton.class('button-56');
  playButton.mousePressed(toggleMusic);
  playButton.style('position', 'absolute');
  playButton.style('bottom', '20px'); 
  playButton.style('left', '20px');
}

function toggleMusic() {
  if (!isPlaying) {
    mySound.play();
    isPlaying = true;
  } else {
    mySound.pause();
    isPlaying = false;
  }
}
