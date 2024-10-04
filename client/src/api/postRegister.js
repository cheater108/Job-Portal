import api from "./api";

async function postRegister(data) {
    const result = await api.post("/user/register", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return result.data;
}

export default postRegister;
