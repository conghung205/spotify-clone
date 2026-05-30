function formatDuration(duration) {
    const currentSeconds = Math.floor(duration);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;

    const pad = (n) => String(n).padStart(2, "0");
    const formatTime = `${pad(minutes)}:${pad(seconds)}`;
    return formatTime;
}

export default formatDuration;

export function formatDurationFullText(duration) {
    if (!duration || isNaN(duration)) return "0 min 0 sec";

    const currentSeconds = Math.floor(duration);
    const hours = Math.floor(currentSeconds / 3600);
    const minutes = Math.floor((currentSeconds % 3600) / 60);
    const seconds = currentSeconds % 60;

    if (hours > 0) {
        return `${hours} hr ${minutes} min`;
    }

    return `${minutes} min ${seconds} sec`;
}
