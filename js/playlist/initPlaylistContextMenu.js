import renderPlaylistContextMenu from "./renderPlaylistContextMenu.js";
import { deletePlaylist, removeTrackFromPlaylist } from "../api/playlist.js";
import { openRenameModal } from "./renameModalController.js";

function initPlaylistContextMenu(onTrackRemoved) {
    document.addEventListener("contextmenu", (e) => {
        const playlistItem = e.target.closest(".library-item");
        const trackItem = e.target.closest(".playlist-row");

        if (!playlistItem && !trackItem) return;

        e.preventDefault();
        removeExistingMenu();

        if (playlistItem) {
            handleLibraryMenu(e, playlistItem);
        } else if (trackItem) {
            handleTrackMenu(e, trackItem, false, onTrackRemoved);
        }
    });

    // btn options
    document.addEventListener("click", (e) => {
        const menuBtn = e.target.closest(".pl-menu-btn");
        const playlistOptionsBtn = e.target.closest("#btn-options-playlist");

        if (menuBtn) {
            e.stopPropagation();
            removeExistingMenu();

            const trackItem = menuBtn.closest(".playlist-row");
            if (trackItem) {
                handleTrackMenu(e, trackItem, true, menuBtn, onTrackRemoved);
            }
        } else if (playlistOptionsBtn) {
            e.stopPropagation();
            removeExistingMenu();
            handlePlaylistHeaderMenu(e, playlistOptionsBtn);
        } else {
            removeExistingMenu();
        }
    });
}

function handlePlaylistHeaderMenu(e, optionsBtn) {
    const menuWrapper = document.createElement("div");

    menuWrapper.innerHTML = renderPlaylistContextMenu({ type: "sidebar" });
    const menu = menuWrapper.firstElementChild;

    document.body.appendChild(menu);

    menu.style.position = "absolute";
    menu.style.display = "flex";
    menu.style.zIndex = "9999";

    const rect = optionsBtn.getBoundingClientRect();
    menu.style.left = `${rect.left + window.scrollX}px`;
    menu.style.top = `${rect.bottom + window.scrollY + 8}px`;

    const playlistId = window.location.hash.split("/").pop();
    const headerTitleEl = document.querySelector(".playlist-title");

    const playlist = {
        id: playlistId,
        name: headerTitleEl ? headerTitleEl.textContent.trim() : "",
    };

    const sidebarNameEl = document.querySelector(
        `.library-item[data-id="${playlistId}"] .item-title`,
    );

    initPlaylistMenuActions(menu, playlist, sidebarNameEl);
}

function removeExistingMenu() {
    const oldMenu = document.querySelector(
        ".playlist-context-menu, .context-menu",
    );
    if (oldMenu) oldMenu.remove();
}

//PLAYLIST SIDEBAR
function handleLibraryMenu(e, playlistItem) {
    const menuWrapper = document.createElement("div");
    menuWrapper.innerHTML = renderPlaylistContextMenu({ type: "sidebar" });
    const menu = menuWrapper.firstElementChild;

    document.body.appendChild(menu);

    menu.style.position = "absolute";
    menu.style.display = "flex";
    menu.style.zIndex = "9999";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    const nameEl = playlistItem.querySelector(".item-title");
    const playlist = {
        id: playlistItem.dataset.id,
        name: nameEl ? nameEl.textContent.trim() : "",
    };

    initPlaylistMenuActions(menu, playlist, nameEl);
}

// Track in playlist
function handleTrackMenu(
    e,
    trackItem,
    isClickBtn = false,
    menuBtn = null,
    onTrackRemoved,
) {
    const menuWrapper = document.createElement("div");

    menuWrapper.innerHTML = renderPlaylistContextMenu({
        type: "playlistTrack",
    });

    const menu = menuWrapper.firstElementChild;
    document.body.appendChild(menu);

    menu.style.position = "absolute";
    menu.style.display = "block";
    menu.style.zIndex = "9999";

    // ĐỊNH VỊ MENU
    if (isClickBtn && menuBtn) {
        const rect = menuBtn.getBoundingClientRect();
        menu.style.left = `${rect.left - 160 + window.scrollX}px`;
        menu.style.top = `${rect.bottom + window.scrollY + 4}px`;
    } else {
        menu.style.left = `${e.pageX}px`;
        menu.style.top = `${e.pageY}px`;
    }

    const trackId = trackItem.getAttribute("data-id");
    const playlistId = window.location.hash.split("/").pop();

    // Gắn sự kiện xóa bài hát
    const deleteTrackBtn = menu.querySelector(".delete-track-action");
    deleteTrackBtn.onclick = async () => {
        try {
            await removeTrackFromPlaylist(playlistId, trackId);

            trackItem.remove();
            updateTrackNumbers();

            if (typeof onTrackRemoved === "function") {
                onTrackRemoved(trackId);
            }
        } catch (error) {
            console.error("Lỗi khi xóa bài hát:", error);
        } finally {
            removeExistingMenu();
        }
    };
}

// updateTrackNumbers when delete
function updateTrackNumbers() {
    const rows = document.querySelectorAll(".playlist-tbody .playlist-row");
    rows.forEach((row, index) => {
        const numEl = row.querySelector(".pl-cell-number");
        if (numEl) numEl.textContent = index + 1;
    });
}

// initPlaylistMenuActions
function initPlaylistMenuActions(menu, playlist, nameEl) {
    const renameBtn = menu.querySelector(".rename-playlist");
    const deleteBtn = menu.querySelector(".delete-playlist");

    renameBtn.addEventListener("click", () => {
        openRenameModal(playlist.id, playlist.name, (newVersionName) => {
            if (nameEl) nameEl.textContent = newVersionName;
            const hash = window.location.hash;
            if (hash === `#/playlists/${playlist.id}`) {
                const headerTitle = document.querySelector(".playlist-title");
                if (headerTitle) headerTitle.textContent = newVersionName;
            }
        });
    });

    deleteBtn.onclick = async () => {
        const confirmed = confirm(`Delete "${playlist.name}" ?`);
        if (!confirmed) return;

        try {
            await deletePlaylist(playlist.id);
            const playlistElement = document.querySelector(
                `[data-id="${playlist.id}"]`,
            );
            playlistElement?.remove();

            const hash = window.location.hash;
            if (hash === `#/playlists/${playlist.id}`) {
                window.location.hash = "/";
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export default initPlaylistContextMenu;
