import api from "./api";
import getJobs from "./getJobs";

// pass position = skills to search based on skills only
// pass position some value to search for jobs based on that position
async function searchJobs(position, skills) {
    // if no skills is selected and position = skills i.e no position
    // return all jobs
    if (skills.length === 0 && position === "skills") {
        const data = await getJobs();
        return data;
    }

    // if no skills but a postion is specified
    if (skills.length === 0) {
        const result = await api.get(`/job/search/${position}`);
        return result.data;
    }

    // if both position and skills are specified
    const skillsString = skills.join(",");
    const result = await api.get(
        `/job/search/${position}?skills=${skillsString}`
    );

    return result.data;
}

export default searchJobs;
