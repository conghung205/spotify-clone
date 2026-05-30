import audio from "../player/audio.js"; // Đảm bảo đúng đường dẫn tới file audio của bạn
import { isShuffle } from "../player/playState.js";

export function syncUIState() {
    const playButtons = document.querySelectorAll(".play-btn, .play-btn-large");
    const shuffleButtons = document.querySelectorAll(".btn-shuffle");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const btnRepeat = document.querySelector(".btn-repeat");
    const progressBar = document.querySelector(".progress-bar");
    const volumeBtn = document.querySelector(".btn-volume");
    const volumeBar = document.querySelector(".volume-bar");

    // hasSource?
    const hasSource =
        audio.src &&
        audio.src !== "" &&
        !audio.src.includes(window.location.host) &&
        (audio.src.startsWith("http") || audio.src.startsWith("blob"));

    // DISABLED/ENABLE
    playButtons.forEach((btn) => (btn.disabled = !hasSource));
    shuffleButtons.forEach((btn) => (btn.disabled = !hasSource));
    if (prevBtn) prevBtn.disabled = !hasSource;
    if (nextBtn) nextBtn.disabled = !hasSource;
    if (btnRepeat) btnRepeat.disabled = !hasSource;
    if (volumeBtn) volumeBtn.disabled = !hasSource;

    // disabled cho các thanh bar
    if (progressBar) {
        progressBar.classList.toggle("disabled", !hasSource);
    }
    if (volumeBar) {
        volumeBar.classList.toggle("disabled", !hasSource);
    }

    //  Play/Pause
    playButtons.forEach((btn) => {
        if (!audio.paused && hasSource) {
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            btn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    //ACTIVE cho toàn bộ nút Shuffle
    shuffleButtons.forEach((btn) => {
        btn.classList.toggle("active", isShuffle);
    });
}
