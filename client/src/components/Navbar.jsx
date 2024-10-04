import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("token");
    function loggout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }
    return (
        <div className="top bg-orange text-white rounded-b-half">
            <div className="w-11/12 m-auto flex items-center justify-between p-3 py-8">
                <p
                    className="font-bold text-2xl cursor-pointer select-none"
                    onClick={() => navigate("/")}
                >
                    Jobfinder
                </p>
                {loggedIn ? (
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <button
                            className="px-4 p-1 font-medium border-white border-2 rounded-md hover:text-orange hover:bg-white"
                            onClick={loggout}
                        >
                            Logout
                        </button>
                        <p className="text-white">Hello recuriter!</p>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            className="px-4 p-1 font-medium border-white border-2 rounded-md hover:text-orange hover:bg-white"
                            onClick={() => navigate("/user/login")}
                        >
                            Login
                        </button>
                        <button
                            className="px-4 p-1 bg-white text-orange font-medium border-white border-2 rounded-md hover:text-white hover:bg-orange"
                            onClick={() => navigate("/user/register")}
                        >
                            Register
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
