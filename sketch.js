let song1, song2;
let currentSong;
let playButton, volumeSlider, jumpSlider, speedSlider, songSelector;
let amp;
let img; 
let circleSize; 
let songs = {}; 

function preload() {
  soundFormats("mp3", "ogg");
  song1 = loadSound("song1.mp3"); 
  song2 = loadSound("song2.mp3"); 
  img = loadImage("살아남자.jpg"); 
}

function setup() {
  createCanvas(640, 640);
  amp = new p5.Amplitude();
  currentSong = song1;

  songs = {
    "Song 1": song1,
    "Song 2": song2,
  };

  playButton = createButton("PLAY");
  playButton.position(10, 660);
  playButton.mousePressed(togglePlay);

  createP("볼륨 ").position(80, 640);
  volumeSlider = createSlider(0, 1, 0.5, 0.05);
  volumeSlider.position(80, 680);

  createP("재생 위치 ").position(230, 640);
  jumpSlider = createSlider(0, 5, 0, 1);
  jumpSlider.position(230, 680);
  jumpSlider.input(jumpSong);
 
  createP("속도 ").position(380, 640);
  speedSlider = createSlider(0.5, 2, 1, 0.5);
  speedSlider.position(380, 680);
  speedSlider.input(changeSpeed);

  createP("곡 선택 ").position(530, 640);
  songSelector = createSelect();
  songSelector.position(530, 680);
  songSelector.option("Song 1");
  songSelector.option("Song 2");
  songSelector.changed(changeSong);
}

function draw() {
  background(255,182,194);
  
  let vol = amp.getLevel();
  circleSize = map(vol, 0, 0.3, 100, 400)*4;
  imageMode(CENTER);
  image(img, width / 2, height / 2, circleSize, circleSize);

  currentSong.setVolume(volumeSlider.value());
}

function togglePlay() {
  if (currentSong.isPlaying()) {
    currentSong.pause();
    playButton.html("PLAY");
  } else {
    currentSong.play();
    playButton.html("STOP");
  }
}

function jumpSong() {
  if (currentSong.isLoaded()) {
    let jumpTo = map(jumpSlider.value(), 0, 5, 0, currentSong.duration());
    currentSong.jump(jumpTo);
  }
}

function changeSpeed() {
  if (currentSong.isLoaded()) {
    currentSong.rate(speedSlider.value());
  }
}

function changeSong() {
  if (currentSong.isPlaying()) {
    currentSong.stop();
  }
  const selectedSong = songSelector.value();
  currentSong = songs[selectedSong];
  currentSong.setVolume(volumeSlider.value());
  currentSong.rate(speedSlider.value());
  playButton.html("PLAY");
}
