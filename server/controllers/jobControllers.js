const { Job } = require("../schema/job.schema");
const isAuth = require("../utils/index");
const { jobSchema } = require("../utils/validationSchema");

const postJob = async (req, res) => {
    const {
        name,
        logo,
        position,
        salary,
        jobType,
        remote,
        location,
        description,
        about,
        skills,
        information,
    } = jobSchema.parse(req.body);

    const { user } = req;
    // console.log(req.body);
    const jobs = skills.split(",").map((skill) => skill.trim());
    // console.log(jobs);
    const job = new Job({
        name,
        logo,
        position,
        salary,
        jobType,
        remote,
        location,
        description,
        about,
        skills: jobs,
        information,
        creator: user,
    });
    await job.save();
    res.status(200).json({ message: "Job created successfully" });
};

const getJobs = async (req, res) => {
    const isAuthenticated = isAuth(req);
    const jobs = await Job.find({}); //.select("-_id -creator -about -information");
    // if (isAuthenticated) {
    //     console.log(isAuthenticated);
    //     const jobsIsOwner = jobs.map((job) => {
    //         return {
    //             ...job,
    //             isOwner: String(job._id) === String(isAuthenticated.id),
    //         };
    //     });
    //     return res.status(200).json(jobsIsOwner);
    // }

    // console.log(jobs);
    res.status(200).json(jobs);
};

const getJobById = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
};

const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    if (job.creator.toString() !== req.user.toString()) {
        return res
            .status(401)
            .json({ message: "You are not authorized to delete this job" });
    }
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
};

const editJob = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            logo,
            position,
            salary,
            jobType,
            remote,
            location,
            description,
            about,
            skills,
            information,
        } = jobSchema.parse(req.body);
        const jobSkills = skills?.split(",").map((skill) => skill.trim());
        let job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (job.creator.toString() !== req.user.toString()) {
            return res.status(401).json({
                message: "You are not authorized to update this job",
            });
        }
        job = await Job.findByIdAndUpdate(
            id,
            {
                name,
                logo,
                position,
                salary,
                jobType,
                remote,
                location,
                description,
                about,
                skills: jobSkills,
                information,
            },
            { new: true }
        );
        //job.save
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: "Job not updated" });
    }
};

const searchJobByTitle = async (req, res) => {
    const { title } = req.params;
    const jobs = await Job.find({ name: new RegExp(title, "i") }).select(
        "-_id -creator -about -information"
    );
    res.status(200).json(jobs);
};

module.exports = {
    postJob,
    getJobs,
    getJobById,
    deleteJob,
    editJob,
    searchJobByTitle,
};
