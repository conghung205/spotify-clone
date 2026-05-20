import formatDuration from "../utils/formatDuration.js";

export function initDragProgress(
    progressBar,
    progressFill,
    progressHandle,
    timeStart,
    audio,
    getIsDragging,
    setIsDragging,
) {
    const updateProgressOnEvent = (e) => {
        const rect = progressBar.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;

        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        return offsetX / rect.width;
    };

    progressBar.addEventListener("pointerdown", (e) => {
        if (!audio.src || audio.readyState === 0) {
            return;
        }

        e.preventDefault();
        setIsDragging(true);
        progressBar.classList.add("is-dragging");
        progressBar.setPointerCapture(e.pointerId);

        const percent = updateProgressOnEvent(e);
        progressFill.style.width = `${percent * 100}%`;
        progressHandle.style.left = `${percent * 100}%`;
    });

    progressBar.addEventListener("pointermove", (e) => {
        if (!getIsDragging()) return;
        const percent = updateProgressOnEvent(e);
        progressFill.style.width = `${percent * 100}%`;
        progressHandle.style.left = `${percent * 100}%`;

        if (audio.duration && !isNaN(audio.duration)) {
            timeStart.textContent = formatDuration(percent * audio.duration);
        }
    });

    progressBar.addEventListener("pointerup", (e) => {
        if (!getIsDragging()) return;
        setIsDragging(false);
        progressBar.classList.remove("is-dragging");
        progressBar.releasePointerCapture(e.pointerId);

        const percent = updateProgressOnEvent(e);
        if (!audio.duration || isNaN(audio.duration)) return;
        audio.currentTime = percent * audio.duration;
    });

    progressBar.addEventListener("pointercancel", (e) => {
        if (!getIsDragging()) return;
        setIsDragging(false);
        progressBar.classList.remove("is-dragging");
        progressBar.releasePointerCapture(e.pointerId);
    });
}
