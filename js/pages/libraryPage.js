import sideBar from "../components/sidebar.js";

function libraryPage() {
    return `
    <div class="library-mobile-wrapper">
        ${sideBar()}
    </div>
    `;
}

export default libraryPage;
