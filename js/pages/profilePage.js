function profilePage(user) {
    return `
         <div class="content-wrapper">
           <div class="settings-container">
                <aside class="settings-sidebar">
                    <h2>Account settings</h2>
                    <p class="sub-text">Record management and security</p>
                    
                    <ul class="settings-menu">
                        <li class="menu-item active" data-tab="personal">
                            <i class="bi bi-person"></i> Personal information
                        </li>
                        <li class="menu-item">
                            <i class="bi bi-shield-lock"></i>Passwords and security
                        </li>
                    </ul>
                </aside>

                <main class="settings-content">
                    <h2>Personal information</h2>
                    <p class="sub-text">Manage your personal information</p>

                    <div class="info-group-box">
                        <div class="info-row" id="row-display-name">
                            <div class="row-label">
                                <span class="title">Display name</span>
                                <span class="value" id="val-display-name">${user.display_name || "Not yet updated"}</span>
                            </div>
                            <i class="bi bi-chevron-right"></i>
                        </div>

                        <div class="info-row" id="row-username">
                            <div class="row-label">
                                <span class="title">User name</span>
                                <span class="value" id="val-username">${user.username || "Not yet updated"}</span>
                            </div>
                            <i class="bi bi-chevron-right"></i>
                        </div>

                        <div class="info-row" id="row-avatar">
                            <div class="row-label">
                                <span class="title">Avatar</span>
                                <div class="avatar-preview">
                                    <img src="${user.avatar_url || "placeholder.svg?height=32&width=32"}" id="val-avatar-img" />
                                </div>
                            </div>
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </main>
            </div>

            <div id="profile-edit-modal" class="custom-modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modal-title">Cập nhật thông tin</h3>
                        <span class="close-modal-btn" id="btn-close-profile-modal">&times;</span>
                    </div>
                    <div class="modal-body" id="profile-modal-body">
                        </div>
                    <div class="modal-footer">
                        <button class="btn-cancel" id="btn-cancel-profile-modal">Cancel</button>
                        <button class="btn-save" id="btn-save-profile-modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>`;
}

export default profilePage;
