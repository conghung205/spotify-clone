// mặc định là 1
let lastVolume = 1.0;

export function initMuteToggle(volumeBtn, audio) {
    volumeBtn.addEventListener("click", () => {
        if (volumeBtn.disabled) return;

        if (audio.volume > 0) {
            lastVolume = audio.volume;
            audio.volume = 0;
        } else {
            audio.volume = lastVolume > 0 ? lastVolume : 0.5;
        }
    });

    audio.addEventListener("volumechange", () => {
        if (audio.volume === 0) {
            // Thêm class biểu thị trạng thái tắt tiếng
            volumeBtn.classList.add("is-muted");
        } else {
            // Xóa class tắt tiếng khi có âm lượng trở lại
            volumeBtn.classList.remove("is-muted");
        }
    });
}

export function initVolumeControl(
    volumeBar,
    volumeFill,
    volumeHandle,
    audio,
    getIsDraggingVolume,
    setIsDraggingVolume,
) {
    const updateVolumeOnEvent = (e) => {
        const rect = volumeBar.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;

        // Giới hạn trong phạm vi thanh volume
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        return offsetX / rect.width; // Trả về giá trị từ 0 đến 1
    };

    // Nhấn chuột / Chạm tay vào thanh volume
    volumeBar.addEventListener("pointerdown", (e) => {
        if (volumeBar.classList.contains("disabled")) return;

        e.preventDefault();
        setIsDraggingVolume(true);
        volumeBar.classList.add("is-dragging");
        volumeBar.setPointerCapture(e.pointerId);

        const volumeLevel = updateVolumeOnEvent(e);
        // Cập nhật trực tiếp vào audio element
        audio.volume = volumeLevel;
    });

    // Đang kéo di chuyển
    volumeBar.addEventListener("pointermove", (e) => {
        if (!getIsDraggingVolume()) return;

        const volumeLevel = updateVolumeOnEvent(e);
        audio.volume = volumeLevel;
    });

    // Thả chuột
    volumeBar.addEventListener("pointerup", (e) => {
        if (!getIsDraggingVolume()) return;
        setIsDraggingVolume(false);
        volumeBar.classList.remove("is-dragging");
        volumeBar.releasePointerCapture(e.pointerId);

        const volumeLevel = updateVolumeOnEvent(e);
        audio.volume = volumeLevel;
        if (volumeLevel > 0) lastVolume = volumeLevel;
    });

    // Bị ngắt quãng phòng hờ
    volumeBar.addEventListener("pointercancel", (e) => {
        if (!getIsDraggingVolume()) return;
        setIsDraggingVolume(false);
        volumeBar.classList.remove("is-dragging");
        volumeBar.releasePointerCapture(e.pointerId);
    });

    // Đồng bộ UI khi giá trị audio.volume thay đổi
    audio.addEventListener("volumechange", () => {
        const percent = audio.volume * 100;
        volumeFill.style.width = `${percent}%`;
        volumeHandle.style.left = `${percent}%`;
    });
}
