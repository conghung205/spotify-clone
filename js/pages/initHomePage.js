import popularAlbums from "../components/popularAbums.js";
import popularArtists from "../components/popularArtists.js";
import homePage from "./homePage.js";

async function initHomePage() {
    const contentContainer = document.getElementById("content-container");

    contentContainer.innerHTML = homePage();

    await popularAlbums();
    await popularArtists();
}
export default initHomePage;
