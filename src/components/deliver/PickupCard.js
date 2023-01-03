import React from "react";
import "../getData/Card.css";
function PickupCard({data}) {
    const {status, codePicking , senderMachine, insertionDate} = data;
    return(
        <div className="pickup-card">
            <h4 className="card_paczkomat"><span className="s">Paczkomat: </span>{senderMachine}</h4>
            <h4 className="card_kod"><span className="s">Kod odbioru: </span>{codePicking}</h4>
            <h4 className="card_status"><span className="s">Status: </span>{status}</h4>
            <h4 className="card_numer_paczki"><span className="s">Data nadania w paczkomacie: </span>{insertionDate}</h4>
        </div>
    );
}
export default PickupCard