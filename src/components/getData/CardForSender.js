import React from "react";
import "./CardForSender.css";

function SendCard({data}) {
    const {id, status, receiverUser, codeInserting, senderMachine} = data;
    return(
        <div className="card">
            <h4 className="card_numer_paczki"><span className="s">Odbiorca: </span>{receiverUser}</h4>
            <h4 className="card_kod"><span className="s">Kod nadania: </span>{codeInserting}</h4>
            <h4 className="card_paczkomat"><span className="s">Paczkomat: </span>{senderMachine}</h4>
            <h4 className="card_status"><span className="s">Status: </span>{status}</h4>
        </div>
    );
}
export default SendCard