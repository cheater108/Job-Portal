import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import JobSearch from "../../components/JobSearch";
import Navbar from "../../components/Navbar";
import getJobs from "../../api/getJobs";
import JobCardLinkedIn from "../../components/JobCardLinkedIn";

function HomePage() {
    const [jobs, setJobs] = useState([]);
    const [linkedinJobs, setLinkedinJobs] = useState([]);
    useEffect(() => {
        async function loadJobs() {
            const data = await getJobs();
            // console.log(data);
            setJobs(data);
        }
        loadJobs();
    }, []);
    return (
        <div>
            <Navbar />
            <main className="p-2 md:w-8/12 md:m-auto flex flex-col items-center">
                <JobSearch
                    setJobs={setJobs}
                    setLinkedinJobs={setLinkedinJobs}
                />
                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        position={job.position}
                        skills={job.skills}
                        jobType={job.jobType}
                        remote={job.remote}
                        logo={job.logo}
                        salary={job.salary}
                        location={job.location}
                        id={job._id}
                        owner={job.creator}
                    />
                ))}
                {linkedinJobs.map((job) => (
                    <JobCardLinkedIn
                        key={job.id}
                        position={job.title}
                        logo={job.company.logo}
                        location={job.location}
                        url={job.url}
                    />
                ))}
            </main>
        </div>
    );
}

export default HomePage;
