import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import postLogin from "../api/postLogin";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: false,
        password: false,
    });

    const errorCheck = {
        email: {
            message: "Please provide an email",
            valid: formData.email.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, email: true };
                }),
        },

        password: {
            message: "Password cannot be empty",
            valid: formData.password.length > 0,
            error: () =>
                setError((err) => {
                    return { ...err, password: true };
                }),
        },
    };

    async function handleSubmit(e) {
        e.preventDefault();
        let noError = true;

        Object.keys(errorCheck).map((key) => {
            if (!errorCheck[key].valid) {
                errorCheck[key].error();
                noError = false;
            }
        });

        if (noError) {
            postLogin(formData)
                .then((data) => {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", data.user);
                    toast.success("login successful");
                    setTimeout(() => navigate("/"), 300);
                })
                .catch((err) => toast.error(err.response.data.message));
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
        <div className="relative">
            <Toaster />
            <p
                className="font-bold text-2xl cursor-pointer select-none text-orange"
                onClick={() => navigate("/")}
            >
                Jobfinder
            </p>
            <h1 className="text-4xl font-bold">Already have an account?</h1>
            <p className="text-xl text-sblack">
                Your personal job finder is here
            </p>
            <form action="#" className="flex flex-col gap-5 mt-7">
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
                <button
                    type="submit"
                    className="bg-orange p-2 px-4 w-2/5 rounded-sm text-white font-bold mt-5"
                    onClick={handleSubmit}
                >
                    Sign in
                </button>
            </form>
            <div className="flex gap-2 mt-4">
                <p className="text-sblack">Don’t have an account?</p>
                <Link to={"/user/register"} className="underline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;
