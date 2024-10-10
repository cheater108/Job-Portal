import api from "./api";

async function getLinkedInJobs(name) {
    const result = await api.get(`/job/linkedin/${name}`);
    return result.data;
}

export default getLinkedInJobs;
