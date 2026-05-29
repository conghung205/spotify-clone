import playlistTrackItem from "./playlistTrackItem.js";

function playlistContentTracks(tracks) {
    return `
        <table class="playlist-table">
            <thead>
                <tr class="playlist-th-row">
                    <th class="pl-th-number">#</th>
                    <th class="pl-th-title">Title</th>
                    <th class="pl-th-date">Date added</th>
                    <th class="pl-th-duration"><i class="fa-regular fa-clock"></i></th>
                    <th class="pl-th-menu"></th>
                </tr>
            </thead>
            <tbody class="playlist-tbody">
                ${tracks
                    .map((track, index) => playlistTrackItem(track, index))
                    .join("")}
            </tbody>
        </table>

        
    `;
}

export default playlistContentTracks;
