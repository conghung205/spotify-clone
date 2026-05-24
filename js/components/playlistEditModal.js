function playlistEditModal(playlist) {
    return `
    <div class="modal-overlay" id="playlist-modal">
        <div class="modal-container playlist-modal-container">
             <div class="playlist-modal">
             <div class="playlist-modal-header">
                <h2>Edit details</h2>
                <button class="playlist-modal-close"><i class="fa-solid btn-close-playlist-modal fa-xmark"></i></button>
             </div>

                <form class="playlist-form">
                    <div class="playlist-content-form">
                        <div class="playlist-form-image">
                            <input
                                type="file"
                                class="playlist-image-input"
                                hidden
                            />
                            <div class="playlist-form-none-image">
                                <button type="button"><i class="fa-brands fa-itunes-note"></i></button>
                            </div>
                           <img
                                class="playlist-preview-image"
                                src="${playlist.image_url || ""}"
                                alt=""
                            />
                            <div class="playlist-image-hover">
                                <div class="playlist-image-hover-content">
                                    <i class="bi bi-pencil"></i>
                                    <p>Choose photo</p>
                                </div>
                            </div>
                        </div>

                        <div class="playlist-form-input">
                            <input
                                type="text"
                                class="playlist-name-input"
                            />

                            <textarea
                                class="playlist-description-input"
                                placeholder="Add an optional description"
                            ></textarea>
                        </div>
                    </div>

                    <div class="playlist-form-btn">
                        <button class="btn-save" type="submit">
                            Save
                        </button>
                    </div>

                    <p class="text-proceeding">By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
                </form>

            </div>
        </div>
    </div>
    `;
}

export default playlistEditModal;
