export function openPlaylistModal() {
    const modal = document.querySelector(".modal-overlay");
    if (modal) modal.classList.add("show");
}

export function closePlaylistModal() {
    const modal = document.querySelector(".modal-overlay");
    if (modal) modal.classList.remove("show");
}

// Click ngoài vùng, nút đóng, phím ESC
export function setupModalCloseEvents(modal, btnCloseModal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closePlaylistModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePlaylistModal();
    });

    btnCloseModal.addEventListener("click", () => {
        closePlaylistModal();
    });
}
