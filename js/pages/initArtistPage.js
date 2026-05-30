import httpRequest from "../api/httpRequest.js";
import artistPage from "./artistPage.js";
import artistHero from "../components/artistHero.js";
import artistTracks from "../components/artistTracks.js";
import artistControls from "../components/artistControls.js";
import playTrack from "../player/playTrack.js";
import { syncUIState } from "../utils/syncUIState.js";
import { toast } from "../components/toast.js";

async function initArtistPage(artistId) {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    let currentArtist = null;

    function renderControlsOnly() {
        const controlsWrapper = contentContainer.querySelector(
            ".container-artist-controls",
        );
        if (controlsWrapper) {
            controlsWrapper.outerHTML = artistControls(currentArtist);
        }
    }

    try {
        const artist = await httpRequest.get(`/artists/${artistId}`);
        const tracksRes = await httpRequest.get(
            `/artists/${artistId}/tracks/popular`,
        );

        currentArtist = artist;

        contentContainer.innerHTML = artistPage(currentArtist);

        syncUIState();

        const heroContainer = document.querySelector(".hero-artist-container");
        const tracksContainer = document.querySelector(
            ".artist-tracks-container",
        );
        const contentWrapper = document.querySelector(".content-wrapper");

        const tracksList = tracksRes.tracks || [];

        if (heroContainer) heroContainer.innerHTML = artistHero(currentArtist);
        if (tracksContainer)
            tracksContainer.innerHTML = artistTracks(tracksList);

        if (contentWrapper) {
            contentWrapper.addEventListener("click", async (e) => {
                const followBtn = e.target.closest(".btn-follow-artist");
                if (followBtn) {
                    e.stopPropagation();
                    try {
                        if (currentArtist.is_following) {
                            await httpRequest.del(
                                `/artists/${artistId}/follow`,
                            );

                            currentArtist.is_following = false;
                            toast({
                                type: "success",
                                title: "Đã Bỏ Follow",
                                message: `Bạn bỏ Follow ${currentArtist.name} thành công!`,
                            });
                        } else {
                            await httpRequest.post(
                                `/artists/${artistId}/follow`,
                            );
                            currentArtist.is_following = true;
                            toast({
                                type: "success",
                                title: "Đã Follow",
                                message: `Bạn đã Follow ${currentArtist.name} thành công!`,
                            });
                        }

                        renderControlsOnly();

                        // BẮN TÍN HIỆU TOÀN APP
                        const libraryEvent = new CustomEvent("libraryChanged");
                        document.dispatchEvent(libraryEvent);
                    } catch (error) {
                        console.error(error);
                    }
                    return;
                }

                const trackItem = e.target.closest(".track-item");
                if (trackItem) {
                    const index = Number(trackItem.dataset.index);
                    playTrack(tracksList, index);
                }
            });
        }
    } catch (error) {
        console.error("Lỗi khi khởi tạo trang nghệ sĩ:", error);
    }
}

export default initArtistPage;
