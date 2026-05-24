function renameModal() {
    return `
        <div class="rename-modal-overlay" id="rename-playlist-modal">
            <div class="rename-modal-content">
                <h3>Rename Playlist</h3>
                <div class="rename-form-group">
                    <input type="text" class="rename-playlist-input" placeholder="Enter new playlist name" maxLength="50" />
                </div>
                <div class="rename-modal-actions">
                    <button class="btn-rename-cancel">Cancel</button>
                    <button class="btn-rename-save">Save</button>
                </div>
            </div>
        </div>
    `;
}

export default renameModal;
