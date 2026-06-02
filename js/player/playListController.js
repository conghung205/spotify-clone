import playTrack from "./playTrack.js";
import {
    currentPlaylist,
    currentIndex,
    isRepeat,
    isShuffle,
} from "./playState.js";

function getRandomIndex() {
    if (currentPlaylist.length <= 1) {
        return currentIndex;
    }

    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * currentPlaylist.length);
    } while (nextIndex === currentIndex);

    return nextIndex;
}

// next track
export function handleNextTrack() {
    if (isRepeat) {
        playTrack(currentPlaylist, currentIndex);
        return;
    }
    if (isShuffle) {
        const randomIndex = getRandomIndex();
        playTrack(currentPlaylist, randomIndex);
        return;
    }

    let nextIndex = currentIndex + 1;
    if (nextIndex >= currentPlaylist.length) {
        nextIndex = 0;
    }
    playTrack(currentPlaylist, nextIndex);
}

// prev track
export function handlePrevTrack() {
    if (isRepeat) {
        playTrack(currentPlaylist, currentIndex);
        return;
    }
    if (isShuffle) {
        const randomIndex = getRandomIndex();
        playTrack(currentPlaylist, randomIndex);
        return;
    }

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
        const randomIndex = getRandomIndex();
        playTrack(currentPlaylist, randomIndex);
        return;
    }

    handleNextTrack();
}
