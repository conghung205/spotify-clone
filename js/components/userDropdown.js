import { logout } from "../auth/logout.js";

export function initUserDropdown() {
    const userInfo = document.querySelector(".user-info");
    const userDropdown = document.getElementById("userDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    // Toggle dropdown
    userInfo.addEventListener("click", function (e) {
        e.stopPropagation();

        userDropdown.classList.toggle("show");
    });

    // Click outside
    document.addEventListener("click", function (e) {
        if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove("show");
        }
    });

    // ESC key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && userDropdown.classList.contains("show")) {
            userDropdown.classList.remove("show");
        }
    });

    // Logout
    logoutBtn.addEventListener("click", function () {
        userDropdown.classList.remove("show");

        logout();
    });
}
