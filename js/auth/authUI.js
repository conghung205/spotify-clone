export function showCurrentUser(user) {
    const authButtons = document.querySelector(".auth-buttons");
    const userMenu = document.querySelector(".user-menu");

    updateCurrentUser(user);

    authButtons.classList.remove("show");
    userMenu.classList.add("show");
}

export function showAuthButtons() {
    const authButtons = document.querySelector(".auth-buttons");
    const userMenu = document.querySelector(".user-menu");

    userMenu.classList.remove("show");
    authButtons.classList.add("show");
}

export function updateCurrentUser(user) {
    const userName = document.querySelector("#user-name");

    const userAvatar = document.querySelector("#user-avatar");

    if (user.avatar_url) {
        userAvatar.src = user.avatar_url;
    }

    if (user.email) {
        userName.textContent = user.email;
    }
}
