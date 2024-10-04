import EditjobFrom from "../../components/EditjobForm";
import { useParams } from "react-router-dom";

function EditJob() {
    const { jobId } = useParams();
    return (
        <div className="flex">
            <div className="flex-1">
                <EditjobFrom jobId={jobId} />
            </div>
            <div className="bg-job hidden lg:block w-2/5 bg-contain"></div>
        </div>
    );
}

export default EditJob;
