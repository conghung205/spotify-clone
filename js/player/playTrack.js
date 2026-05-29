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
    const allPlayButtons = document.querySelectorAll(
        ".play-btn, .play-btn-large",
    );
    const allShuffleButtons = document.querySelectorAll(".btn-shuffle");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const btnRepeat = document.querySelector(".btn-repeat");
    const progressBar = document.querySelector(".progress-bar");
    const volumeBtn = document.querySelector(".btn-volume");
    const volumeBar = document.querySelector(".volume-bar");

    allPlayButtons.forEach((btn) => (btn.disabled = false));
    allShuffleButtons.forEach((btn) => (btn.disabled = false));
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
    if (btnRepeat) btnRepeat.disabled = false;
    if (progressBar) progressBar.classList.remove("disabled");
    if (volumeBtn) volumeBtn.disabled = false;
    if (volumeBar) volumeBar.classList.remove("disabled");

    allPlayButtons.forEach((btn) => {
        btn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    updateActiveTrack();
}

function updateActiveTrack() {
    document
        .querySelectorAll(".track-item.playing, .playlist-row.playing")
        .forEach((item) => {
            item.classList.remove("playing");
        });

    const currentTrackItem = document.querySelector(
        `.track-item[data-index="${currentIndex}"]`,
    );
    if (currentTrackItem) {
        currentTrackItem.classList.add("playing");
    }

    const currentPlaylistRow = document.querySelector(
        `.playlist-row[data-index="${currentIndex}"]`,
    );
    if (currentPlaylistRow) {
        currentPlaylistRow.classList.add("playing");
    }
}

export default playTrack;
