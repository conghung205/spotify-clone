import { getMyPlaylists } from "../api/playlist.js";
import { getUserFollowArtists } from "../api/artist.js";
import { getMySavedAlbums } from "../api/album.js";
import { getMyLikeTracks } from "../api/tracks.js";
import renderPlaylistSidebar from "../playlist/renderPlaylistSidebar.js";
import renderArtistSidebar from "../components/renderArtistSidebar.js";
import { syncSidebarActiveState } from "../playlist/syncSidebarActiveState.js";

// Biến để giữ Promise của Sidebar
let sidebarResolveFn;
export const sidebarReadyPromise = new Promise((resolve) => {
    sidebarResolveFn = resolve;
});

export function initSidebarController(scopeSelector = "") {
    const sidebarState = {
        currentTab: "all",
        searchQuery: "",
    };

    let rawData = {
        playlists: [],
        albums: [],
        artists: [],
        tracks: [],
    };

    const prefix = scopeSelector ? `${scopeSelector} ` : "";

    const playlistTabBtn = document.querySelector(
        `${prefix}.nav-tab.nav-playlist`,
    );
    const artistsTabBtn = document.querySelector(
        `${prefix}.nav-tab.nav-artists`,
    );
    const albumsTabBtn = document.querySelector(`${prefix}.nav-tab.nav-albums`);
    const libraryContent = document.querySelector(`${prefix}.library-content`);
    const logo = document.querySelector(`${prefix}.logo i`);

    const searchContainer = document.querySelector(`${prefix}.search-library`);
    const searchBtn = document.querySelector(`${prefix}.search-library-btn`);
    const searchInput = document.querySelector(
        `${prefix}.header-library .search`,
    );

    if (!libraryContent) return;

    logo.addEventListener("click", () => {
        window.location.hash = "#/";
    });

    searchBtn?.addEventListener("click", (e) => {
        e.stopPropagation();

        searchContainer?.classList.toggle("show");

        if (searchContainer?.classList.contains("show")) {
            searchInput?.focus();
        } else {
            if (sidebarState.searchQuery) {
                sidebarState.searchQuery = "";
                if (searchInput) searchInput.value = "";
                renderLibraryWithFilter();
            }
        }
    });

    document.addEventListener("click", (e) => {
        if (
            searchContainer?.classList.contains("show") &&
            !searchContainer.contains(e.target) &&
            e.target !== searchBtn
        ) {
            searchContainer.classList.remove("show");
            if (sidebarState.searchQuery) {
                sidebarState.searchQuery = "";
                if (searchInput) searchInput.value = "";
                renderLibraryWithFilter();
            }
        }
    });

    libraryContent.addEventListener("click", (e) => {
        const libraryItem = e.target.closest(".library-item");

        if (libraryItem) {
            const id = libraryItem.dataset.id;
            const type = libraryItem.dataset.type;

            if (!id || !type) return;

            if (type === "song") {
                window.location.hash = `#/collection/tracks`;
            } else if (type === "artist") {
                window.location.hash = `#/artists/${id}`;
            } else if (type === "album") {
                window.location.hash = `#/albums/${id}`;
            } else if (type === "playlist") {
                window.location.hash = `#/playlists/${id}`;
            }
        }
    });

    // Chạy lần đầu khi khởi động
    fetchAllSidebarData();

    async function fetchAllSidebarData() {
        try {
            const [playlistsRes, artistsRes, albumsRes, tracksRes] =
                await Promise.all([
                    getMyPlaylists().catch(() => []),
                    getUserFollowArtists().catch(() => []),
                    getMySavedAlbums().catch(() => []),
                    getMyLikeTracks().catch(() => []),
                ]);

            const rawPlaylists = playlistsRes.playlists || playlistsRes || [];
            rawData.playlists = rawPlaylists.map((item) => ({
                id: item.id,
                name: item.name || item.title,
                image:
                    item.image_url ||
                    item.cover_image_url ||
                    "placeholder.svg?height=48&width=48",
                subText: `Playlist • ${item.user_display_name || "Me"}`,
                type: "playlist",
            }));

            const rawArtists = artistsRes.artists || artistsRes || [];
            rawData.artists = rawArtists.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image_url,
                subText: "Artist",
                type: "artist",
            }));

            const rawAlbums = albumsRes.albums || albumsRes || [];
            rawData.albums = rawAlbums.map((item) => ({
                id: item.id,
                name: item.title,
                image: item.cover_image_url,
                subText: `Album • ${item.artist_name}`,
                type: "album",
            }));

            const rawTracks = tracksRes.tracks || tracksRes || [];
            const totalLikedSongs =
                tracksRes.pagination?.total || rawTracks.length;

            if (totalLikedSongs > 0) {
                rawData.tracks = [
                    {
                        id: "liked-songs-id",
                        name: "Liked Songs",
                        image: "",
                        subText: `Playlist • ${totalLikedSongs} songs`,
                        type: "song",
                    },
                ];
            } else {
                rawData.tracks = [];
            }

            // HIỂN THỊ NÚT TAB
            if (rawData.playlists.length > 0 && playlistTabBtn)
                playlistTabBtn.classList.add("show");
            else playlistTabBtn?.classList.remove("show");

            if (rawData.artists.length > 0 && artistsTabBtn)
                artistsTabBtn.classList.add("show");
            else artistsTabBtn?.classList.remove("show");

            if (rawData.albums.length > 0 && albumsTabBtn)
                albumsTabBtn.classList.add("show");
            else albumsTabBtn?.classList.remove("show");

            renderLibraryWithFilter();

            //// Kích hoạt Promise báo hiệu dữ liệu Sidebar đã nạp xong vào DOM ổn định
            sidebarResolveFn(true);
        } catch (error) {
            console.error(error);
            sidebarResolveFn(false);
        }
    }

    // renderLibraryWithFilter
    function renderLibraryWithFilter() {
        let dataToRender = [];

        if (sidebarState.currentTab === "all") {
            dataToRender = [
                ...rawData.playlists,
                ...rawData.artists,
                ...rawData.albums,
            ];
        } else if (sidebarState.currentTab === "playlists") {
            dataToRender = [...rawData.playlists];
        } else if (sidebarState.currentTab === "artists") {
            dataToRender = [...rawData.artists];
        } else if (sidebarState.currentTab === "albums") {
            dataToRender = [...rawData.albums];
        }

        // Lọc mảng item theo từ khóa tìm kiếm
        if (sidebarState.searchQuery) {
            dataToRender = dataToRender.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(sidebarState.searchQuery.toLowerCase()),
            );
        }

        const likedSongsItem = rawData.tracks[0];
        let shouldRenderLikedSongs = false;

        // Liked Songs chỉ xuất hiện ở "all" hoặc "playlists"
        if (
            likedSongsItem &&
            (sidebarState.currentTab === "all" ||
                sidebarState.currentTab === "playlists")
        ) {
            if (sidebarState.searchQuery) {
                // Nếu có tìm kiếm, chữ "Liked Songs" phải khớp với từ khóa gõ vào
                if (
                    likedSongsItem.name
                        .toLowerCase()
                        .includes(sidebarState.searchQuery.toLowerCase())
                ) {
                    shouldRenderLikedSongs = true;
                }
            } else {
                shouldRenderLikedSongs = true;
            }
        }

        if (dataToRender.length === 0 && !shouldRenderLikedSongs) {
            libraryContent.innerHTML = `<div class="no-results-message">No items found</div>`;
            return;
        }

        libraryContent.innerHTML = "";

        if (sidebarState.currentTab === "all") {
            dataToRender.forEach((item) => {
                if (item.type === "artist") {
                    renderArtistSidebar([item], true, libraryContent);
                } else {
                    renderPlaylistSidebar([item], true, libraryContent);
                }
            });
        } else {
            if (sidebarState.currentTab === "playlists")
                renderPlaylistSidebar(dataToRender, false, libraryContent);
            if (sidebarState.currentTab === "albums")
                renderPlaylistSidebar(dataToRender, false, libraryContent);
            if (sidebarState.currentTab === "artists")
                renderArtistSidebar(dataToRender, false, libraryContent);
        }

        if (shouldRenderLikedSongs) {
            libraryContent.insertAdjacentHTML(
                "afterbegin",
                `
            <div class="library-item" data-id="${likedSongsItem.id}" data-type="${likedSongsItem.type}">
                <div class="item-icon liked-songs">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="item-info">
                    <div class="item-title">${likedSongsItem.name}</div>
                    <div class="item-subtitle">
                        <i class="fas fa-thumbtack"></i>
                        ${likedSongsItem.subText}
                    </div>
                </div>
            </div>
            `,
            );
        }
    }

    // Custom Event: khi có nơi bắn sự kiện này sẽ fetch lại api
    document.addEventListener("libraryChanged", () => {
        fetchAllSidebarData();
    });

    // Toggle Tab Playlist
    playlistTabBtn?.addEventListener("click", () => {
        playlistTabBtn.classList.toggle("active");
        artistsTabBtn?.classList.remove("active");
        albumsTabBtn?.classList.remove("active");

        sidebarState.currentTab =
            sidebarState.currentTab === "playlists" ? "all" : "playlists";
        renderLibraryWithFilter();
    });

    // Toggle Tab Artists
    artistsTabBtn?.addEventListener("click", () => {
        artistsTabBtn.classList.toggle("active");
        playlistTabBtn?.classList.remove("active");
        albumsTabBtn?.classList.remove("active");

        sidebarState.currentTab =
            sidebarState.currentTab === "artists" ? "all" : "artists";
        renderLibraryWithFilter();
    });

    // Toggle Tab Albums
    albumsTabBtn?.addEventListener("click", () => {
        albumsTabBtn.classList.toggle("active");
        playlistTabBtn?.classList.remove("active");
        artistsTabBtn?.classList.remove("active");

        sidebarState.currentTab =
            sidebarState.currentTab === "albums" ? "all" : "albums";
        renderLibraryWithFilter();
    });

    // search
    searchInput?.addEventListener("input", (e) => {
        sidebarState.searchQuery = e.target.value;
        renderLibraryWithFilter();
    });

    // hashchange
    window.addEventListener("hashchange", () => {
        syncSidebarActiveState();
    });
}
