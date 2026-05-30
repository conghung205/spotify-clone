export function syncSidebarActiveState() {
    const container = document.querySelector(".library-content");
    if (!container) return;

    const hash = window.location.hash;

    const currentActive = container.querySelector(".library-item.active");
    if (currentActive) {
        currentActive.classList.remove("active");
    }

    if (!hash) return;

    const parts = hash.split("/");
    if (parts.length < 3) return;

    const hashType = parts[1];
    const currentId = parts[2];
    if (!currentId) return;

    // Chuyển từ số nhiều trên URL về số ít của data-type HTML
    const typeMapping = {
        playlists: "playlist",
        albums: "album",
        artists: "artist",
    };

    const dataType = typeMapping[hashType];
    if (!dataType) return;

    // Tìm thẻ có cả data-id và data-type trùng khớp
    const targetItem = container.querySelector(
        `.library-item[data-id="${currentId}"][data-type="${dataType}"]`,
    );

    if (targetItem) {
        targetItem.classList.add("active");
    }
}
