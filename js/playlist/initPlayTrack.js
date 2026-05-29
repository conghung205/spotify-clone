import playTrack from "../player/playTrack.js";

export function initPlayTrack() {
    const tbody = document.querySelector(".playlist-tbody");
    if (!tbody) return;

    tbody.addEventListener("click", (e) => {
        if (e.target.closest(".pl-menu-btn")) return;

        const row = e.target.closest(".playlist-row");
        if (!row) return;

        const clickedIndex = parseInt(row.getAttribute("data-index"), 10);

        const allRows = tbody.querySelectorAll(".playlist-row");
        const playlist = Array.from(allRows).map((trackRow) => {
            return {
                id: trackRow.getAttribute("data-id"),
                audio_url: trackRow.getAttribute("data-audio"),
                track_title: trackRow
                    .querySelector(".pl-name")
                    ?.textContent.trim(),
                artist_name: trackRow
                    .querySelector(".pl-artist")
                    ?.textContent.trim(),
                track_image_url: trackRow
                    .querySelector(".pl-image img")
                    ?.getAttribute("src"),
                track_duration:
                    Number(trackRow.getAttribute("data-duration")) || 0,
            };
        });

        console.log(playlist);

        if (playlist.length > 0 && !isNaN(clickedIndex)) {
            playTrack(playlist, clickedIndex);
        }
    });
}

export default initPlayTrack;
