import { initAuthModal } from "./components/authModal.js";
import { initUserDropdown } from "./components/userDropdown.js";
import { initAuth } from "./auth/initAuth.js";

document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initAuthModal();
    initUserDropdown();
});
