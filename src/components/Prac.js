import React, { useState } from "react";

export const Proc = () => {
    const [showProc, setShowProc] = useState(true);
    const handleClick = () => {
        setShowProc(false)
    }

    const toggleShow = () => {
        setShowProc(!showProc)
    }
    return (
        <div>
            <button onClick={toggleShow}>
                {showProc ? <div>Proc</div> : "Dont show"}
            </button>
        </div>
    )
}