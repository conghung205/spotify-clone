import { initAuthModal } from "./auth/initAuthModal.js";
import { initUserDropdown } from "./components/userDropdown.js";
import { initAuth } from "./auth/initAuth.js";
import router from "./routes/router.js";
import mainLayout from "./layout/mainLayout.js";
import initPlayerControls from "./player/initPlayerControls.js";
import initCreatePlaylist from "./playlist/initCreatePlaylist.js";
import initPlaylistContextMenu from "./playlist/initPlaylistContextMenu.js";
import { initSidebarController } from "./pages/initSidebarController.js";
import { syncSidebarActiveState } from "./playlist/syncSidebarActiveState.js";
import { initHeaderSearch } from "./components/initHeaderSearch.js";
import initHeaderScroll from "./components/initHeaderScroll.js";

document.addEventListener("DOMContentLoaded", () => {
    //render
    const app = document.getElementById("app");

    app.innerHTML = mainLayout();

    // global
    initAuth();
    initAuthModal();
    initUserDropdown();
    initPlayerControls();
    initCreatePlaylist();
    initPlaylistContextMenu();
    initHeaderSearch();
    initHeaderScroll();

    const hasToken = localStorage.getItem("accessToken");

    if (hasToken) {
        // Chỉ khi có token mới đi lấy dữ liệu cá nhân;
        initSidebarController();
    }

    router();
    window.addEventListener("hashchange", () => {
        router();
        syncSidebarActiveState();
    });
});
