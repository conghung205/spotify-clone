import audio from "./audio.js";
import { syncUIState } from "../utils/syncUIState.js";

function togglePlay() {
    // Nếu chưa có nguồn nhạc thì không làm gì cả
    if (!audio.src || audio.src === window.location.href) return;

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    // Gọi hàm đồng bộ lại icon cho tất cả các nút lớn/nhỏ đang có trên màn hình
    syncUIState();
}

export default togglePlay;
