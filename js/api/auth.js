import httpRequest from "./httpRequest.js";

export function login(data) {
    return httpRequest.post("/auth/login", data);
}
export function register(data) {
    return httpRequest.post("/auth/register", data);
}
export function getMe() {
    return httpRequest.get("/users/me");
}
export function logout(refreshToken) {
    return httpRequest.post("/auth/logout", {
        refresh_token: refreshToken,
    });
}
