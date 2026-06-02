import httpRequest from "../api/httpRequest.js";
import renderPlaylistItem from "./renderPlaylistItem.js";

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
            console.log(playlist);

            const formatPlaylist = container.insertAdjacentHTML(
                "beforeend",
                renderPlaylistItem(playlist),
            );

            window.location.hash = `/playlists/${res.playlist.id}`;
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
