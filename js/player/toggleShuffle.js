import { isShuffle, setShuffle } from "./playState.js";

function toggleShuffle() {
    const nextValue = !isShuffle;

    setShuffle(nextValue);

    document.querySelectorAll(".btn-shuffle").forEach((btn) => {
        btn.classList.toggle("active", nextValue);
    });
}

export default toggleShuffle;
