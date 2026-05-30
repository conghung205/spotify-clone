function albumControls(album) {
    const activeClass = album.is_liked ? "active" : "";
    // console.log(album);

    return `
   <section class="container-album-controls">
        <div class="album-controls">
            <button disabled class="play-btn-large">
                <i class="fas fa-play"></i>
            </button>
            <button disabled class="control-btn-shuffle-large btn-shuffle">
                <i class="bi bi-shuffle"></i>
            </button>
            <button id="btn-follow-album" class="btn-follow-album ${activeClass} ">
                <i class="bi bi-plus-circle icon-plus"></i>
                <i class="fa-solid fa-check icon-added"></i>
            </button>
        </div>

        <div class="options">
            <span>List</span>
            <i class="fa-solid fa-list-ul"></i>

            <div class="album-submenu">
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

        
   </section>`;
}

export default albumControls;
