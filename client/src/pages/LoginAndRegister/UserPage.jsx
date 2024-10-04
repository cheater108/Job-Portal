// import img from "../../assets/cover.png";
import { Outlet } from "react-router-dom";

function UserPage() {
    return (
        <div className="w-full min-h-dvh flex">
            <div className="left p-3 flex flex-1 justify-center items-center">
                <Outlet />
            </div>
            <div className="right hidden lg:flex bg-hero w-2/5 bg-cover">
                {/* <img src={img} className="h-full" alt="cover" /> */}
            </div>
        </div>
    );
}

export default UserPage;
