import Navbar from "../../components/Navbar";
import money_img from "../../assets/money.png";
import duration_img from "../../assets/duration.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getJobById from "../../api/getJobById";

function ViewJob() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        logo: "",
        position: "",
        salary: "",
        jobType: "",
        remote: "",
        location: "",
        description: "",
        about: "",
        skills: [],
        information: "",
        creator: "",
    });

    const isOwner = localStorage.getItem("user") === data.creator;
    useEffect(() => {
        async function loadDetails() {
            const jobDetails = await getJobById(jobId);
            // console.log(jobDetails);
            setData(jobDetails);
        }

        loadDetails().catch((err) => {
            navigate("/");
        });
    }, []);
    return (
        <div className="bg-lorange">
            <Navbar />
            <main className="p-2 md:w-8/12 md:m-auto flex flex-col relative bottom-7">
                <div className="p-6 shadow-4xl bg-white ">
                    <h1 className="text-xl font-bold text-center">
                        {data.position}
                    </h1>
                </div>
                <div className="details p-4 bg-white mt-5 shadow-4xl">
                    <div className="time text-[#999999] p-4 flex gap-3">
                        <p>1w ago . {data.jobType}</p>
                        <div className="flex gap-2 items-center">
                            <img
                                src={data.logo}
                                alt="logo"
                                className="w-[70px] md:w-[70px]"
                            />
                            <p>{data.name}</p>
                        </div>
                    </div>
                    <div className="title px-4 ">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold ">
                                {data.position}{" "}
                            </h1>
                            {isOwner && (
                                <button
                                    className="text-white bg-orange p-2 px-4 rounded-md"
                                    onClick={() => navigate(`/edit/${data.id}`)}
                                >
                                    Edit job
                                </button>
                            )}
                        </div>
                        <p className="location text-orange font-semibold">
                            {" "}
                            {data.location} | India
                        </p>
                    </div>
                    <div className="flex p-4 pt-5 gap-5">
                        <div className="compensation flex flex-col justify-between">
                            <div className="flex gap-2 items-center text-[#999999]">
                                <img src={money_img} height={30} alt="money" />
                                <p>Stipend</p>
                            </div>
                            <p>Rs {data.salary}/month</p>
                        </div>
                        <div className="duration flex flex-col justify-between">
                            <div className="flex gap-2 items-center text-[#999999]">
                                <img
                                    src={duration_img}
                                    height="30px"
                                    alt="duration"
                                />
                                <p>Duration</p>
                            </div>
                            <p>6 Months</p>
                        </div>
                    </div>
                    <div className="about p-4">
                        <h2 className="font-bold">About company</h2>
                        <p className="mt-4">{data.about}</p>
                    </div>
                    <div className="about p-4">
                        <h2 className="font-bold">About the job/internship</h2>
                        <p className="mt-8">{data.description}</p>
                    </div>
                    <div className="skills_container p-4">
                        <h2 className="font-bold">Skill(s) required</h2>
                        <div className="skills flex gap-3 mt-2">
                            {data.skills?.map((skill) => (
                                <div className="bg-lorange p-1 px-4 rounded-full">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="additional p-4">
                        <h2 className="font-bold">Additional Information</h2>
                        <p className="mt-4">{data.information}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ViewJob;
