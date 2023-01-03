import React from "react";
import "../getData/Card.css";


function DeliveryCard({data}) {
    const {status, codeDelivering , receiverMachine, pickingDate} = data;
    return(
        <div className="delivery-card">
            <h4 className="card_paczkomat"><span className="s">Paczkomat: </span>{receiverMachine}</h4>
            <h4 className="card_kod"><span className="s">Kod odbioru: </span>{codeDelivering}</h4>
            <h4 className="card_status"><span className="s">Status: </span>{status}</h4>
            <h4 className="card_numer_paczki"><span className="s">Data odbioru: </span>{pickingDate}</h4>
        </div>
    );
}
export default DeliveryCard