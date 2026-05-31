import collectionPage from "./collectionPage.js";
import { syncUIState } from "../utils/syncUIState.js";
import { getMyLikeTracks } from "../api/tracks.js";
import collectionTracks from "../components/collectionTracks.js";
import playTrack from "../player/playTrack.js";
import { handleLikeClick } from "../utils/likeHandler.js";

// lưu trữ hàng đang chọn
let activeRowForContextMenu = null;
// Ẩn menu khi click chuột trái ra ngoài
document.addEventListener("click", (e) => {
    const contextMenu = document.getElementById("collection-context-menu");
    if (contextMenu && !contextMenu.contains(e.target)) {
        contextMenu.style.display = "none";
    }
});

async function initCollectionPage() {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    contentContainer.innerHTML = collectionPage();

    try {
        const res = await getMyLikeTracks();
        const tracks = (res.tracks || []).map((track) => ({
            ...track,
            is_liked: true,
        }));

        const tracksContents = document.querySelector(
            ".collection-tracks-container",
        );
        if (tracks.length === 0) {
            tracksContents.innerHTML =
                '<div class="no-results">Chưa có bài hát yêu thích nào!</div>';
            return;
        }
        tracksContents.innerHTML = collectionTracks(tracks);

        const tbody = document.querySelector(".collection-tbody");
        if (!tbody) return;

        // click
        tbody.addEventListener("click", async (e) => {
            // like songs
            const likeBtn = e.target.closest(".btn-like-track");
            if (likeBtn) {
                e.stopPropagation();

                await handleLikeClick(likeBtn);

                if (!likeBtn.classList.contains("liked")) {
                    const row = likeBtn.closest(".collection-row");
                    if (row) {
                        row.style.opacity = "0";
                        row.style.transform = "translateX(-20px)";
                        row.style.transition = "all 0.3s ease";

                        setTimeout(() => {
                            row.remove();

                            // Cập nhật lại số thứ tự (index + 1) của các bài hát còn lại cho đẹp giao diện
                            const allRemainingRows =
                                tbody.querySelectorAll(".collection-row");
                            allRemainingRows.forEach((r, idx) => {
                                const numText =
                                    r.querySelector(".track-num-text");
                                if (numText) numText.textContent = idx + 1;
                                // Cập nhật lại index để lúc sau bấm phát nhạc không bị lệch bài
                                r.setAttribute("data-index", idx);
                            });

                            // Nếu xóa hết bài hát thì hiển thị thông báo trống
                            if (allRemainingRows.length === 0) {
                                const tracksContents = document.querySelector(
                                    ".collection-tracks-container",
                                );
                                if (tracksContents) {
                                    tracksContents.innerHTML = `<div class="no-results">Chưa có bài hát yêu thích nào!</div>`;
                                }
                            }
                        }, 300);
                    }
                }
                return;
            }

            // player
            const row = e.target.closest(".collection-row");

            if (!row) return;

            const clickedIndex = parseInt(row.getAttribute("data-index"), 10);
            const allRows = tbody.querySelectorAll(".collection-row");
            const playlist = Array.from(allRows).map((trackRow) => {
                return {
                    id: trackRow.getAttribute("data-id"),
                    audio_url: trackRow.getAttribute("data-audio"),
                    track_title: trackRow
                        .querySelector(".cl-name")
                        ?.textContent.trim(),
                    artist_name: trackRow
                        .querySelector(".cl-artist")
                        ?.textContent.trim(),
                    track_image_url: trackRow
                        .querySelector(".cl-image img")
                        ?.getAttribute("src"),
                    track_duration:
                        Number(trackRow.getAttribute("data-duration")) || 0,
                };
            });

            allRows.forEach((row) => row.classList.remove("playing"));
            row.classList.add("playing");

            if (playlist.length > 0 && !isNaN(clickedIndex)) {
                playTrack(playlist, clickedIndex);
            }
        });

        // context menu
        const contextMenu = document.getElementById("collection-context-menu");

        tbody.addEventListener("contextmenu", (e) => {
            const row = e.target.closest(".collection-row");
            if (!row) return;

            e.preventDefault();

            activeRowForContextMenu = row;

            if (contextMenu) {
                contextMenu.style.top = `${e.clientY}px`;
                contextMenu.style.left = `${e.clientX}px`;
                contextMenu.style.display = "block";
            }
        });

        //click vào option xóa
        const removeLikeOption = contextMenu?.querySelector(
            ".remove-like-option",
        );
        if (removeLikeOption) {
            removeLikeOption.onclick = async () => {
                if (!activeRowForContextMenu) return;

                const likeBtn =
                    activeRowForContextMenu.querySelector(".btn-like-track");
                if (likeBtn) {
                    if (contextMenu) contextMenu.style.display = "none";
                    // Kích hoạt click ẩn để tái sử dụng toàn bộ logic xóa
                    likeBtn.click();
                }
            };
        }
    } catch (error) {
        console.log(error);
    }
    syncUIState();
}
export default initCollectionPage;
