import React from "react";
import "./CardForSender.css";

function SendCard({data}) {
    const {id, status, receiverUser} = data;
    return(
        <div className="send-card">
            <h4 className="card-odbiorca"><span className="s">Odbiorca: </span>{receiverUser}</h4>
            <h4 className="card-status"><span className="s">Status: </span>{status}</h4>
        </div>
    );
}
export default SendCard