var img = "";
objects = [];
var status1  ="";

function preload(){
  img = loadImage('busy1.jpg');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if(error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(img, 0, 0, 640, 420);
  if(status1 != "") {
    for(i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";

      fill("red");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
      textSize(20);
      noFill();
      stroke("yellow");
      strokeWeight(1);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}