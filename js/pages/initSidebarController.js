import { getMyPlaylists } from "../api/playlist.js";
import { getUserFollowArtists } from "../api/artist.js";
import { getMySavedAlbums } from "../api/album.js";
import renderPlaylistSidebar from "../playlist/renderPlaylistSidebar.js";
import renderArtistSidebar from "../components/renderArtistSidebar.js";
import { syncSidebarActiveState } from "../playlist/syncSidebarActiveState.js";

export function initSidebarController() {
    const sidebarState = {
        currentTab: "all",
        searchQuery: "",
    };

    let rawData = {
        playlists: [],
        albums: [],
        artists: [],
    };

    const playlistTabBtn = document.querySelector(".nav-tab.nav-playlist");
    const artistsTabBtn = document.querySelector(".nav-tab.nav-artists");
    const albumsTabBtn = document.querySelector(".nav-tab.nav-albums");
    const libraryContent = document.querySelector(".library-content");
    const logo = document.querySelector(".logo i");

    const searchContainer = document.querySelector(".search-library");
    const searchBtn = document.querySelector(".search-library-btn");
    const searchInput = document.querySelector(".header-library .search");

    if (!libraryContent) return;

    logo.addEventListener("click", () => {
        window.location = "/";
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

            if (type === "artist") {
                window.location.hash = `#/artists/${id}`;
            } else if (type === "album") {
                window.location.hash = `#/albums/${id}`;
            } else if (type === "playlist") {
                window.location.hash = `#/playlists/${id}`;
                7;
            }
        }
    });

    // Chạy lần đầu khi khởi động
    fetchAllSidebarData();

    async function fetchAllSidebarData() {
        try {
            const [playlistsRes, artistsRes, albumsRes] = await Promise.all([
                getMyPlaylists().catch(() => []),
                getUserFollowArtists().catch(() => []),
                getMySavedAlbums().catch(() => []),
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
        } catch (error) {
            console.error(error);
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

        // Tìm kiếm
        if (sidebarState.searchQuery) {
            dataToRender = dataToRender.filter((item) =>
                item.name
                    .toLowerCase()
                    .includes(sidebarState.searchQuery.toLowerCase()),
            );
        }

        if (dataToRender.length === 0) {
            libraryContent.innerHTML = `<div class="no-results-message">No items found</div>`;
            return;
        }

        libraryContent.innerHTML = "";

        if (sidebarState.currentTab === "all") {
            dataToRender.forEach((item) => {
                if (item.type === "artist") {
                    renderArtistSidebar([item], true);
                } else {
                    // Playlist và Album ảnh vuông
                    renderPlaylistSidebar([item], true);
                }
            });
        } else {
            // Khi chọn đích danh tab lọc đơn lẻ
            if (sidebarState.currentTab === "playlists")
                renderPlaylistSidebar(dataToRender);
            if (sidebarState.currentTab === "albums")
                renderPlaylistSidebar(dataToRender);
            if (sidebarState.currentTab === "artists")
                renderArtistSidebar(dataToRender);
        }
    }

    // Custom Event
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

    // Chạy lần đầu khi khởi động ứng dụng
    fetchAllSidebarData();
}
