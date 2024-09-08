const audioPlayer = document.getElementById("audioPlayer");

 
function playSong(lielement, songsrc) {
    document.querySelectorAll(".song").forEach(li => li.classList.remove("active"));

    lielement.classList.add("active");
    audioPlayer.src = songsrc;
    const playIcon = document.getElementById("play");
        if (audioPlayer.paused) {
            playIcon.classList.add("fa-pause");
            playIcon.classList.remove("fa-play");
            audioPlayer.play();
        }
    audioPlayer.play();

    audioPlayer.onended = function() {
        lielement.classList.remove('active'); 
    };
}

document.querySelectorAll(".player").forEach(item => {
    item.addEventListener("click", function() {
        const playIcon = document.getElementById("play");
        if (audioPlayer.paused) {
            playIcon.classList.add("fa-pause");
            playIcon.classList.remove("fa-play");
            audioPlayer.play();
        } else {
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play");
            audioPlayer.pause();
        }
    });
});

 
document.querySelectorAll(".song").forEach(item => {
    item.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src');  
        playSong(this, songSrc);
    });
});
 
document.querySelectorAll(".Creators .fa-play").forEach(playIcon => {
    playIcon.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src');   
        if (songSrc) {
            playSong(document.querySelector(`.song[data-src="${songSrc}"]`), songSrc);
        }
    });
});
