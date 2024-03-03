let button, img;

function preload() {
  img = loadImage('assets/dog1.jpg');
}

function setup() {
  createCanvas(1200, 600);
  button = createButton('click');
  button.position(19, 19);
  button.mousePressed(loadCamera);
}

function loadCamera(){
  image(img, 100, 0);
}
