export function syncSidebarActiveState() {
    const container = document.querySelector(".library-content");
    if (!container) return;

    const hash = window.location.hash;

    const currentActive = container.querySelector(".library-item.active");
    if (currentActive) {
        currentActive.classList.remove("active");
    }

    if (hash && hash.includes("/playlists/")) {
        const playlistId = hash.split("/playlists/")[1];

        const targetItem = container.querySelector(
            `.library-item[data-id="${playlistId}"]`,
        );

        if (targetItem) {
            targetItem.classList.add("active");
        }
    }
}

function initLibraryNavigation() {
    const container = document.querySelector(".library-content");

    container.addEventListener("click", (e) => {
        const item = e.target.closest(".library-item");

        if (!item) return;

        const currentActive = container.querySelector(".library-item.active");

        if (currentActive) {
            currentActive.classList.remove("active");
        }

        item.classList.add("active");

        const playlistId = item.dataset.id;
        window.location.hash = `/playlists/${playlistId}`;
    });
}

export default initLibraryNavigation;
