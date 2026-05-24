function playlistHeader(playlist) {
    return `
    <section class="playlist-header">

        <div class="playlist-image-wrapper ${playlist.image_url ? "has-image" : ""}">
            <input
                type="file"
                id="playlist-file"
                hidden
            />

            <div class="playlist-form-none-image">
                <button><i class="fa-brands fa-itunes-note"></i></button>
            </div>

             <div class="playlist-image-hover">
                <div class="playlist-image-hover-content">
                    <i class="bi bi-pencil"></i>
                    <p>Choose photo</p>
                </div>
            </div>
           <img
                class="playlist-preview-image"
                src="${playlist.image_url || ""}"
                alt=""
            />
        </div>

        <div class="playlist-info">
            <span>Playlist</span>

            <h1
                class="playlist-title"
                data-id="${playlist.id}"
            >
                ${playlist.name}
            </h1>

            <p class="playlist-description">
                ${playlist.description || ""}
            </p>
            <p>hung</p>
        </div>

    </section>
    `;
}

export default playlistHeader;
