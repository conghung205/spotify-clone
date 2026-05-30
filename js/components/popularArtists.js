import popularArtistItem from "./popularArtistItem.js";
import httpRequest from "../api/httpRequest.js";
import { initSlider } from "./slider.js";

async function popularArtists() {
    const artistsList = document.querySelector(".artists-grid");
    if (!artistsList) return;

    try {
        const res = await httpRequest.get("/artists?limit=20&offset=0");
        const artists = res.artists || res || [];

        const html = artists
            .map((artist) => popularArtistItem(artist))
            .join("");

        artistsList.innerHTML = html;
    } catch (error) {
        console.log(error);
    }

    artistsList.addEventListener("click", (e) => {
        const artistItem = e.target.closest(".artist-card");
        if (artistItem) {
            const artistId = artistItem.dataset.id;
            window.location.hash = `/artists/${artistId}`;
        }
    });

    const viewport = document.querySelector(".artists-wraper");
    const prevBtn = document.querySelector(".artists-prev");
    const nextBtn = document.querySelector(".artists-next");

    initSlider({
        viewport: viewport,
        list: artistsList,
        prev: prevBtn,
        next: nextBtn,
        step: 400,
    });
}

export default popularArtists;
