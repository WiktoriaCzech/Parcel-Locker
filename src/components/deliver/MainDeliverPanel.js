import React, {useEffect, useState} from "react";
import "./MainDeliverPanel.css";
import DeliveryCard from "./DeliveryCard";
import PickupCard from "./PickupCard";
import logo from "../img/paczka.png";
import kurier from "../img/kurier1.png";
import {Navigate} from "react-router-dom";

function MainDeliverPanel () {

    const [deliverData, setDeliverData] = useState([]);
    const [pickupData, setPickupData] = useState([]);

    let countpick = 0;
    let countdeliver = 0;

    async function fetchDeliverData (){
        const response = await fetch(
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/orders/delivering', {
                headers: {"Authorization" : `Bearer ${localStorage.token}`}
            });
        const data = await response.json();
            setDeliverData(data);
        // console.log(data);
    }
    async function fetchPickupData (){
        const response = await fetch(
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/orders/picking', {
                headers: {"Authorization" : `Bearer ${localStorage.token}`}
            });
        const data2 = await response.json();
        setPickupData(data2);
        // console.log(data2);
    }

    useEffect(() => {
        fetchDeliverData();
        fetchPickupData();
    },[]);

    function counterPick() {
        countpick=countpick+1;
        return(
            <>
                <h4 className="order">{countpick}</h4>
            </>
        )
    }
    function counterDeliver() {
        countdeliver=countdeliver+1;
        return(
            <>
                <h4 className="order">{countdeliver}</h4>
            </>
        )
    }
    const handleLogout = () => {
        localStorage.removeItem('accountType')
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('token');
        return (
            window.location="/login"
        )
    }

    return(
        <div>{
            localStorage.accountType === 'delivery_man' ? (
            <div>
                <div className="delivery">
                    <div className="greetings-with-logo">
                        <div className="logo-at-left-side" >
                            <img src={logo} alt="Logo firmy" className="logo-img"/>
                            <h1 className="logo-title">Paczkuś sp. z.o.o</h1>
                        </div>
                        <h1 className="greetings">Dzień Dobry, miłego dnia ! :)</h1>
                        <button className="logout-button-deliveryMan" type="primary" onClick={handleLogout}>Wyloguj się</button>
                    </div>
                    <div className="delivery-site-wrapper">
                        <div className="box-wrapper">
                            <div className="deliver-wrapper">
                                <h2 className="delivery-header">Lista paczek do dostarczenia </h2>
                                {
                                    JSON.stringify(deliverData) === '[]' ? (
                                        <div className="none-to-pick-up-response">
                                            <h2>Nie masz paczek do dostarczenia.</h2>
                                        </div>
                                    ) : (
                                        deliverData.map((data) => {
                                            return (
                                                <div className="recieve-single-item">
                                                    <h4 className="order-list">{counterDeliver()}</h4>
                                                    <DeliveryCard data={data} key={data.id} />
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                            <div className="pickup-wrapper">
                                <h2 className="delivery-header">Lista paczek do odebrania </h2>
                                {
                                    JSON.stringify(pickupData) === '[]' ? (
                                        <div className="none-to-pick-up-response">
                                            <h2>Nie masz paczek do odebrania.</h2>
                                        </div>
                                    ) : (
                                        pickupData.map((data) => {
                                            return (
                                                <div className="recieve-single-item">
                                                    <h4 className="order-list">{counterPick()}</h4>
                                                    <PickupCard data={data} key={data.id} />
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                        <div className="image-wrapper">
                            <div className="main-content-delivery">
                                <img src={kurier} alt="Firmowy znak rozpoznawczy" className="K" />
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <h1>Paczkomat project ©2022</h1>
                    </div>
                </div>
            </div>
            ): <Navigate to="/login" />}
        </div>
    )
}

export default MainDeliverPanel