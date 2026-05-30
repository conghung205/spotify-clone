function sideBar() {
    return `
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fab fa-spotify"></i>
            </div>
        </div>

        <nav class="sidebar-nav">
            <div class="nav-section">
                <h2 class="section-title">Your Library</h2>
                <button class="create-btn">
                    <i class="fas fa-plus"></i>
                    Create
                </button>
            </div>

            <div class="nav-tabs">
                <button class="nav-tab nav-playlist">Playlists</button>
                <button class="nav-tab nav-artists ">Artists</button>
                <button class="nav-tab nav-albums ">Album</button>
            </div>

            <div class="header-library">
                <div class="search-library">
                    <button class="search-library-btn">
                        <i class="fas fa-search"></i>
                    </button>
                    <input
                        type="text"
                        placeholder="search your library..."
                        class="search"
                    />
                </div>

                <div class="box-sort">
                    <button class="sort-btn">
                        <i class="fas fa-list"></i>
                    </button>
                    <div class="sort-options">
                        <span class="sort-title">Sort By</span>
                        <span class="sort-item">Recents</span>
                        <span class="sort-item">Recently Added</span>
                        <span class="sort-item">Alphabetical</span>
                        <span class="sort-item">Creator</span>
                        <span class="sort-view">View as</span>
                        <div class="box-icon-sort">
                            <div class="sort-icon">
                                <i class="fa-solid fa-bars"></i>
                                <span class="tooltip-icon-sort"
                                    >Compact list</span
                                >
                            </div>
                            <div class="sort-icon">
                                <i class="fa-solid fa-list-ul"></i>
                                <span class="tooltip-icon-sort"
                                    >Default list</span
                                >
                            </div>
                            <div class="sort-icon">
                                <i class="bi bi-grid-3x3-gap-fill"></i>
                                <span class="tooltip-icon-sort"
                                    >Compact grid</span
                                >
                            </div>
                            <div class="sort-icon">
                                <i class="bi bi-grid"></i>
                                <span class="tooltip-icon-sort"
                                    >Default grid</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="library-content"></div>
        </nav>
    </aside>`;
}

export default sideBar;
