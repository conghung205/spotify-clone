import { logout as logoutApi } from "../api/auth.js";
import { showAuthButtons } from "./authUI.js";
import { toast } from "../components/toast.js";
import initLibrary from "../playlist/initLibrary.js";
import { initSidebarController } from "../pages/initSidebarController.js";
import authState from "./authState.js";

export async function logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // clear state
    authState.clearUser();

    showAuthButtons();

    if (typeof initLibrary === "function") await initLibrary();
    if (typeof initSidebarController === "function")
        await initSidebarController();

    toast({
        type: "success",
        title: "Success",
        message: "Logout successfully",
        duration: 1000,
    });

    try {
        if (refreshToken) {
            await logoutApi(refreshToken);
        }
    } catch (error) {
        console.log(error);
    }
}
