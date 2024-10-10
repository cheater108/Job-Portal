const axios = require("axios");

function getOptions(name) {
    const options = {
        method: "GET",
        url: "https://linkedin-data-api.p.rapidapi.com/search-jobs",
        params: {
            keywords: name,
            locationId: "92000000",
            datePosted: "anyTime",
            sort: "mostRelevant",
        },
        headers: {
            "x-rapidapi-key": process.env.LINKED_IN_API,
            "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        },
    };
    return options;
}

async function getLinkedInJobs(name) {
    try {
        const response = await axios.request(getOptions(name));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = getLinkedInJobs;
