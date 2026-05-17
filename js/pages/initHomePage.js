import popularAlbums from "../components/popularAbums.js";
import popularArtists from "../components/popularArtists.js";
import homePage from "./homePage.js";

async function initHomePage() {
    const app = document.getElementById("app");

    app.innerHTML = homePage();

    await popularAlbums();
    await popularArtists();
}
export default initHomePage;
