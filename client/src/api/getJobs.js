import api from "./api";

async function getJobs() {
    const result = await api.get("/job");

    return result.data;
}

export default getJobs;
