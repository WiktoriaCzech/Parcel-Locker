import React from "react";
import "./Card.css";

function Card({data}) {
    const {id, status, senderUser, codeReceiving , receiverMachine, deliveryDate, receivingDate} = data;
    return(
        <div className="card">
            <h4 className="card_numer_paczki"><span className="s">Nadawca: </span>{senderUser}</h4>
            <h4 className="card_kod"><span className="s">Kod odbioru: </span>{codeReceiving}</h4>
            <h4 className="card_status"><span className="s">Status: </span>{status}</h4>
            <h4 className="card_paczkomat"><span className="s">Paczkomat: </span>{receiverMachine}</h4>
        </div>
    );
}
export default Card