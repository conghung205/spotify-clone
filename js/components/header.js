function header() {
    return `
    <header class="main-header">
        <div class="search-container">
            <div class="search-box">
                <button class="home-btn">
                    <i class="fas fa-home"></i>
                </button>
                <div class="search-input-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        placeholder="What do you want to play?"
                        class="search-input global-search-input"
                    />
                    <div class="search-dropdown-results">
                    </div>
                </div>
            </div>
        </div>
        <div class="header-actions">
            <div class="auth-buttons">
                <button class="auth-btn signup-btn">Sign up</button>
                <button class="auth-btn login-btn">Log in</button>
            </div>
            <div class="user-menu">
                <div class="user-info">

                    <button class="user-avatar" id="userAvatar">
                        <img
                            id="user-avatar"
                            src="placeholder.svg?height=32&width=32"
                            alt="User Avatar"
                        />
                    </button>
                </div>
                <div class="user-dropdown" id="userDropdown">
                    <div class="dropdown-item" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Log out</span>
                    </div>
                    <div class="dropdown-item" id="profileBtn">
                        <i class="fa-solid fa-circle-user"></i>
                        <span>Profile</span>
                    </div>
                </div>
            </div>
        </div>
    </header>`;
}

export default header;
