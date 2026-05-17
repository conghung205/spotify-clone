function formatDuration(duration) {
    const currentSeconds = Math.floor(duration);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;

    const pad = (n) => String(n).padStart(2, "0");
    const formatTime = `${pad(minutes)}:${pad(seconds)}`;
    return formatTime;
}

export default formatDuration;
