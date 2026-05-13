import { getMe } from "../api/auth.js";

import { showCurrentUser, showAuthButtons } from "./authUI.js";

export async function initAuth() {
    try {
        const { user } = await getMe();

        showCurrentUser(user);
    } catch (error) {
        showAuthButtons();
    }
}
