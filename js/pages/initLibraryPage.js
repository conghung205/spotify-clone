import libraryPage from "./libraryPage.js";
import { initSidebarController } from "./initSidebarController.js";

async function initLibraryPage() {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    contentContainer.innerHTML = libraryPage();

    if (typeof initSidebarController === "function") {
        initSidebarController("#content-container");
    }
}

export default initLibraryPage;
