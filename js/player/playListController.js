import playTrack from "./playTrack.js";
import {
    currentPlaylist,
    currentIndex,
    isRepeat,
    isShuffle,
} from "./playState.js";

// next track
export function handleNextTrack() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= currentPlaylist.length) {
        nextIndex = 0;
    }
    playTrack(currentPlaylist, nextIndex);
}

// prev track
export function handlePrevTrack() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = currentPlaylist.length - 1;
    }
    playTrack(currentPlaylist, prevIndex);
}

// Ended
export function handleTrackEnded(audio) {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
        return;
    }

    if (isShuffle) {
        let nextIndex;
        if (currentPlaylist.length === 1) {
            nextIndex = currentIndex;
        } else {
            do {
                nextIndex = Math.floor(Math.random() * currentPlaylist.length);
            } while (nextIndex === currentIndex);
        }
        playTrack(currentPlaylist, nextIndex);
        return;
    }

    handleNextTrack();
}
