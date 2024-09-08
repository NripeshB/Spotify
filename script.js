const audioPlayer = document.getElementById("audioPlayer");
const currentTimeDisplay = document.getElementById('currentTime');
const totalDurationDisplay = document.getElementById('totalDuration');


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audioPlayer.addEventListener('timeupdate', function() {
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    const dot = document.querySelector(".dot");
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 70 ; 
    dot.style.transform = `translate(${progress}vw, 7px)`; 
});

document.querySelector(".seekbar").addEventListener("click", function(e) {
    e.stopPropagation(); 
    const seekbarWidth = this.offsetWidth;
    const offsetX = e.offsetX;
    const duration = audioPlayer.duration;
    const newTime = (offsetX / seekbarWidth) * duration;

    audioPlayer.currentTime = newTime;
});


audioPlayer.addEventListener('loadedmetadata', function() {
    totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
});
audioPlayer.addEventListener('ended', function() {
    currentTimeDisplay.textContent = '0:00';
});

function playSong(lielement, songsrc, song) {
    document.querySelectorAll(".song").forEach(li => li.classList.remove("active"));
    document.getElementById("song-name").textContent = song;
    lielement.classList.add("active");
    audioPlayer.src = songsrc;
    const playIcon = document.getElementById("play");
        if (audioPlayer.paused) {
            playIcon.classList.add("fa-pause");
            playIcon.classList.remove("fa-play");
            audioPlayer.play();
            console.log(audioPlayer.duration)
        }
    audioPlayer.play();

    audioPlayer.onended = function() {
        document.getElementById("play").classList.remove("fa-pause");
        document.getElementById("play").classList.add("fa-play"); 
        lielement.classList.remove('active');
    };
}


const playButton = document.getElementById("play");
const backwardButton = document.getElementById("backward");
const forwardButton = document.getElementById("forward");
const songs = Array.from(document.querySelectorAll(".song"));

function getSongById(id) {
    return songs.find(song => parseInt(song.id) === id);
}

backwardButton.addEventListener("click", function(event) {
    event.stopPropagation(); 
    const currentSongId = parseInt(document.querySelector(".song.active").id);
    const previousSong = getSongById(currentSongId - 1);
    if (previousSong) {
        const songSrc = previousSong.getAttribute('data-src');
        const song = previousSong.textContent;
        playSong(previousSong, songSrc, song);
    }
    else{
        const songSrc = document.getElementById("10").getAttribute('data-src');
        const song = document.getElementById("10").textContent;
        playSong(document.getElementById("10"), songSrc, song);
    }
});

forwardButton.addEventListener("click" , function(event) {
    event.stopPropagation(); 
    const currentSongId = parseInt(document.querySelector(".song.active").id);
    const nextSong = getSongById(currentSongId + 1);
    if (nextSong) {
        const songSrc = nextSong.getAttribute('data-src');
        const song = nextSong.textContent;
        playSong(nextSong, songSrc, song);
    }
    else{
        const songSrc = document.getElementById("1").getAttribute('data-src');
        const song = document.getElementById("1").textContent;
        playSong(document.getElementById("1"), songSrc, song);
    }
});


playButton.addEventListener("click", function(event) {
    event.stopPropagation(); 

    if (audioPlayer.paused) {
        playButton.classList.add("fa-pause");
        playButton.classList.remove("fa-play");
        audioPlayer.play();
    } else {
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        audioPlayer.pause();
    }
});


 
document.querySelectorAll(".song").forEach(item => {
    item.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src'); 
        const song = this.textContent; 
        playSong(this, songSrc, song);
    });
});
 

document.querySelectorAll(".Creators .fa-play").forEach(playIcon => {
    playIcon.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src');   
        if (songSrc) {
            const songElement = document.querySelector(`.song[data-src="${songSrc}"]`);
            const song = songElement.textContent;
            playSong(songElement, songSrc, song);
        }
    });
});


