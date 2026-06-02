const authState = {
    // Ban đầu chưa đăng nhập thì user là null
    _user: null,

    //setter
    setUser(userData) {
        this._user = userData;
    },

    // getter
    getUser() {
        return this._user;
    },

    // xóa dữ liệu khi logout
    clearUser() {
        this._user = null;
    },
};

export default authState;
