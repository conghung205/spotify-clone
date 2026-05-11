import httpRequest from "./utils/httpRequest.js";

// Auth Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const signupBtn = document.querySelector(".signup-btn");
    const loginBtn = document.querySelector(".login-btn");
    const authModal = document.getElementById("authModal");
    const modalClose = document.getElementById("modalClose");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const showLoginBtn = document.getElementById("showLogin");
    const showSignupBtn = document.getElementById("showSignup");

    // Function to show signup form
    function showSignupForm() {
        signupForm.style.display = "block";
        loginForm.style.display = "none";
    }

    // Function to show login form
    function showLoginForm() {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    }

    // Function to open modal
    function openModal() {
        authModal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    // Open modal with Sign Up form when clicking Sign Up button
    signupBtn.addEventListener("click", function () {
        showSignupForm();
        openModal();
    });

    // Open modal with Login form when clicking Login button
    loginBtn.addEventListener("click", function () {
        showLoginForm();
        openModal();
    });

    // Close modal function
    function closeModal() {
        authModal.classList.remove("show");
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    // Close modal when clicking close button
    modalClose.addEventListener("click", closeModal);

    // Close modal when clicking overlay (outside modal container)
    authModal.addEventListener("click", function (e) {
        if (e.target === authModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && authModal.classList.contains("show")) {
            closeModal();
        }
    });

    // Switch to Login form
    showLoginBtn.addEventListener("click", function () {
        showLoginForm();
    });

    // Switch to Signup form
    showSignupBtn.addEventListener("click", function () {
        showSignupForm();
    });

    // sign up
    signupForm
        .querySelector(".auth-form-content")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.querySelector("#signupEmail").value;
            const password = document.querySelector("#signupPassword").value;

            const credentials = {
                email,
                password,
            };

            try {
                const { user, access_token } = await httpRequest.post(
                    "/auth/register",
                    credentials,
                );

                // save access_token localstogare
                localStorage.setItem("accessToken", access_token);
                updateCurrentUser(user);
            } catch (error) {
                if (error?.response?.error?.code === "EMAIL_EXISTS") {
                    console.log(error.response.error.message);
                }
            }
        });
});

// User Menu Dropdown Functionality
document.addEventListener("DOMContentLoaded", function () {
    const userInfo = document.querySelector(".user-info");
    const userDropdown = document.getElementById("userDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    // Toggle dropdown when clicking avatar
    userInfo.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove("show");
        }
    });

    // Close dropdown when pressing Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && userDropdown.classList.contains("show")) {
            userDropdown.classList.remove("show");
        }
    });

    // Handle logout button click
    logoutBtn.addEventListener("click", function () {
        // Close dropdown first
        userDropdown.classList.remove("show");

        console.log("Logout clicked");
        // TODO: Students will implement logout logic here
    });
});

// show/hide auth functionality
document.addEventListener("DOMContentLoaded", async () => {
    const authButtons = document.querySelector(".auth-buttons");
    const userMenu = document.querySelector(".user-menu");

    try {
        const { user } = await httpRequest.get("/users/me");
        updateCurrentUser(user);
        userMenu.classList.add("show");
    } catch (error) {
        authButtons.classList.add("show");
    }
});

function updateCurrentUser(user) {
    const userName = document.querySelector("#user-name");
    const userAvatar = document.querySelector("#user-avatar");

    if (user.avatar_url) {
        userAvatar.src = user.avatar_url;
    }
    if (user.email) {
        userName.textContent = user.email;
    }
}
