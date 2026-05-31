import { getUniversalSearch } from "../api/search.js";
import searchPage from "./searchPage.js";
import renderArtistSearchPage from "../components/renderArtistSearchPage.js";
import renderAlbumAndSongSearchPage from "../components/renderAlbumAndSongSearchPage.js";
import httpRequest from "../api/httpRequest.js";
import playTrack from "../player/playTrack.js";
import { toast } from "../components/toast.js";
import { sidebarReadyPromise } from "./initSidebarController.js";
import { getMyLikeTracks } from "../api/tracks.js";
import { handleLikeClick } from "../utils/likeHandler.js";

function checkIsFollowedFromSidebar(id) {
    const sidebar = document.querySelector(".library-content");
    if (!sidebar) return false;

    const exists = sidebar.querySelector(`[data-id="${id}"]`);
    return !!exists;
}

export async function initSearchPage(query) {
    const appContentContainer = document.getElementById("content-container");
    if (!appContentContainer) return;

    appContentContainer.innerHTML = searchPage();

    const contentContainer = document.querySelector(".search-page-content");
    const tabs = document.querySelectorAll(".filter-tab");

    // Khởi tạo rawData chuẩn cấu trúc bảo vệ
    let rawData = { songs: [], artists: [], albums: [] };

    if (!query) {
        contentContainer.innerHTML = `<div class="no-results">Please enter a keyword to search.</div>`;
        return;
    }

    try {
        const [searchRes, likedTracksRes] = await Promise.all([
            getUniversalSearch(query),
            getMyLikeTracks().catch(() => ({ tracks: [] })),
        ]);

        // Sửa lỗi đọc thuộc tính an toàn cho Set ID
        const likedTrackIds = new Set(
            ((likedTracksRes && likedTracksRes.tracks) || []).map(
                (track) => track.id,
            ),
        );

        function renderByTab(currentTab) {
            contentContainer.innerHTML = "";
            let dataToRender = [];

            if (currentTab === "all") {
                dataToRender = [
                    ...rawData.songs,
                    ...rawData.artists,
                    ...rawData.albums,
                ];
            } else {
                dataToRender = rawData[currentTab] || [];
            }

            if (dataToRender.length === 0) {
                contentContainer.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
                return;
            }

            const artistsList = dataToRender.filter(
                (item) => item.type === "artist",
            );
            const otherList = dataToRender.filter(
                (item) => item.type !== "artist",
            );

            if (artistsList.length > 0)
                renderArtistSearchPage(artistsList, true);
            if (otherList.length > 0)
                renderAlbumAndSongSearchPage(otherList, true);
        }

        function processAndRenderSearch() {
            const rawResults = searchRes.results || {};

            rawData = {
                songs: (rawResults.tracks || []).map((track) => ({
                    id: track.id,
                    name: track.title,
                    image: track.image_url,
                    subText: `Song • ${track.additional_info?.artist_name || "Unknown Artist"}`,
                    type: "song",
                    is_liked: likedTrackIds.has(track.id),
                })),
                artists: (rawResults.artists || []).map((artist) => ({
                    id: artist.id,
                    name: artist.title,
                    image: artist.image_url,
                    subText: "Artist",
                    type: "artist",
                    is_followed: checkIsFollowedFromSidebar(artist.id),
                })),
                albums: (rawResults.albums || []).map((album) => ({
                    id: album.id,
                    name: album.title,
                    image: album.image_url,
                    subText: `Album • ${album.additional_info?.artist_name || "Unknown"}`,
                    type: "album",
                    is_liked: checkIsFollowedFromSidebar(album.id),
                })),
            };

            renderByTab("all");
        }

        await sidebarReadyPromise;
        processAndRenderSearch();

        // Xử lý sự kiện click chuyển Tab mượt mà không lo mất bộ nhớ RAM
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                tabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");

                const currentTab = tab.dataset.type || "all";

                renderByTab(currentTab);
            });
        });
    } catch (error) {
        console.error("Lỗi khởi tạo trang tìm kiếm:", error);
        contentContainer.innerHTML = `<div class="no-results">Something went wrong.</div>`;
    }

    // Sự kiện tương tác click lên các phần tử
    contentContainer.addEventListener("click", async (e) => {
        // ================= XỬ LÝ FOLLOW ARTIST =================
        const followArtistBtn = e.target.closest(".search-item-follow");
        if (followArtistBtn) {
            e.stopPropagation();
            const id = followArtistBtn.dataset.id;
            const currentArtist = rawData.artists.find(
                (artist) => artist.id === id,
            );

            if (!currentArtist) return;

            const isCurrentlyFollowing =
                followArtistBtn.classList.contains("followed") ||
                followArtistBtn.innerText.trim() === "Following";

            try {
                if (isCurrentlyFollowing) {
                    await httpRequest.del(`/artists/${id}/follow`);
                    currentArtist.is_followed = false;
                    followArtistBtn.innerText = "Follow";
                    followArtistBtn.classList.remove("followed");
                } else {
                    await httpRequest.post(`/artists/${id}/follow`);
                    currentArtist.is_followed = true;
                    followArtistBtn.innerText = "Following";
                    followArtistBtn.classList.add("followed");
                }
                document.dispatchEvent(new CustomEvent("libraryChanged"));
            } catch (error) {
                console.error(error);
            }
            return;
        }

        // ================= XỬ LÝ LIKE SONGS / ALBUMS =================
        const likeBtn = e.target.closest(".search-item-like");
        if (likeBtn) {
            e.stopPropagation();

            await handleLikeClick(likeBtn);

            // Cập nhật lại RAM riêng của trang search
            const id = likeBtn.dataset.id;
            const type = likeBtn.dataset.type;
            const currentItem =
                type === "song"
                    ? rawData.songs.find((s) => s.id === id)
                    : rawData.albums.find((a) => a.id === id);

            if (currentItem) {
                currentItem.is_liked = likeBtn.classList.contains("liked");
            }
            return;
        }

        // ================= HƯỚNG TRANG HOẶC PHÁT NHẠC =================
        const item = e.target.closest(".search-item");
        if (!item) return;

        const id = item.dataset.id;
        const type = item.dataset.type;

        if (type === "song") {
            try {
                const trackDetail = await httpRequest.get(`/tracks/${id}`);
                playTrack([trackDetail], 0);

                contentContainer
                    .querySelectorAll(".search-item.active")
                    .forEach((activeItem) => {
                        activeItem.classList.remove("active");
                    });
                item.classList.add("active");
            } catch (error) {
                console.log(error);
            }
        } else if (type === "artist") {
            window.location.hash = `#/artists/${id}`;
        } else if (type === "album") {
            window.location.hash = `#/albums/${id}`;
        }
    });
}
