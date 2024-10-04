import api from "./api";

async function getJobById(jobId) {
    const result = await api.get(`/job/${jobId}`);
    return result.data;
}

export default getJobById;
