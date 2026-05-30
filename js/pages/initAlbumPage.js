import httpRequest from "../api/httpRequest.js";
import albumPage from "./albumPage.js";
import albumControls from "../components/albumControls.js";
import playTrack from "../player/playTrack.js";
import albumHero from "../components/albumHero.js";
import albumTracks from "../components/albumTracks.js";
import { syncUIState } from "../utils/syncUIState.js";
import { toast } from "../components/toast.js";

async function initAlbumPage(albumId) {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    let currentAlbum = null;

    function renderAlbumControlsOnly(albumData) {
        const controlsWrapper = contentContainer.querySelector(
            ".container-album-controls",
        );
        if (controlsWrapper) {
            controlsWrapper.outerHTML = albumControls(albumData);
        }
    }

    try {
        const album = await httpRequest.get(`/albums/${albumId}`);
        const tracksRes = await httpRequest.get(`/albums/${albumId}/tracks`);
        const tracksList = tracksRes.tracks;

        currentAlbum = album;

        contentContainer.innerHTML = albumPage(currentAlbum);

        const contentWrapper = document.querySelector(".content-wrapper");
        const heroContainer = document.querySelector(".hero-album-container");
        const tracksContainer = document.querySelector(
            ".album-tracks-container",
        );

        heroContainer.innerHTML = albumHero(currentAlbum);
        tracksContainer.innerHTML = albumTracks(tracksList);

        contentWrapper?.addEventListener("click", async (e) => {
            const saveAlbumBtn = e.target.closest("#btn-follow-album");
            if (saveAlbumBtn) {
                e.stopPropagation();

                try {
                    if (currentAlbum.is_liked) {
                        await httpRequest.del(`/albums/${albumId}/like`);
                        currentAlbum.is_liked = false;
                        toast({
                            type: "success",
                            title: "Successfully",
                            message: `Đã bỏ like album "${currentAlbum.title}"!`,
                        });
                    } else {
                        await httpRequest.post(`/albums/${albumId}/like`);
                        currentAlbum.is_liked = true;
                        toast({
                            type: "success",
                            title: "Successfully",
                            message: `Đã like album "${currentAlbum.title}"!`,
                        });
                    }

                    renderAlbumControlsOnly(currentAlbum);

                    // BẮN TÍN HIỆU
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
    } catch (error) {
        console.error(error);
    }
    syncUIState();
}

export default initAlbumPage;
