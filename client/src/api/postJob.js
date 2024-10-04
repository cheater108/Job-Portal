import api from "./api";

async function postJob(data) {
    const result = await api.post("/job", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return result.data;
}

export default postJob;
