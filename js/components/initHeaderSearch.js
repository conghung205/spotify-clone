import { getUniversalSearch } from "../api/search.js";
import dropdownItemSearch from "./dropdownItemSearch.js";
import playTrack from "../player/playTrack.js";
import httpRequest from "../api/httpRequest.js";

export function initHeaderSearch() {
    const searchInput = document.querySelector(".global-search-input");
    const dropdownResults = document.querySelector(".search-dropdown-results");
    const homeBtn = document.querySelector(".home-btn");
    let debounceTimer = null;

    if (!searchInput || !dropdownResults) return;

    homeBtn.addEventListener("click", () => {
        window.location = "";
    });

    // SỰ KIỆN GÕ CHỮ
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim();

        // Debounce
        clearTimeout(debounceTimer);

        // Nếu ô input trống rỗng, ẩn bảng kết quả và dừng lại
        if (query.length === 0) {
            dropdownResults.innerHTML = "";
            dropdownResults.classList.remove("show");
            return;
        }

        debounceTimer = setTimeout(async () => {
            try {
                const res = await getUniversalSearch(query);
                const rawResults = res.results || {};

                // format data
                const formattedSongs = (rawResults.tracks || []).map(
                    (song) => ({
                        id: song.id,
                        name: song.title,
                        image: song.image_url,
                        subText: `Song • ${song.additional_info.artist_name}`,
                        type: "song",
                    }),
                );

                const formattedArtists = (rawResults.artists || []).map(
                    (artist) => ({
                        id: artist.id,
                        name: artist.title,
                        image: artist.image_url,
                        subText: "Artist",
                        type: "artist",
                    }),
                );

                const formattedAlbums = (rawResults.albums || []).map(
                    (album) => ({
                        id: album.id,
                        name: album.title,
                        image: album.image_url,
                        subText: `Album • ${album.additional_info?.artist_name || "Unknown"}`,
                        type: "album",
                    }),
                );

                // spread
                const combinedResults = [
                    ...formattedSongs,
                    ...formattedArtists,
                    ...formattedAlbums,
                ];

                const finalDropdownData = combinedResults;

                // render
                renderDropdownAppendAll(finalDropdownData, dropdownResults);

                dropdownResults.classList.add("show");
            } catch (error) {
                console.error("Lỗi tìm kiếm dropdown:", error);
            }
        }, 300);
    });

    // Enter
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();

            if (query.length > 0) {
                dropdownResults.classList.remove("show");

                clearTimeout(debounceTimer);
                // searchInput.blur();

                window.location.hash = `#/search?q=${encodeURIComponent(query)}`;
            }
        }
    });

    // CLICK RA NGOÀI THÌ ẨN BẢNG KẾT QUẢ
    document.addEventListener("click", (e) => {
        if (
            !searchInput.contains(e.target) &&
            !dropdownResults.contains(e.target)
        ) {
            dropdownResults.classList.remove("show");
        }
    });

    // Click lại vào ô input nếu đang có chữ thì hiện bảng lại
    searchInput.addEventListener("focus", () => {
        if (
            searchInput.value.trim().length > 0 &&
            dropdownResults.children.length > 0
        ) {
            dropdownResults.classList.add("show");
        }
    });
}

// function renderDropdownAppendAll
function renderDropdownAppendAll(dataList, container) {
    if (dataList.length === 0) {
        container.innerHTML = `<div class="search-no-result">No results found</div>`;
        return;
    }

    // Xóa dữ liệu cũ của lần tìm kiếm trước
    container.innerHTML = "";

    // Duyệt qua mảng tổng hợp đã gộp tất cả các type
    dataList.forEach((item) => {
        const itemHtml = dropdownItemSearch(item);

        // append nối đuôi liên tục vào container
        container.innerHTML += itemHtml;
    });

    // Ủy quyền sự kiện click xử lý hành động khi chọn item (Giữ nguyên logic thông minh của bạn)
    container.onpointerdown = async (e) => {
        const item = e.target.closest(".dropdown-item-search");
        if (!item) return;

        const id = item.dataset.id;
        const type = item.dataset.type;

        if (type === "song") {
            try {
                const trackDetail = await httpRequest.get(`/tracks/${id}`);

                const singlePlaylist = [trackDetail];
                playTrack(singlePlaylist, 0);
            } catch (error) {
                console.log(error);
            }
        } else if (type === "artist") {
            window.location.hash = `#/artists/${id}`;
        } else if (type === "album") {
            window.location.hash = `#/albums/${id}`;
        }
        container.classList.remove("show");
    };
}
