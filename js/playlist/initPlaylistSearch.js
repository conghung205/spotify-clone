import recommendedSection from "../components/recommendedSection.js";
import { addTracktoPlaylist } from "../api/playlist.js";
import httpRequest from "../api/httpRequest.js";
import playlistSearchResult from "../components/playlistSearchResult.js";

export function initPlaylistSearch(
    playlistId,
    currentPlaylistTracks,
    onTracksUpdated,
) {
    const searchSection = document.querySelector(".playlist-search");
    const searchInput = document.getElementById("search-playlist");
    const closeSearchBtn = document.querySelector(".close-playlist-search");
    const dynamicResultsZone = document.getElementById(
        "search-or-recommended-results",
    );
    const findMoreBtn = document.querySelector(".btn-find-more");

    if (!dynamicResultsZone) return;

    const hasTracks = currentPlaylistTracks.length > 0;

    if (hasTracks) {
        if (searchSection) searchSection.style.display = "none";
        if (findMoreBtn) findMoreBtn.style.display = "inline-block";
        loadRecommendedSection();
    } else {
        if (searchSection) searchSection.style.display = "flex";
        if (findMoreBtn) findMoreBtn.style.display = "none";
        dynamicResultsZone.innerHTML = "";
    }

    // ADD TRACK
    function initAddTrackEvents() {
        const addButtons =
            dynamicResultsZone.querySelectorAll(".btn-add-track");

        addButtons.forEach((button) => {
            button.addEventListener("click", async (e) => {
                const trackId = e.target.getAttribute("data-id");
                if (!trackId) return;

                try {
                    const res = await addTracktoPlaylist(playlistId, {
                        track_id: trackId,
                    });
                    const playlistTrack = res.playlist_track;

                    button.innerText = "Added";
                    button.disabled = true;
                    button.style.opacity = "0.5";

                    // Bắn dữ liệu về cho initPlaylistPage xử lý gộp vào bảng chính
                    if (typeof onTracksUpdated === "function") {
                        onTracksUpdated(playlistTrack);
                    }
                } catch (error) {
                    console.error("Lỗi khi thêm bài hát vào playlist:", error);
                }
            });
        });
    }

    // RecommendedSection
    async function loadRecommendedSection() {
        try {
            const existingRecommended = dynamicResultsZone.querySelector(
                ".recommended-wrapper",
            );
            if (existingRecommended) {
                existingRecommended.style.display = "block";
                return;
            }

            const response = await httpRequest.get(`/tracks/trending`);
            const tracks = response.tracks || [];

            // FORMAT data
            const formattedTracksArray = tracks.map((track) => ({
                id: track.id,
                track_id: track.id,
                track_title: track.title,
                track_image_url: track.image_url,
                artist_name: track.artist_name || "Unknown Artist",
                track_duration: track.duration || 0,
                track_audio_url: track.audio_url || track.track_audio_url || "",
                album_title: track.album_title || "",
            }));

            dynamicResultsZone.innerHTML =
                recommendedSection(formattedTracksArray);
            initAddTrackEvents();
        } catch (error) {
            console.error("Không thể tải danh sách gợi ý:", error);
        }
    }

    // FIND MORE
    if (findMoreBtn) {
        findMoreBtn.addEventListener("click", () => {
            findMoreBtn.style.display = "none";

            const recommendedSectionElem = dynamicResultsZone.querySelector(
                ".recommended-wrapper",
            );
            if (recommendedSectionElem) {
                recommendedSectionElem.style.display = "none";
            }

            if (searchSection) searchSection.style.display = "flex";
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }
        });
    }

    // close search
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener("click", () => {
            if (searchSection) searchSection.style.display = "none";
            if (findMoreBtn) findMoreBtn.style.display = "inline-block";

            const searchResultsList = dynamicResultsZone.querySelector(
                ".search-results-list",
            );
            if (searchResultsList) {
                searchResultsList.remove();
            }

            loadRecommendedSection();
        });
    }

    // search (DEBOUNCE 300MS)
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.trim();
            clearTimeout(debounceTimer);

            if (!keyword) {
                const searchResultsList = dynamicResultsZone.querySelector(
                    ".search-results-list",
                );
                if (searchResultsList) searchResultsList.remove();

                loadRecommendedSection();
                return;
            }

            debounceTimer = setTimeout(async () => {
                try {
                    const res = await httpRequest.get(
                        `/search/tracks?q=${keyword}&limit=20`,
                    );
                    const tracks = res.tracks || [];

                    const recommendedSectionElem =
                        dynamicResultsZone.querySelector(
                            ".recommended-wrapper",
                        );
                    if (recommendedSectionElem) {
                        recommendedSectionElem.style.display = "none";
                    }
                    if (tracks.length === 0) {
                        dynamicResultsZone.innerHTML = `
                            <div class="no-results-tracks" style="padding: 40px 20px; text-align: center;">
                                <h3 style="color: #fff; font-size: 18px; margin-bottom: 8px;">No results found for "${keyword}"</h3>
                                <p style="color: #a7a7a7; font-size: 14px;">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
                            </div>
                        `;
                        scrollToResults();
                        return;
                    }

                    const formattedTracksArray = tracks.map((track) => ({
                        id: track.id,
                        track_id: track.id,
                        track_title: track.title,
                        track_image_url: track.image_url,
                        artist_name:
                            track.additional_info?.artist_name ||
                            track.artist_name ||
                            "Unknown Artist",
                        track_duration:
                            track.duration || track.track_duration || 0,
                        track_audio_url:
                            track.audio_url || track.track_audio_url || "",
                        album_title:
                            track.album_title || track.track_album || "",
                    }));

                    dynamicResultsZone.innerHTML =
                        playlistSearchResult(formattedTracksArray);
                    initAddTrackEvents();
                    scrollToResults();
                } catch (error) {
                    console.error(
                        "Lỗi trong quá trình tìm kiếm bài hát:",
                        error,
                    );
                }
            }, 300);
        });
    }
}

function scrollToResults() {
    const dynamicResultsZone = document.getElementById(
        "search-or-recommended-results",
    );
    if (!dynamicResultsZone) return;

    dynamicResultsZone.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
    });
}
