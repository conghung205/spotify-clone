import audio from "./audio.js";
import formatDuration from "../utils/formatDuration.js";
import togglePlay from "./togglePlay.js";
import toggleShuffle from "./toggleShuffle.js";
import toggleRepeat from "./toggleRepeat.js";

import { initDragProgress } from "./dragController.js";
import {
    handleNextTrack,
    handlePrevTrack,
    handleTrackEnded,
} from "./playlistController.js";

import { initVolumeControl, initMuteToggle } from "./volumeController.js";

function initPlayerControls() {
    const playBtn = document.querySelector(".play-btn");
    const timeStart = document.querySelector(".time-start");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const btnShuffle = document.querySelector(".btn-shuffle");
    const btnRepeat = document.querySelector(".btn-repeat");

    const progressBar = document.querySelector(".progress-bar");
    const progressFill = document.querySelector(".progress-fill");
    const progressHandle = document.querySelector(".progress-handle");

    const volumeBar = document.querySelector(".volume-bar");
    const volumeFill = document.querySelector(".volume-fill");
    const volumeHandle = document.querySelector(".volume-handle");
    const volumeBtn = document.querySelector(".btn-volume");

    let isDragging = false;
    let isDraggingVolume = false;

    // kéo thả progress (Truyền các hàm getter/setter cho biến isDragging)
    initDragProgress(
        progressBar,
        progressFill,
        progressHandle,
        timeStart,
        audio,
        () => isDragging,
        (val) => {
            isDragging = val;
        },
    );

    // Khởi tạo kéo thả volume bar
    initVolumeControl(
        volumeBar,
        volumeFill,
        volumeHandle,
        audio,
        () => isDraggingVolume,
        (val) => {
            isDraggingVolume = val;
        },
    );
    initMuteToggle(volumeBtn, audio);

    // mặc định
    audio.volume = 1.0;
    volumeFill.style.width = "100%";
    volumeHandle.style.left = "100%";

    // disable ban đầu cho UI
    playBtn.disabled = true;
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    btnShuffle.disabled = true;
    btnRepeat.disabled = true;

    progressBar.classList.add("disabled");

    timeStart.textContent = formatDuration(0);
    progressFill.style.width = "0";
    progressHandle.style.left = "0";

    // EventListener
    document.addEventListener("click", (e) => {
        if (e.target.closest(".play-btn, .play-btn-large")) togglePlay();
        if (e.target.closest(".btn-shuffle")) toggleShuffle();
        if (e.target.closest(".btn-repeat")) toggleRepeat();
    });

    prevBtn.addEventListener("click", handlePrevTrack);
    nextBtn.addEventListener("click", handleNextTrack);

    // Time update
    audio.addEventListener("timeupdate", () => {
        if (isDragging) return;

        const currentSeconds = audio.currentTime;
        const percent = (currentSeconds / audio.duration) * 100;

        timeStart.textContent = formatDuration(currentSeconds);
        progressFill.style.width = `${percent}%`;
        progressHandle.style.left = `${percent}%`;
    });

    audio.addEventListener("ended", () => handleTrackEnded(audio));
}

export default initPlayerControls;
