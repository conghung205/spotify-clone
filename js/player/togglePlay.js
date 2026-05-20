import audio from "./audio.js";

function togglePlay() {
    const allPlayButtons = document.querySelectorAll(
        ".play-btn, .play-btn-large",
    );

    if (audio.paused) {
        audio.play();

        allPlayButtons.forEach((btn) => {
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        });
    } else {
        audio.pause();

        allPlayButtons.forEach((btn) => {
            btn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
}

export default togglePlay;
