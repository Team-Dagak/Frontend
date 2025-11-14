
import { PiNotePencilDuotone } from "react-icons/pi";

interface AddBigGoalProps {
    handleAddEmptyGoal: () => void;
}

export default function AddBigGoal({handleAddEmptyGoal}:AddBigGoalProps) {

    return (
        <button type="button" onClick={handleAddEmptyGoal}>
            <PiNotePencilDuotone size="30px" />
        </button>
    );
}
