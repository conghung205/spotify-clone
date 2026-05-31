import collectionTrackItem from "./collectionTrackItem.js";
function collectionTracks(tracks) {
    // console.log(tracks);

    return `
         <table class="collection-table">
            <thead>
                <tr class="collection-th-row">
                    <th class="cl-th-number">#</th>
                    <th class="cl-th-title">Title</th>
                    <th class="cl-th-date">Date added</th>
                    <th class="cl-th-duration"><i class="fa-regular fa-clock"></i></th>
                    <th class="cl-th-menu"></th>
                </tr>
            </thead>
            <tbody class="collection-tbody">
                ${tracks
                    .map((track, index) => collectionTrackItem(track, index))
                    .join("")}
            </tbody>
        </table>
    `;
}

export default collectionTracks;
