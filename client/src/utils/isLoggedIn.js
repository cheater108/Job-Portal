function isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
        return true;
    } else false;
}

export default isLoggedIn;
