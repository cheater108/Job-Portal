import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import postJob from "../api/postJob";
import { useNavigate } from "react-router-dom";

const formFields = [
    {
        label: "Company Name",
        placeholder: "Enter your company name here",
        id: "name",
        type: "text",
    },
    {
        label: "Add logo URL",
        placeholder: "Enter the link",
        id: "logo",
        type: "text",
    },
    {
        label: "Job position",
        placeholder: "Enter job position",
        id: "position",
        type: "text",
    },
    {
        label: "Monthly salary",
        placeholder: "Enter Amount in rupees",
        id: "salary",
        type: "text",
    },
    {
        label: "Job Type",
        placeholder: "",
        id: "jobType",
        type: "select",
        options: ["Full-Time", "Part-Time", "Contract", "Internship"],
    },
    {
        label: "Remote / office",
        placeholder: "",
        id: "remote",
        type: "select",
        options: ["Remote", "Office"],
    },
    {
        label: "Location",
        placeholder: "Enter Location",
        id: "location",
        type: "text",
    },
    {
        label: "Job Description",
        placeholder: "Type the job description",
        id: "description",
        type: "textarea",
    },
    {
        label: "About Company",
        placeholder: "Type about your company",
        id: "about",
        type: "textarea",
    },
    {
        label: "Skills Required",
        placeholder: "Enter the must have skills",
        id: "skills",
        type: "text",
    },
    {
        label: "Information",
        placeholder: "Enter the additional information",
        id: "information",
        type: "text",
    },
];

function AddjobFrom() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        logo: "",
        position: "",
        salary: "",
        jobType: "Full-Time",
        remote: "Remote",
        location: "",
        description: "",
        about: "",
        skills: "",
        information: "",
    });

    const [error, setError] = useState({
        name: false,
        logo: false,
        position: false,
        salary: false,
        jobType: false,
        remote: false,
        location: false,
        description: false,
        about: false,
        skills: false,
        information: false,
    });

    const errorCheck = {
        name: {
            message: "Please provide an name",
            valid: formData.name.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, name: true };
                }),
        },
        logo: {
            message: "Please provide a link to company logo",
            valid: formData.logo.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, logo: true };
                }),
        },
        position: {
            message: "Please provide job position",
            valid: formData.position.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, position: true };
                }),
        },
        salary: {
            message: "Please provide salary info in number per month",
            valid: formData.salary.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, salary: true };
                }),
        },
        jobType: {
            message: "Please select a job type",
            valid: formData.jobType.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, jobType: true };
                }),
        },
        remote: {
            message: "Please select remote or office",
            valid: formData.remote.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, remote: true };
                }),
        },
        location: {
            message: "Please enter a location",
            valid: formData.location.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, location: true };
                }),
        },
        description: {
            message: "Please add job description",
            valid: formData.description.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, description: true };
                }),
        },
        about: {
            message: "Please tell about company",
            valid: formData.about.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, about: true };
                }),
        },
        skills: {
            message: "Please enter atleast one skill",
            valid: formData.skills.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, skills: true };
                }),
        },
        information: {
            message: "Please enter information",
            valid: formData.information.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, information: true };
                }),
        },
    };

    function handleSubmit(e) {
        e.preventDefault();
        let noError = true;

        Object.keys(errorCheck).map((key) => {
            if (!errorCheck[key].valid) {
                errorCheck[key].error();
                noError = false;
            }
        });

        if (noError) {
            postJob(formData)
                .then((data) => {
                    toast.success("Job created successfully");
                    setTimeout(() => navigate("/"), 300);
                })
                .catch((err) => toast.error(err.response.data.message));
        }
    }

    function handleCancel() {
        navigate("/");
    }

    function inputChange(e) {
        setFormData((data) => {
            return { ...data, [e.target.name]: e.target.value };
        });
        setError((err) => {
            return { ...err, [e.target.name]: false };
        });
    }

    return (
        <div className="w-full m-auto p-8">
            <Toaster />
            <h1 className="text-3xl font-bold">Add job description</h1>
            <form action="#" className="flex flex-col gap-5 mt-7">
                {formFields.map((field) => {
                    if (field.type === "text") {
                        return (
                            <>
                                <div
                                    className="flex items-center gap-4"
                                    key={field.id}
                                >
                                    <label
                                        htmlFor={field.id}
                                        className="font-semibold w-3/12"
                                    >
                                        {field.label}{" "}
                                    </label>
                                    <input
                                        className="outline-none p-3 px-4 border-2 border-slate-300 rounded-[5px] flex-1"
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        id={field.id}
                                        name={field.id}
                                        value={formData[field.id]}
                                        onChange={inputChange}
                                        required
                                    />
                                </div>
                                {error[field.id] && (
                                    <p className="text-red-600 font-semibold text-right">
                                        {errorCheck[field.id].message}
                                    </p>
                                )}
                            </>
                        );
                    } else if (field.type === "select") {
                        return (
                            <>
                                <div
                                    className="flex items-center gap-4"
                                    key={field.id}
                                >
                                    <label
                                        htmlFor={field.id}
                                        className="font-semibold w-3/12"
                                    >
                                        {field.label}{" "}
                                    </label>
                                    <select
                                        id={field.id}
                                        className="outline-none flex-1 p-3 px-4 border-2 border-slate-300 rounded-[5px] md:w-2/6"
                                        value={formData[field.id]}
                                        name={field.id}
                                        onChange={inputChange}
                                    >
                                        {field.options.map((option) => (
                                            <option value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {error[field.id] && (
                                    <p className="text-red-600 font-semibold text-right">
                                        {errorCheck[field.id].message}
                                    </p>
                                )}
                            </>
                        );
                    } else {
                        return (
                            <>
                                <div
                                    className="flex items-center gap-4"
                                    key={field.id}
                                >
                                    <label
                                        htmlFor={field.id}
                                        className="font-semibold w-3/12 self-start"
                                    >
                                        {field.label}{" "}
                                    </label>
                                    <textarea
                                        className="outline-none p-3 px-4 border-2 border-slate-300 rounded-[5px] flex-1
                                    resize-none
                                    "
                                        placeholder={field.placeholder}
                                        id={field.id}
                                        onChange={inputChange}
                                        name={field.id}
                                        rows={2}
                                        value={formData[field.id]}
                                        required
                                    ></textarea>
                                </div>
                                {error[field.id] && (
                                    <p className="text-red-600 font-semibold text-right">
                                        {errorCheck[field.id].message}
                                    </p>
                                )}
                            </>
                        );
                    }
                })}

                <div className="flex flex-row-reverse gap-4">
                    <button
                        type="submit"
                        className="bg-orange p-2 px-4 w-2/5 rounded-md text-white font-bold mt-5"
                        onClick={handleSubmit}
                    >
                        + Add Job
                    </button>
                    <button
                        className="text-[#C2C2C2] p-2 px-4 w-2/5 rounded-md border-2  font-bold mt-5"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddjobFrom;
