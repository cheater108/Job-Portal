import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/formValidators";
import postRegister from "../api/postRegister";
import toast, { Toaster } from "react-hot-toast";

function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        number: "",
        consent: false,
    });

    const [error, setError] = useState({
        name: false,
        email: false,
        password: false,
        number: false,
        consent: false,
    });

    const errorCheck = {
        name: {
            message: "Name cannot be empty",
            valid: formData.name.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, name: true };
                }),
        },
        email: {
            message: "Invalid email",
            valid: isValidEmail(formData.email),
            error: () =>
                setError((err) => {
                    return { ...err, email: true };
                }),
        },
        number: {
            message: "Number must be equal or greater than 10",
            valid: formData.number.length >= 10,
            error: () =>
                setError((err) => {
                    return { ...err, number: true };
                }),
        },
        password: {
            message: "Invalid password",
            valid: isValidPassword(formData.password),
            error: () =>
                setError((err) => {
                    return { ...err, password: true };
                }),
        },
        consent: {
            message: "Must give consent",
            valid: formData.consent === true,
            error: () =>
                setError((err) => {
                    return { ...err, consent: true };
                }),
        },
    };

    async function handleSubmit(e) {
        e.preventDefault();
        let noError = true;
        // console.log(formData);
        Object.keys(errorCheck).map((key) => {
            if (!errorCheck[key].valid) {
                errorCheck[key].error();
                noError = false;
            }
        });

        if (noError) {
            postRegister(formData)
                .then((data) => {
                    toast.success("User created, please login next!");
                    setTimeout(() => navigate("/user/login"), 300);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
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
        <div className="w-full lg:max-w-md">
            <Toaster />
            <p
                className="font-bold text-2xl cursor-pointer select-none text-orange"
                onClick={() => navigate("/")}
            >
                Jobfinder
            </p>
            <h1 className="text-4xl font-bold">Create an account</h1>
            <p className="text-xl text-sblack">
                Your personal job finder is here
            </p>
            <form action="#" className="flex flex-col gap-5 mt-7">
                <input
                    className="outline-none p-3 px-4 border-2 border-slate-300 rounded-sm"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={inputChange}
                    value={formData.name}
                    required
                />
                {error.name && (
                    <p className="text-red-600 font-semibold">
                        {errorCheck.name.message}
                    </p>
                )}

                <input
                    className="outline-none p-3 px-4 border-2 border-slate-300 rounded-sm"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={inputChange}
                    value={formData.email}
                    required
                />
                {error.email && (
                    <p className="text-red-600 font-semibold">
                        {errorCheck.email.message}
                    </p>
                )}
                <input
                    className="outline-none p-3 px-4 border-2 border-slate-300 rounded-sm"
                    type="phone"
                    placeholder="Number"
                    name="number"
                    onChange={inputChange}
                    value={formData.number}
                    required
                />
                {error.number && (
                    <p className="text-red-600 font-semibold">
                        {errorCheck.number.message}
                    </p>
                )}
                <input
                    className="outline-none p-3 px-4 border-2 border-slate-300 rounded-sm"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={inputChange}
                    value={formData.password}
                    required
                />
                {error.password && (
                    <p className="text-red-600 font-semibold">
                        {errorCheck.password.message}
                    </p>
                )}
                <div className="flex gap-2 items-start">
                    <input
                        type="checkbox"
                        name="consent"
                        onChange={(e) => {
                            setFormData((data) => {
                                return {
                                    ...data,
                                    [e.target.name]: e.target.checked,
                                };
                            });
                            setError((err) => {
                                return { ...err, consent: false };
                            });
                        }}
                    />
                    <p className="text-sm">
                        By creating an account, I agree to our terms of use and
                        privacy policy
                    </p>
                </div>
                {error.consent && (
                    <p className="text-red-600 font-semibold">
                        {errorCheck.consent.message}
                    </p>
                )}
                <button
                    type="submit"
                    className="bg-orange p-2 px-4 w-2/5 rounded-sm text-white font-bold mt-5"
                    onClick={handleSubmit}
                >
                    Sign in
                </button>
            </form>
            <div className="flex gap-2 mt-4">
                <p className="text-sblack">Already have an account?</p>
                <Link to={"/user/login"} className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
