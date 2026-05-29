function formatDate(dateString) {
    if (!dateString) return "Just now";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Just now";

    const now = new Date();
    // Khoảng cách thời gian
    const diffInSeconds = Math.floor((now - date) / 1000);

    // Trường hợp thời gian vừa mới add xong (giá trị âm hoặc < 60 giây)

    if (diffInSeconds < 60) return "Vừa xong";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    // Nếu thời gian đã quá 7 ngày thì hiển thị ngày tháng cụ thể
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day} thg ${month}, ${year}`;
}

export default formatDate;
