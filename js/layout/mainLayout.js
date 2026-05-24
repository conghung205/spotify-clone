import sideBar from "../components/sidebar.js";
import header from "../components/header.js";
import player from "../components/player.js";
import authModal from "../components/authModal.js";
import renameModal from "../components/renameModal.js";
function mainLayout() {
    return `
    <div class="app-container">
        <!-- Left Sidebar -->
        ${sideBar()}

        <!-- Main Content -->
        <main class="main-content">
            <!-- header -->
            ${header()}

            <!-- content -->
            <div id="content-container"></div>
        </main>

        <!-- player -->
        ${player()}

        ${authModal()}
        ${renameModal()}

        <!-- Toast message -->
        <div id="toast"></div>
    </div>`;
}

export default mainLayout;
