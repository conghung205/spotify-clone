function initLibrarySearch() {
    const searchBtn = document.querySelector(".search-library-btn");
    const searchLibraryContainer = document.querySelector(".search-library");
    const searchInput = document.querySelector(".header-library .search");

    if (!searchInput || !searchBtn || !searchLibraryContainer) return;

    searchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        searchLibraryContainer.classList.add("show");
        searchInput.focus();
    });

    searchInput.addEventListener("click", (e) => e.stopPropagation());

    document.addEventListener("click", (e) => {
        if (searchLibraryContainer.classList.contains("show")) {
            searchLibraryContainer.classList.remove("show");
            if (searchInput.value !== "") {
                searchInput.value = "";
                resetLibraryItems();
            }
        }
    });

    // Lắng nghe gõ chữ
    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        filterLibraryItems(keyword);
    });
}

function filterLibraryItems(keyword) {
    const libraryContainer = document.querySelector(".library-content");
    const libraryItems = libraryContainer.querySelectorAll(".library-item");

    let hasResults = false;

    libraryItems.forEach((item) => {
        const titleEl = item.querySelector(".item-title");
        if (!titleEl) return;

        const name = titleEl.textContent.toLowerCase();

        if (name.includes(keyword)) {
            item.style.display = "flex";
            hasResults = true;
        } else {
            item.style.display = "none";
        }
    });

    let noResultEl = libraryContainer.querySelector(".no-results-message");
    if (!noResultEl) return;

    if (!hasResults && keyword !== "") {
        noResultEl.textContent = `Couldn't find "${keyword}"`;
        noResultEl.style.display = "block";
    } else {
        noResultEl.style.display = "none";
    }
}

function resetLibraryItems() {
    const libraryContainer = document.querySelector(".library-content");
    const libraryItems = libraryContainer.querySelectorAll(".library-item");

    libraryItems.forEach((item) => {
        item.style.display = "flex";
    });

    const noResultEl = libraryContainer.querySelector(".no-results-message");
    if (noResultEl) noResultEl.style.display = "none";
}

export default initLibrarySearch;
