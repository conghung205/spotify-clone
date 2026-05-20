import { isRepeat, setRepeat } from "./playState.js";

function toggleRepeat() {
    const nextValue = !isRepeat;

    setRepeat(nextValue);

    document.querySelectorAll(".btn-repeat").forEach((btn) => {
        btn.classList.toggle("active", nextValue);
    });
}

export default toggleRepeat;
