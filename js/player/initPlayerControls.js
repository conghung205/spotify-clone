import audio from "./audio.js";
import formatDuration from "../utils/formatDuration.js";

function initPlayerControls() {
    const playBtn = document.querySelector(".play-btn");
    const timeStart = document.querySelector(".time-start");
    const progress = document.querySelector(".progress-fill");

    // play or pause
    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    // update time
    audio.addEventListener("timeupdate", () => {
        const currentSeconds = audio.currentTime;
        if (timeStart) {
            timeStart.textContent = formatDuration(currentSeconds);
        }

        if (progress) {
            const progressPercent = Math.floor(
                (currentSeconds / audio.duration) * 100,
            );

            progress.style.width = `${progressPercent}%`;
        }
    });
}

export default initPlayerControls;
