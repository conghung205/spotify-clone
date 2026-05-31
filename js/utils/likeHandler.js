import httpRequest from "../api/httpRequest.js";
import { toast } from "../components/toast.js";

export async function handleLikeClick(likeBtn) {
    const id = likeBtn.dataset.id;
    const type = likeBtn.dataset.type;

    if (!id || !type) return;

    const isCurrentlyLiked = likeBtn.classList.contains("liked");
    const endpointType = type === "song" ? "tracks" : "albums";
    const url = `/${endpointType}/${id}/like`;

    try {
        if (isCurrentlyLiked) {
            await httpRequest.del(url);
            likeBtn.innerHTML = '<i class="bi bi-plus-circle icon-like"></i>';
            likeBtn.classList.remove("liked");
            toast({
                type: "success",
                title: "Successfully",
                message: "Đã xóa khỏi danh sách yêu thích!",
            });
        } else {
            await httpRequest.post(url);
            likeBtn.innerHTML =
                '<i class="bi bi-check-circle-fill icon-check"></i>';
            likeBtn.classList.add("liked");
            toast({
                type: "success",
                title: "Successfully",
                message: "Đã thêm vào danh sách yêu thích!",
            });
        }
        // Bắn sự kiện cập nhật sidebar library
        document.dispatchEvent(new CustomEvent("libraryChanged"));
    } catch (error) {
        console.error("Lỗi tương tác Like:", error);
    }
}
