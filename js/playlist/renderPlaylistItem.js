function renderPlaylistItem(item) {
    return `
        <div
            class="library-item"
            data-id="${item.id}"
            data-type="${item.type || "playlist "}"
        >
            <img
                src="${item.image || "placeholder.svg?height=48&width=48"}"
                class="item-image"
            />

            <div class="item-info">
                <div class="item-title">
                    ${item.name}
                </div>

                <div class="item-subtitle">
                    ${item.subText}
                </div>
            </div>
        </div>
    `;
}

export default renderPlaylistItem;
