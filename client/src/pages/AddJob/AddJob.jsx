import React from "react";
import AddjobFrom from "../../components/AddjobFrom";

function AddJob() {
    return (
        <div className="flex">
            <div className="flex-1">
                <AddjobFrom />
            </div>
            <div className="bg-job hidden lg:block w-2/5 bg-contain"></div>
        </div>
    );
}

export default AddJob;
