import httpRequest from "../api/httpRequest.js";
import renderPlaylistItem from "./renderPlaylistItem.js";
import { initSidebarController } from "../pages/initSidebarController.js";
import { toast } from "../components/toast.js";

async function createPlaylist() {
    try {
        const hasToken = localStorage.getItem("accessToken");

        if (hasToken) {
            const container = document.querySelector(".library-content");
            const resPlaylists = await httpRequest.get("/me/playlists");
            const playlists = resPlaylists.playlists;
            const playlistCount = playlists.length + 1;

            const res = await httpRequest.post("/playlists", {
                name: `My Playlist #${playlistCount}`,
            });
            const playlist = res.playlist;

            const isMobileLibrary =
                window.location.hash.startsWith("#/library");

            if (typeof initSidebarController === "function") {
                if (isMobileLibrary) {
                    // Nếu đang ở mobile cập nhật riêng vùng #content-container
                    await initSidebarController("#content-container");
                } else {
                    // Nếu ở desktop cập nhật sidebar mặc định
                    await initSidebarController();
                }
            }

            // const formatPlaylist = container.insertAdjacentHTML(
            //     "beforeend",
            //     renderPlaylistItem(playlist),
            // );

            window.location.hash = `/playlists/${res.playlist.id}`;
            toast({
                type: "success",
                title: "Success",
                message: "New playlist created successfully.",
            });
        } else {
            const signupForm = document.getElementById("signupForm");
            const loginForm = document.getElementById("loginForm");
            const authModal = document.getElementById("authModal");
            const modalClose = document.getElementById("modalClose");
            signupForm.style.display = "none";
            loginForm.style.display = "block";
            authModal.classList.add("show");
            document.body.style.overflow = "hidden";

            modalClose.addEventListener("click", () => {
                authModal.classList.remove("show");
                document.body.style.overflow = "auto";
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export default createPlaylist;
