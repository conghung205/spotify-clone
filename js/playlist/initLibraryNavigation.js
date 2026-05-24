export function syncSidebarActiveState() {
    const container = document.querySelector(".library-content");
    if (!container) return;

    // 1. Lấy hash hiện tại (Ví dụ: "#/playlists/a62e4b72-...")
    const hash = window.location.hash;

    // 2. Xóa sạch class active cũ đang có trên sidebar trước để tránh bị trùng
    const currentActive = container.querySelector(".library-item.active");
    if (currentActive) {
        currentActive.classList.remove("active");
    }

    // 3. Nếu URL có chứa đoạn cấu trúc /playlists/
    if (hash && hash.includes("/playlists/")) {
        // Cắt chuỗi lấy chuẩn đằng sau dấu gạch chéo cuối để tìm playlistId
        const playlistId = hash.split("/playlists/")[1];

        // Tìm đúng thẻ item có data-id trùng khớp
        const targetItem = container.querySelector(
            `.library-item[data-id="${playlistId}"]`,
        );

        // Nếu tìm thấy thì thêm class active cho nó tỏa sáng
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
