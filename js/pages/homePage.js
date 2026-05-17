import albumSection from "../components/albumSection.js";
import artistSection from "../components/artistSection.js";

function homePage() {
    return `
    <div class="content-wrapper">
        ${albumSection()}
        ${artistSection()}
    </div>
    `;
}

export default homePage;
