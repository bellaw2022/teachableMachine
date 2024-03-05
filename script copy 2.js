// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './my_model/';

// Video
let video;
let flippedVideo; 
// To store the classification
let label = "";

let videoPlaying = false;
let canvas; 

// Setup function
function setup() {
  canvas = createCanvas(320, 270);
  canvas.position(250,150);
  canvas.style('border-radius', '20px');
  canvas.hide(); 
  const toggleButton = createButton('Toggle Camera');
  toggleButton.position(30,50);
  toggleButton.class('button-56');
  toggleButton.mousePressed(toggleVideo);
  
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', videoReady);
}

function videoReady() {
  console.log('Video ready');
}

function toggleVideo() {
  if (!videoPlaying) {
    videoPlaying = true;
    if (!video) { // Create the video capture if it doesn't exist
      video = createCapture(VIDEO);
      video.size(320, 270);
      video.hide(); 
    }
    canvas.show(); 
    classifyVideo();
  } else { 
    videoPlaying = false;
    canvas.hide(); 
  }
}

function classifyVideo() {
  if (videoPlaying) {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
  }
}

function draw() {
  if (videoPlaying) {
    background(0);
    image(flippedVideo, 0, 0, width, height);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  // Only classify again if video is playing
  if (videoPlaying) {
    classifyVideo();
  }
}
