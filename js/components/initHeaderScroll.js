export function initHeaderScroll() {
    const contentContainer = document.getElementById("content-container");
    const mainHeader = document.querySelector(".main-header");

    if (!contentContainer || !mainHeader) return;

    contentContainer.addEventListener("scroll", () => {
        if (contentContainer.scrollTop > 80) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
    });
}

export default initHeaderScroll;
