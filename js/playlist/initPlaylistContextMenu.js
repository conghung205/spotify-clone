import renderPlaylistContextMenu from "./renderPlaylistContextMenu.js";
import { deletePlaylist, removeTrackFromPlaylist } from "../api/playlist.js";
import { openRenameModal } from "./renameModalController.js";
import httpRequest from "../api/httpRequest.js";
import { toast } from "../components/toast.js";

function initPlaylistContextMenu(onTrackRemoved) {
    document.addEventListener("contextmenu", (e) => {
        // Mở rộng selector để bắt tất cả các loại library item dựa trên data-type
        const playlistItem = e.target.closest(
            '.library-item[data-type="playlist"]',
        );
        const albumItem = e.target.closest('.library-item[data-type="album"]');
        const artistItem = e.target.closest(
            '.library-item[data-type="artist"]',
        );
        const songPlaylistItem = e.target.closest(
            '.library-item[data-type="song"]',
        );

        const trackItem = e.target.closest(".playlist-row");

        if (
            !playlistItem &&
            !trackItem &&
            !albumItem &&
            !artistItem &&
            !songPlaylistItem
        )
            return;

        e.preventDefault();
        removeExistingMenu();

        if (playlistItem) {
            handleLibraryMenu(e, playlistItem);
        } else if (albumItem) {
            handleAlbumMenu(e, albumItem);
        } else if (artistItem) {
            handleArtistMenu(e, artistItem);
        } else if (songPlaylistItem) {
            // 2. Điều hướng qua hàm xử lý riêng
            handleLikedSongsMenu(e, songPlaylistItem);
        } else if (trackItem) {
            handleTrackMenu(e, trackItem, false, null, onTrackRemoved);
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

// CONTEXT MENU PLAYLIST SIDEBAR
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

// CONTEXT MENU CHO ALBUM SIDEBAR
function handleAlbumMenu(e, albumItem) {
    const menuWrapper = document.createElement("div");
    // Gửi type thích hợp vào hàm render để sinh ra UI có nút "Unlike Album"
    menuWrapper.innerHTML = renderPlaylistContextMenu({ type: "album" });
    const menu = menuWrapper.firstElementChild;

    document.body.appendChild(menu);

    menu.style.position = "absolute";
    menu.style.display = "flex";
    menu.style.zIndex = "9999";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    const albumId = albumItem.dataset.id;
    const nameEl = albumItem.querySelector(".item-title");
    const albumName = nameEl ? nameEl.textContent.trim() : "this album";

    // Tìm nút unlike trong giao diện menu vừa sinh ra
    const unlikeBtn = menu.querySelector(".unlike-album-action");
    if (unlikeBtn) {
        unlikeBtn.onclick = async () => {
            const confirmed = confirm(`Unlike "${albumName}"?`);
            if (!confirmed) return;

            try {
                await httpRequest.del(`/albums/${albumId}/like`);
                albumItem.remove();
            } catch (error) {
                console.error("Lỗi khi unlike album:", error);
            } finally {
                removeExistingMenu();
            }
        };
    }
}

// CONTEXT MENU ARTIST SIDEBAR
function handleArtistMenu(e, artistItem) {
    const menuWrapper = document.createElement("div");

    menuWrapper.innerHTML = renderPlaylistContextMenu({ type: "artist" });
    const menu = menuWrapper.firstElementChild;

    document.body.appendChild(menu);

    menu.style.position = "absolute";
    menu.style.display = "flex";
    menu.style.zIndex = "9999";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    const artistId = artistItem.dataset.id;
    const nameEl = artistItem.querySelector(".item-title");
    const artistName = nameEl ? nameEl.textContent.trim() : "this artist";

    // Tìm nút unfollow trong giao diện menu vừa sinh ra
    const unfollowBtn = menu.querySelector(".unfollow-artist-action");
    console.log(unfollowBtn);

    if (unfollowBtn) {
        unfollowBtn.onclick = async () => {
            const confirmed = confirm(`Unfollow "${artistName}"?`);
            if (!confirmed) return;

            try {
                await httpRequest.del(`/artists/${artistId}/follow`);
                artistItem.remove();
            } catch (error) {
                console.error("Lỗi khi unfollow artist:", error);
            } finally {
                removeExistingMenu();
            }
        };
    }
}

// CONTEXT MENU LIKED SONGS
function handleLikedSongsMenu(e, songItem) {
    const menuWrapper = document.createElement("div");
    menuWrapper.innerHTML = renderPlaylistContextMenu({
        type: "likedSongsPlaylist",
    });
    const menu = menuWrapper.firstElementChild;

    document.body.appendChild(menu);

    menu.style.position = "absolute";
    menu.style.display = "flex";
    menu.style.zIndex = "9999";
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    const nameEl = songItem.querySelector(".item-title");
    const itemName = nameEl ? nameEl.textContent.trim() : "Liked Songs";

    const clearBtn = menu.querySelector(".clear-liked-songs-action");
    if (clearBtn) {
        clearBtn.onclick = async () => {
            const confirmed = confirm(
                `Are you sure you want to unlike all songs and remove "${itemName}"?`,
            );
            if (!confirmed) return;

            // Hiển thị trạng thái chờ hoặc đổi cursor để user biết app đang xử lý ngầm
            document.body.style.cursor = "wait";

            try {
                const response = await httpRequest.get(
                    "/me/tracks/liked?limit=20&offset=0",
                );
                const likedTracks = response.tracks || [];

                if (likedTracks.length > 0) {
                    const unlikePromises = likedTracks.map((track) =>
                        httpRequest
                            .del(`/tracks/${track.id}/like`)
                            .catch((err) => {
                                console.error(
                                    `Lỗi khi unlike bài ${track.id}:`,
                                    err,
                                );
                                return null;
                            }),
                    );

                    // Chạy song song tất cả các request bỏ like
                    await Promise.all(unlikePromises);
                }

                // Xóa item "Liked Songs" khỏi Sidebar UI sau khi hoàn tất
                songItem.remove();

                // Nếu đang đứng ở trang Liked Songs thì đẩy về trang chủ
                if (window.location.hash.includes(songItem.dataset.id)) {
                    window.location.hash = "/";
                }

                toast({
                    type: "success",
                    title: "Success",
                    message:
                        "All favorite songs have been successfully deleted!",
                });
            } catch (error) {
                console.error("Lỗi hệ thống khi clear danh sách:", error);
                toast({
                    type: "error",
                    title: "Error",
                    message: "Failed to clear some songs. Please try again.",
                });
            } finally {
                document.body.style.cursor = "default";
                removeExistingMenu();
            }
        };
    }
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

    const deleteTrackBtn = menu.querySelector(".delete-track-action");
    if (deleteTrackBtn) {
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

    if (renameBtn) {
        renameBtn.addEventListener("click", () => {
            openRenameModal(playlist.id, playlist.name, (newVersionName) => {
                if (nameEl) nameEl.textContent = newVersionName;
                const hash = window.location.hash;
                if (hash === `#/playlists/${playlist.id}`) {
                    const headerTitle =
                        document.querySelector(".playlist-title");
                    if (headerTitle) headerTitle.textContent = newVersionName;
                }
            });
        });
    }

    if (deleteBtn) {
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
                toast({
                    type: "success",
                    title: "Success",
                    message: "Playlist deleted successfully.",
                });
            } catch (error) {
                console.error(error);
            }
        };
    }
}

export default initPlaylistContextMenu;
