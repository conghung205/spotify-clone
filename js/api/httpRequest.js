// Class dùng để quản lý toàn bộ HTTP request
class HttpRequest {
    constructor() {
        this.baseUrl = "https://spotify.f8team.dev/api";
    }

    // Xin access token mới
    // khi access token cũ hết hạn
    async refreshAccessToken() {
        // Lấy refresh token từ localStorage
        const refreshToken = localStorage.getItem("refreshToken");

        // Gửi request refresh token
        const res = await fetch(`${this.baseUrl}/auth/refresh-token`, {
            method: "POST",

            // Header gửi lên server
            headers: {
                "Content-Type": "application/json",

                // Gửi refresh token lên
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const data = await res.json();

        // Lưu access token mới
        localStorage.setItem("accessToken", data.access_token);

        // Trả token mới ra ngoài
        return data.access_token;
    }

    async _send(path, method, data, options = {}) {
        try {
            const isFormData = data instanceof FormData;

            // Tạo object config cho fetch
            const _options = {
                ...options,
                method,
                headers: {
                    ...options.headers,
                },
            };

            // Nếu KHÔNG PHẢI FormData thì ép kiểu JSON như cũ
            if (!isFormData) {
                _options.headers["Content-Type"] = "application/json";
                if (data) {
                    _options.body = JSON.stringify(data);
                }
            } else {
                _options.body = data;
            }

            // Lấy access token từ localStorage
            const accessToken = localStorage.getItem("accessToken");

            // Nếu có token thì gắn vào header
            if (accessToken) {
                _options.headers.Authorization = `Bearer ${accessToken}`;
            }

            // Gửi request lần đầu
            let res = await fetch(`${this.baseUrl}${path}`, _options);

            // Nếu token hết hạn
            const refreshToken = localStorage.getItem("refreshToken");
            if (res.status === 401 && refreshToken) {
                // Xin access token mới
                const newAccessToken = await this.refreshAccessToken();

                // Gắn token mới vào header
                _options.headers.Authorization = `Bearer ${newAccessToken}`;

                // Gửi lại request cũ
                res = await fetch(`${this.baseUrl}${path}`, _options);
            }

            const response = await res.json();

            if (!res.ok) {
                const error = new Error(`HTTP error: ${res.status}`);
                error.response = response;
                error.status = res.status;
                throw error;
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    async get(path, options) {
        return await this._send(path, "GET", null, options);
    }

    async post(path, data, options) {
        return await this._send(path, "POST", data, options);
    }

    async put(path, data, options) {
        return await this._send(path, "PUT", data, options);
    }

    async patch(path, data, options) {
        return await this._send(path, "PATCH", data, options);
    }

    async del(path, options) {
        return await this._send(path, "DELETE", null, options);
    }
}

// Tạo instance
const httpRequest = new HttpRequest();

// Export để file khác dùng
export default httpRequest;
