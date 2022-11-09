var score_leftHand=0;
var leftHandX=0;
var leftHandY=0;
var rightHandX=0;
var rightHandY=0;

var audio="";
function preload(){
audio= loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600, 500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose",gotResults);
}
function modelLoaded(){
    console.log("model is started");
}
function gotResults(results){
if(results.length>0){
    console.log(results);
    leftHandX= results[0].pose.leftWrist.x;
    leftHandY= results[0].pose.leftWrist.y;
    console.log("left hand x = "+leftHandX+" left hand y = "+leftHandY);
    rightHandX=results[0].pose.rightWrist.x;
    rightHandY= results[0].pose.rightWrist.y;
    console.log("right hand x = "+rightHandX+" right hand y = "+ rightHandY);
    score_leftHand= results[0].pose.keypoints[9].score;
    console.log("score of left hand = "+score_leftHand);
}
}
function draw(){
image(video, 0, 0, 600, 500);

stroke("#0000FF");
fill("#FFFFFF");

if(score_leftHand>0.2){
circle(leftHandX, leftHandY, 20);
var leftHandNumber=Number(leftHandY);
var remove_decimal= floor(leftHandNumber);
var whole_number= remove_decimal/500;
document.getElementById("volume").innerHTML="Volume : "+whole_number;
audio.setVolume(whole_number);
}
}
function play(){
    audio.play();
    audio.setVolume(1);
    audio.rate(1);
}