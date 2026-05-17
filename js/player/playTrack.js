import audio from "./audio.js";
import renderPlayer from "./renderPlayer.js";

async function playTrack(track) {
    audio.src = track.audio_url;

    audio.play();

    renderPlayer(track);

    const playBtn = document.querySelector(".play-btn");
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

export default playTrack;
