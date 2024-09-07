const audioPlayer = document.getElementById("audioPlayer");

// Function to play the song and update active class
function playSong(lielement, songsrc) {
    document.querySelectorAll(".song").forEach(li => li.classList.remove("active")); // Remove active class from all songs

    lielement.classList.add("active"); // Add active class to the clicked song
    audioPlayer.src = songsrc;
    audioPlayer.play();

    audioPlayer.onended = function() {
        lielement.classList.remove('active'); // Remove active class when the song ends
    };
}

// Select all elements with the class 'song' and set up event listeners
document.querySelectorAll(".song").forEach(item => {
    item.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src'); // Get song source from data attribute
        playSong(this, songSrc);
    });
});

// Select all 'i' elements within .items and set up event listeners
document.querySelectorAll(".Creators .fa-play").forEach(playIcon => {
    playIcon.addEventListener('click', function() {
        const songSrc = this.getAttribute('data-src'); // Get song source from data attribute
        if (songSrc) {
            playSong(document.querySelector(`.song[data-src="${songSrc}"]`), songSrc);
        }
    });
});
