import { login, register } from "../api/auth.js";
import { showCurrentUser } from "../auth/authUI.js";
import { showFieldError, clearInputError } from "../utils/validation.js";
import { toast } from "./toast.js";
export function initAuthModal() {
    // Get DOM elements
    const signupBtn = document.querySelector(".signup-btn");
    const loginBtn = document.querySelector(".login-btn");
    const authModal = document.getElementById("authModal");
    const modalClose = document.getElementById("modalClose");
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const showLoginBtn = document.getElementById("showLogin");
    const showSignupBtn = document.getElementById("showSignup");

    // clear input form
    clearInputError(signupForm);
    clearInputError(loginForm);

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
                const { message, user, access_token, refresh_token } =
                    await register(credentials);

                // save access_token localstogare
                localStorage.setItem("accessToken", access_token);
                localStorage.setItem("refreshToken", refresh_token);

                // when done saving

                showCurrentUser(user);
                closeModal();
                toast({
                    type: "success",
                    title: "Success",
                    message: message,
                    duration: 3000,
                });
            } catch (error) {
                const code = error?.response?.error?.code;
                const message = error?.response?.error?.message;

                if (error?.response?.error?.code === "EMAIL_EXISTS") {
                    const emailInput = signupForm.querySelector("#signupEmail");

                    showFieldError(emailInput, message);
                }
                if (error?.response?.error?.code === "VALIDATION_ERROR") {
                    const message = error?.response?.error?.details[0].message;
                    const passwordInput =
                        signupForm.querySelector("#signupPassword");
                    showFieldError(passwordInput, message);
                }
            }
        });

    // login
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector("#loginEmail").value;
        const password = loginForm.querySelector("#loginPassword").value;

        const credentials = {
            email,
            password,
        };

        try {
            const { message, user, access_token, refresh_token } =
                await login(credentials);

            // save access_token localstogare
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);

            // when done saving
            showCurrentUser(user);
            closeModal();
            toast({
                type: "success",
                title: "Success",
                message: message,
                duration: 3000,
            });
        } catch (error) {
            const code = error?.response?.error?.code;
            const message = error?.response?.error?.message;

            if (code === "INVALID_CREDENTIALS") {
                const emailInput = loginForm.querySelector("#loginEmail");
                const passwordInput = loginForm.querySelector("#loginPassword");

                showFieldError(emailInput, message);
                showFieldError(passwordInput, message);
            }
        }
    });
}
