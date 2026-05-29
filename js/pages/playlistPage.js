import playlistHeader from "../components/playlistHeader.js";
import playlistEditModal from "../components/playlistEditModal.js";
import playlistControls from "../components/playlistControls.js";
import emptyPlaylistControls from "../components/emptyPlaylistControls.js";

function playlistPage(playlist) {
    const hasTracks = playlist.total_tracks > 0;

    return `
    <div class="playlist-page">

        <div class="playlist-header-container">
            ${playlistHeader(playlist)}
        </div>

        <div class="playlist-controls-wrapper">
            ${hasTracks ? playlistControls() : emptyPlaylistControls()}
        </div>

        <section class="playlist-content">
            ${hasTracks ? "" : '<div class="empty-msg">No songs yet</div>'}
        </section>

        <div id="search-or-recommended-section" class="search-or-recommended-section">
            
            <section class="playlist-search" style="display: ${hasTracks ? "none" : "flex"};">
                <div class="search-box-container">
                    <h3 class="title">Let's find something for your playlist</h3>
                    <div class="search-input-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            id="search-playlist"
                            placeholder="Search songs or artists..."
                            class="search-input"
                        />
                    </div>
                </div>

                <div class="close-playlist-search">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </section>

            <div class="btn-find-more" style="display: ${hasTracks ? "block" : "none"};">find more</div>

            <div id="search-or-recommended-results" class="dynamic-results-container"></div>

        </div>

        ${playlistEditModal(playlist)}

    </div>`;
}

export default playlistPage;
