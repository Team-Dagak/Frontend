/** @jsxImportSource @emotion/react */
import { PiNotePencilDuotone } from "react-icons/pi";
import { usePopupStore } from "../../store/states";
import { css } from "@emotion/react";
import { useEffect } from "react";

export default function AddBigGoal() {
    const setPopupGoal = usePopupStore((state) => state.setPopupGoal);

    const handleAddEmptyGoal = () => {
        console.log("Clicked!"); // 클릭 확인
        setPopupGoal({ recommendation: "" });
    };

    return <PiNotePencilDuotone size="30px" onClick={handleAddEmptyGoal} />;
}
