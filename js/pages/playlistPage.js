import playlistHeader from "../components/playlistHeader.js";
import playlistEditModal from "../components/playlistEditModal.js";
import playlistControls from "../components/playlistControls.js";
import emptyPlaylistControls from "../components/emptyPlaylistControls.js";

function playlistPage(playlist) {
    return `
    <div class="playlist-page">

        <div class="playlist-header-container">
            ${playlistHeader(playlist)}
        </div>

        ${playlist.total_tracks > 0 ? playlistControls() : emptyPlaylistControls()}

        <section class="playlist-search">
            <div>
                <h3 class="title">Let's find something for your playlist</h3>
                <div class="search-input-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="Search songs..."
                        class="search-input"
                    />
                </div>
            </div>

            <div class="close-playlist-search">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </section>

        <section class="playlist-content">
            No songs yet
        </section>

        ${playlistEditModal(playlist)}

    </div>`;
}
export default playlistPage;
