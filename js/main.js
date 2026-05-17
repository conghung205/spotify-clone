import { initAuthModal } from "./components/authModal.js";
import { initUserDropdown } from "./components/userDropdown.js";
import { initAuth } from "./auth/initAuth.js";
import router from "./routes/router.js";

document.addEventListener("DOMContentLoaded", () => {
    // global
    initAuth();
    initAuthModal();
    initUserDropdown();

    router();
    window.addEventListener("hashchange", router);
});
