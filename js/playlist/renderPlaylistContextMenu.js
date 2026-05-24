function renderPlaylistContextMenu() {
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

export default renderPlaylistContextMenu;
