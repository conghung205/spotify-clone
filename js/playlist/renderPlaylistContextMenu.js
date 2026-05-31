function renderPlaylistContextMenu({ type }) {
    if (type === "sidebar") {
        return `
            <div class="playlist-context-menu">
                <button class="context-item rename-playlist">
                    Rename
                </button>
                <button class="context-item delete-playlist">
                    Delete
                </button>
            </div>
        `;
    }

    if (type === "album") {
        return `
            <div class="context-menu">
                <ul class="context-menu-list">
                    <li class="context-menu-item unlike-album-action">
                        <i class="fa-regular fa-trash-can"></i>
                        <span>Unlike Album</span>
                    </li>
                </ul>
            </div>
        `;
    }

    if (type === "artist") {
        return `
            <div class="context-menu">
                <ul class="context-menu-list">
                    <li class="context-menu-item unfollow-artist-action">
                        <i class="fa-regular fa-trash-can"></i>
                        <span>Unfollow Artist</span>
                    </li>
                </ul>
            </div>
        `;
    }
    if (type === "likedSongsPlaylist") {
        return `
            <div class="context-menu">
                <ul class="context-menu-list">
                    <li class="context-menu-item clear-liked-songs-action">
                        <i class="fa-regular fa-trash-can"></i>
                        <span>Clear & Remove List</span>
                    </li>
                </ul>
            </div>
        `;
    }

    // mặc định
    return `
        <div id="playlist-context-menu" class="context-menu">
            <ul class="context-menu-list">
                <li class="context-menu-item delete-track-action">
                    <i class="fa-regular fa-trash-can"></i>
                    <span>Remove from this playlist</span>
                </li>
            </ul>
        </div>
    `;
}

export default renderPlaylistContextMenu;
