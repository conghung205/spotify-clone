function renderPlaylistItem(playlist) {
    return `
        <div
            class="library-item"
            data-id="${playlist.id}"
        >
            <img
                src="${playlist.image_url || "placeholder.svg?height=48&width=48"}"
                class="item-image"
            />

            <div class="item-info">
                <div class="item-title">
                    ${playlist.name}
                </div>

                <div class="item-subtitle">
                    Playlist
                </div>
            </div>
        </div>
    `;
}

export default renderPlaylistItem;
