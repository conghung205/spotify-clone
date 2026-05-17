import popularArtistItem from "./popularArtistItem.js";
import httpRequest from "../api/httpRequest.js";
import { initSlider } from "./slider.js";

async function popularArtists() {
    const artistsList = document.querySelector(".artists-grid");

    // call api
    const res = await httpRequest.get("/artists?limit=20&offset=0");
    const artists = res.artists;

    const html = artists.map((artist) => popularArtistItem(artist)).join("");

    // Render
    artistsList.innerHTML = html;

    // event listener
    artistsList.addEventListener("click", (e) => {
        const artistItem = e.target.closest(".artist-card");
        console.log(artistItem);

        if (artistItem) {
            const artistId = artistItem.dataset.id;
            window.location.hash = `/artists/${artistId}`;
        }
    });

    // get HTML elements
    const viewport = document.querySelector(".artists-wraper");
    const prevBtn = document.querySelector(".artists-prev");
    const nextBtn = document.querySelector(".artists-next");

    // slider
    initSlider({
        viewport: viewport,
        list: artistsList,
        prev: prevBtn,
        next: nextBtn,
        step: 400,
    });
}

export default popularArtists;
