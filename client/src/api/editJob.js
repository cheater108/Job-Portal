import api from "./api";

async function editJob(data, id) {
    const result = await api.put(`/job/${id}`, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return result.data;
}

export default editJob;
