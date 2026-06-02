import { getMe } from "../api/auth.js";
import { showCurrentUser, showAuthButtons } from "./authUI.js";
import authState from "./authState.js";

export async function initAuth() {
    try {
        const { user } = await getMe();

        authState.setUser(user);

        showCurrentUser(user);
    } catch (error) {
        showAuthButtons();
    }
}
