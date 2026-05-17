// slider.js hoặc đặt phía dưới cùng của file
export function initSlider({ viewport, list, prev, next, step = 400 }) {
    if (!viewport || !list || !prev || !next) return;

    let currentTranslate = 0;

    // Tính toán giới hạn dịch chuyển
    const getValues = () => {
        const viewportWidth = viewport.clientWidth;
        const listWidth = list.scrollWidth;
        return { maxTranslate: listWidth - viewportWidth };
    };

    // updateButtons
    const updateButtons = (maxTranslate) => {
        prev.style.display = currentTranslate <= 0 ? "none" : "flex";
        next.style.display = currentTranslate >= maxTranslate ? "none" : "flex";
    };

    // start
    const { maxTranslate: initialMax } = getValues();
    updateButtons(initialMax);

    //Next
    next.addEventListener("click", () => {
        const { maxTranslate } = getValues();
        currentTranslate += step;

        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
        }

        list.style.transform = `translateX(-${currentTranslate}px)`;
        updateButtons(maxTranslate);
    });

    //Prev
    prev.addEventListener("click", () => {
        const { maxTranslate } = getValues();
        currentTranslate -= step;

        if (currentTranslate < 0) {
            currentTranslate = 0;
        }

        list.style.transform = `translateX(-${currentTranslate}px)`;
        updateButtons(maxTranslate);
    });
}
