import map from "../assets/map.png";

function JobCardLinkedIn({ logo, position, location, url }) {
    function handleViewOnLinkedIn() {
        window.open(url, "_blank");
    }

    return (
        <div className="w-full mt-5 shadow-linked shadow-[#0077B5] flex flex-col p-2 sm:flex-row">
            <div className="logo p-2 hidden lg:block">
                <img src={logo} alt="company logo" className=" w-[40px]" />
            </div>
            <div className="details p-2">
                <div className="flex gap-3 items-center">
                    <img
                        src={logo}
                        alt="company logo"
                        className="lg:hidden w-[40px]"
                    />
                    <p className="font-bold p-2 pt-0 text-lg">{position}</p>
                </div>
                <div className="detail flex text-sblack p-2 gap-4 mt-1">
                    {/* <div className="employees flex items-center gap-2">
                        <img src={employee} alt="size" />
                        <p>11-20</p>
                    </div> */}
                    {/* <div className="salary">₹ {salary}</div> */}
                    <div className="country flex gap-2">
                        <img
                            src={map}
                            alt="map"
                            width={30}
                            className="rounded-md"
                        />
                        <p>{location}</p>
                    </div>
                </div>
                {/* <div className="type flex text-orange p-2 pb-0 gap-4">
                    <p>{remote}</p>
                    <p>{jobType}</p>
                </div> */}
            </div>

            <div className="right flex-1 p-2">
                {/* <div className="tags flex gap-2 justify-end flex-wrap">
                    {skills?.map((skill) => (
                        <div className="bg-lorange font-medium p-1 px-2 min-w-20 text-center">
                            {" "}
                            {skill}
                        </div>
                    ))}
                </div> */}
                <div className="flex gap-4 flex-row-reverse">
                    <button
                        className="text-white bg-[#0077B5] mt-4 p-2 px-4 rounded-md"
                        onClick={handleViewOnLinkedIn}
                    >
                        View on linkedin
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobCardLinkedIn;
