let songName = document.querySelector("#song-name");
let singer = document.querySelector("#song-singer");
let image = document.querySelector(".song-img");
let playPauseBtn = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let volumeSvg = document.querySelector("#vol-svg");
let durationSlider = document.querySelector("#song-duration");
let playlistImg = document.querySelector("#playlist-svg");
let playlist = document.querySelector(".playlist");
let playlistSongs = document.querySelectorAll(".playlist-song");
let index = 0;
let playingsong = false;
let track = document.createElement("audio");
let songs = [
    {
        name: "Blinding Lights",
        singer: "The Weeknd",
        path: "firstsong.mp3",
        image: "images/image1.jpg"
    },
    {
        name: "Save Your Tears",
        singer: "The Weeknd",
        path: "secondsong.mp3",
        image: "images/image2.jpg"
    },
    {
        name: "Enemy",
        singer: "Imagine Dragons",
        path: "thirdsong.mp3",
        image: "images/image3.jpg"
    },
    {
        name: "Sunflower",
        singer: "Post Malone",
        path: "fourthsong.mp3",
        image: "images/image4.jpg"
    }
];

function loadTrack(index){
    track.src = `song/${songs[index].path}`;
    songName.innerHTML = songs[index].name;
    singer.innerHTML = songs[index].singer;
    image.style = `background-image: url("${songs[index].image}")`;

    if (!track._initialized) {
        track.addEventListener('loadedmetadata', () => {
            durationSlider.max = track.duration;
            durationSlider.value = 0;
        });
        track.addEventListener('timeupdate', () => {
            durationSlider.value = track.currentTime;
        });
        track._initialized = true;
    }

    volume();
    track.load();
    track.loop = true;
}

loadTrack(index);

function togglePlayPause(){
    if (playingsong === false) {
        playSong();
    } else {
        pauseSong();
    }
}
function playSong(){
    track.play();
    playingsong = true;
    playPauseBtn.src = "icons/pause.svg";
}

function pauseSong(){
    track.pause();
    playingsong = false;
    playPauseBtn.src = "icons/play.svg";
}

function nextSong(){
    if(index < songs.length - 1){
        index ++;
        loadTrack(index);
        playSong();
    }
    else{
        index = 0;
        loadTrack(index);
        playSong();
    }
}

function prevSong(){
    if(index > 0){
        index --;
        loadTrack(index);
        playSong();
    }
    else{
        index = songs.length - 1;
        loadTrack(index);
        playSong();
    }
}

const previousSong = prevSong;

function volume(){
    track.volume = volumeRange.value / 100;
    if(track.volume === 0){
        volumeSvg.src = "icons/mute.svg";
    }else{
        volumeSvg.src = "icons/volume.svg";
    }
}

function seekTrack(){
    track.currentTime = durationSlider.value;
}

function skipForward(seconds = 5){
    track.currentTime = Math.min(track.duration, track.currentTime + seconds);
}
function skipBackward(seconds = 5){
    track.currentTime = Math.max(0, track.currentTime - seconds);
}

playlistImg.addEventListener("click",()=>{
    playlist.classList.toggle("playlist-active")
    if(playlist.classList.contains("playlist-active")){
        playlistImg.src="icons/cross.svg"
    }else{
        playlistImg.src="icons/playlist.svg"
    }
})
playlistSongs.forEach((song, index) => {
    song.addEventListener("click", () => {
        index = index;
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active");
        playlistImg.src="icons/playlist.svg"
    });
});