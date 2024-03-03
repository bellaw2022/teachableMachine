let classifier;
let imageModelURL = './my_model/';

let video;
let flippedVideo;
let isVideoPlaying = false; // Track the video state
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260).hide(); // Initially hide the canvas
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // Add event listener to the toggle button
  select('#toggleButton').mousePressed(toggleVideo);
}

function draw() {
  if (isVideoPlaying) {
    background(0);
    flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0);
    flippedVideo.remove();

    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }
}

function classifyVideo() {
  if (isVideoPlaying) {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  updateOutputMessage(label);
  classifyVideo();
}

function toggleVideo() {
  if (!isVideoPlaying) {
    isVideoPlaying = true;
    select('canvas').show(); // Show the canvas
    classifyVideo();
  } else {
    isVideoPlaying = false;
    select('canvas').hide(); // Hide the canvas
    label = "";
    select('#outputMessage').html(""); // Clear the output message
  }
}

function updateOutputMessage(result) {
  let message = "";
  if (result === "Dog") {
    message = "Barkbark! Hey puppy!";
  } else if (result === "Cat") {
    message = "Hey kitten!!";
  } else if (result === "Rabbit") {
    message = "Hey rabbit, here's your carrot.";
  }
  select('#outputMessage').html(message);
}
