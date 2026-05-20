export let currentPlaylist = [];
export let currentIndex = 0;
export let isShuffle = false;
export let isRepeat = false;

export function setPlaylist(playlist) {
    currentPlaylist = playlist;
}

export function setCurrentIndex(index) {
    currentIndex = index;
}
export function setShuffle(value) {
    isShuffle = value;
}

export function setRepeat(value) {
    isRepeat = value;
}
