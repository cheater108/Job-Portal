import Navbar from "../../components/Navbar";

function NotFound() {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex flex-1 justify-center items-center">
                <h1 className="font-extrabold text-3xl">
                    404 - page not found
                </h1>
            </main>
        </div>
    );
}

export default NotFound;
