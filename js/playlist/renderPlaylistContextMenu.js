function renderPlaylistContextMenu({ type }) {
    return `
        ${
            type === "sidebar"
                ? `<div class="playlist-context-menu">

                <button class="context-item rename-playlist">
                    Rename
                </button>

                <button class="context-item delete-playlist">
                    Delete
                </button>

            </div>`
                : `
                <div id="playlist-context-menu" class="context-menu">
                    <ul class="context-menu-list">
                        <li class="context-menu-item delete-track-action">
                            <i class="fa-regular fa-trash-can"></i>
                            <span>Remove from this playlist</span>
                        </li>
                    </ul>
                </div>`
        }
    `;
}

export default renderPlaylistContextMenu;
