import { logout as logoutApi } from "../api/auth.js";

import { showAuthButtons } from "./authUI.js";

export async function logout() {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Gọi API logout
        await logoutApi(refreshToken);
        window.location = "/";
    } catch (error) {
        console.log(error);
    } finally {
        // Dù API fail vẫn xóa local
        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        // Update UI
        showAuthButtons();
    }
}
