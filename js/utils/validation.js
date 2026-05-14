export function showFieldError(input, message) {
    const formGroup = input.closest(".form-group");

    const errorMessage = formGroup.querySelector(".error-message span");

    formGroup.classList.add("invalid");

    errorMessage.textContent = message;
}

export function clearInputError(form) {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const formGroup = input.closest(".form-group");

            formGroup.classList.remove("invalid");

            const errorMessage = formGroup.querySelector(".error-message span");

            errorMessage.textContent = "";
        });
    });
}
