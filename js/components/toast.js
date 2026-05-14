export function toast({
    type = "success",
    title = "",
    message = "",
    duration = 3000,
}) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // time
        const display = 1000;
        const timeDisplay = (display / 1000).toFixed(2);
        const delay = (duration / 1000).toFixed(2);

        // auto remove toast
        const autoRemoveID = setTimeout(() => {
            main.removeChild(toast);
        }, duration + display);

        // remove toast when click
        toast.onclick = (e) => {
            const btnclose = e.target.closest(".toast_close");
            if (btnclose) {
                main.removeChild(toast);
                clearTimeout(autoRemoveID);
            }
        };

        // icons
        const icons = {
            success: "fa-solid fa-circle-check",
            info: "fa-solid fa-info",
            warning: "fa-solid fa-exclamation",
            error: "fa-solid fa-triangle-exclamation",
        };

        // styles css
        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInleft ease 0.3s, fadeOut linear ${timeDisplay}s ${delay}s forwards`;

        // html elements
        toast.innerHTML = `
            <div class="toast_icon">
                <i class="${icons[type]}"></i>
            </div>

            <div class="toast_body">
                <h3 class="toast_title">${title}</h3>
                <p class="toast_msg">
                    ${message}
                </p>
            </div>

            <div class="toast_close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;

        // add toast
        main.appendChild(toast);
    }
}
