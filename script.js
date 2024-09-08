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
        lielement.classList.remove('active'); 
    };
}


const playButton = document.getElementById("play");


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
        const song = this.textContent;  
        if (songSrc) {
            playSong(document.querySelector(`.song[data-src="${songSrc}"]`), songSrc, song);
        }
    });
});

