import collectionControls from "../components/collectionControls.js";
import heroCollection from "../components/heroCollection.js";
function collectionPage() {
    return `
    <div class="content-wrapper">
        ${heroCollection()}
        ${collectionControls()}
        <div class="collection-tracks-container"></div>

        <div id="collection-context-menu" class="collection-context-menu" style="display: none; position: fixed; z-index: 9999;">
            <ul class="collection-menu-list">
                <li class="collection-menu-item remove-like-option">
                    <i class="bi bi-trash3"></i>
                    <span>Xóa khỏi bài hát đã thích</span>
                </li>
            </ul>
        </div>
    </div>`;
}

export default collectionPage;
