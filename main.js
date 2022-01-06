song1="";
song2="";
song1_status="";
song2_status="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(500,500);
    canvas.position(550,200);
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function modelLoaded(){
    console.log("posenet is initialized");
}

function gotPoses(results)
{
    if(results.length>0){
      console.log(results);
      leftwristx=results[0].pose.leftWrist.x;
      leftwristy=results[0].pose.leftWrist.y;
      console.log("leftwristx ="+leftwristx);
      console.log("leftwristy ="+leftwristy);
  
      rightwristx=results[0].pose.rightWrist.x;
      rightwristy=results[0].pose.rightWrist.y;
      console.log("rightwristx ="+rightwristx);
      console.log("rightwristy ="+rightwristy);
      scoreleftwrist=results[0].pose.keypoints[9].score;
      scorerightwrist=results[0].pose.keypoints[10].score;

    }
  }
function draw(){
image(video,0,0,500,500);

song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
stroke("#FF0000");
fill("#FF0000");
if(scorerightwrist>0.2){
  circle(rightwristx,rightwristy,20);
  song2.stop();
  if(song1_status==false){
    song1.play();
    document.getElementById("song_name").innerHTML="playing harry potter";
  }
}

if(scoreleftwrist>0.2){
  circle(leftwristx,leftwristy,20);
  song1.stop();
  if(song2_status==false){
    song2.play();
    document.getElementById("song_name").innerHTML="playing peter pan";
  }
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}