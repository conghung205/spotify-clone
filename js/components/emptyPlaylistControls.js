function emptyPlaylistControls() {
    return `
    <section class="container-playlist-controls">
        <div class="album-controls">
            <button class="control-btn-shuffle-large btn-shuffle">
                <i class="fa-solid fa-user-plus"></i>
            </button>
            <button id="btn-add-playlist" class="control-btn-large">
               <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>

        <div class="options">
            <span>List</span>
            <i class="fa-solid fa-list-ul"></i>

            <div class="playlist-submenu">
                <span>View as</span>
                <div class="sort-item">
                    <i class="fa-solid fa-bars"></i>
                    Compact
                </div>
                <div class="sort-item">
                    <i class="fa-solid fa-list-ul"></i>
                    List
                </div>
            </div>
        </div>
   </section>
    `;
}

export default emptyPlaylistControls;
