function searchPage() {
    return `
    <div class="search-page-container">
        <div class="search-filter-tabs">
            <button class="filter-tab active" data-type="all">All</button>
            <button class="filter-tab" data-type="songs">Songs</button>
            <button class="filter-tab" data-type="artists">Artists</button>
            <button class="filter-tab" data-type="albums">Albums</button>
        </div>

        <div class="search-page-content"></div>
    </div>`;
}

export default searchPage;
