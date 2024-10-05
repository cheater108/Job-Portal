import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import JobSearch from "../../components/JobSearch";
import Navbar from "../../components/Navbar";
import getJobs from "../../api/getJobs";

function HomePage() {
    const [jobs, setJobs] = useState([]);
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
                <JobSearch setJobs={setJobs} />
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
            </main>
        </div>
    );
}

export default HomePage;
