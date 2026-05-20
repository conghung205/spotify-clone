import audio from "./audio.js";
import renderPlayer from "./renderPlayer.js";
import { setPlaylist, setCurrentIndex, currentIndex } from "./playState.js";

function playTrack(playlist, index) {
    setPlaylist(playlist);
    setCurrentIndex(index);

    const track = playlist[index];

    audio.src = track.audio_url;
    audio.play();

    renderPlayer(track);

    // enable controls
    const playBtn = document.querySelector(".play-btn");
    const playBtnLarge = document.querySelector(".play-btn-large");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const btnShuffles = document.querySelectorAll(".btn-shuffle");
    const btnRepeat = document.querySelector(".btn-repeat");
    const progressBar = document.querySelector(".progress-bar");

    playBtn.disabled = false;
    nextBtn.disabled = false;
    prevBtn.disabled = false;
    btnShuffles.forEach((btnShuffle) => (btnShuffle.disabled = false));
    btnRepeat.disabled = false;
    progressBar.classList.remove("disabled");

    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    if (playBtnLarge) {
        playBtnLarge.innerHTML = '<i class="fas fa-pause"></i>';
    }

    updateActiveTrack();
}

function updateActiveTrack() {
    document.querySelectorAll(".track-item.playing").forEach((item) => {
        item.classList.remove("playing");
    });

    const currentTrackElement = document.querySelector(
        `.track-item[data-index="${currentIndex}"]`,
    );

    if (currentTrackElement) {
        currentTrackElement.classList.add("playing");
    }
}
export default playTrack;
