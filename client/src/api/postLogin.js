import api from "./api";

async function postLogin(data) {
    const result = await api.post("/user/login", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return result.data;
}

export default postLogin;
