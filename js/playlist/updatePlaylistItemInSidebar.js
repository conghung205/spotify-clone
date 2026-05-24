import renderPlaylistItem from "./renderPlaylistItem.js";

export function updatePlaylistItemInSidebar(playlist) {
    const item = document.querySelector(
        `.library-item[data-id="${playlist.id}"]`,
    );

    if (item) {
        item.outerHTML = renderPlaylistItem(playlist);
    }
}

export default updatePlaylistItemInSidebar;
