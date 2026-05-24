import renderPlaylistContextMenu from "./renderPlaylistContextMenu.js";
import { deletePlaylist } from "../api/playlist.js";
import { openRenameModal } from "./renameModalController.js";

function initPlaylistContextMenu() {
    document.addEventListener("contextmenu", (e) => {
        const playlistItem = e.target.closest(".library-item");

        if (!playlistItem) return;

        e.preventDefault();
        removeExistingMenu();

        const menuWrapper = document.createElement("div");
        menuWrapper.innerHTML = renderPlaylistContextMenu();
        const menu = menuWrapper.firstElementChild;

        document.body.appendChild(menu);

        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;

        const nameEl = playlistItem.querySelector(".item-title");

        const playlist = {
            id: playlistItem.dataset.id,
            name: nameEl ? nameEl.textContent.trim() : "",
        };

        // Truyền thêm cả thẻ `nameEl` vào hàm để lát nữa đổi chữ trực tiếp
        initMenuActions(menu, playlist, nameEl);
    });

    document.addEventListener("click", () => {
        removeExistingMenu();
    });
}

function removeExistingMenu() {
    const oldMenu = document.querySelector(".playlist-context-menu");
    if (oldMenu) {
        oldMenu.remove();
    }
}

function initMenuActions(menu, playlist, nameEl) {
    const renameBtn = menu.querySelector(".rename-playlist");
    const deleteBtn = menu.querySelector(".delete-playlist");

    renameBtn.addEventListener("click", () => {
        openRenameModal(playlist.id, playlist.name, (newVersionName) => {
            if (nameEl) {
                nameEl.textContent = newVersionName;
            }

            const hash = window.location.hash;
            if (hash === `#/playlists/${playlist.id}`) {
                // Bạn thay class chuẩn tiêu đề lớn trên trang playlist của bạn vào đây nhé
                const headerTitle = document.querySelector(".playlist-title");
                if (headerTitle) headerTitle.textContent = newVersionName;
            }
        });
    });

    // delete
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
