import sendImg from "../img/template1.png"
import "./sendData.css";
import "./recieveData.css";
import {useState, useEffect, useMemo} from "react";
import SendCard from "./CardForSender";
import small from"../img/mala.png";
import bigger from"../img/srednia.png";
import big from"../img/duza.png";

// const { getData } = require("./db/db");
// const packageList = getData();

function SendPanel () {

    //display package info
    const [switchPanel,setSwitchPanel] = useState(true); //switch button state
    const [sendData, setSendData] = useState([]); //all send data from DB
    const [sortOption, setSortOption] = useState(); //status category selected

    let count = 0;

    //order package pickup info
    const [senderUser, setSenderUser] = useState('');
    const [receiverUser, setReceiverUser] = useState('');
    const [receiverMachine, setReceiverMachine] = useState('');
    const [size, setSize] = useState('smaller');

    async function sendForm() {

        const result = await fetch (
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/create/order',
            {
                method: 'POST',
                headers: {
                    "Authorization" : `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({senderUser, receiverUser, receiverMachine, size}),
            }
        );
        // const result2 = await result.json();
        // console.log(result2);
        if(result.status === 201) {
            alert("Dodano paczkę")
        }else {
            if (result.status === 400) {
                alert("Proszę sprawdzić poprawność danych!");
            }
        }
    }

    //display list of send packages
    async function fetchSendData (){
        const response = await fetch(
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/orders/sending/' + localStorage.phoneNumber,{
                headers: {"Authorization" : `Bearer ${localStorage.token}`}
            });
        const data = await response.json();
        setSendData(data);
        console.log(data);
        // console.log(window.userInfo.phone);
    }

    useEffect(() => {
        fetchSendData();
    },[]);

    //switch between form and list panel
    const showOpposite = () => {
        setSwitchPanel(!switchPanel);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    function counter() {
        count=count+1;
        return(
            <>
                <h4 className="order">{count}</h4>
            </>
        )
    }
    function getFilteredData() {
        if(!sortOption){
            return sendData;
        }
        return sendData.filter((data) => data.status === sortOption);
    }

    //prevent repetive multiple function calls
    var filteredData = useMemo(getFilteredData, [sortOption, sendData]);

    function handleCategoryChange(event) {
        setSortOption(event.target.value);
    }
    return (
        <div className="send-site-wrapper">
            {
                switchPanel ? (
                    <div className="send-form-wrapper">
                        <div className="send-form-title">
                            <h1>Nadaj paczkę: </h1>
                            <button className="switch" type="primary" onClick={showOpposite}>
                                Pokaż listę nadanych paczek
                            </button>
                        </div>
                        <form className="form-content" onSubmit={handleSubmit}>
                            <h4>Wybierz rozmiar przesyłki</h4>
                            <label className="choose-size-package-wrapper">
                                <div className="form-card">
                                    <h4>Mniejsza</h4>
                                    <div className="img-container">
                                        <img src={small} alt="box" />
                                    </div>
                                    <h6>max.</h6>
                                    <h6>15x16x17</h6>
                                    <input
                                        id="choose-size-small"
                                        name="package-size"
                                        className="choose-size"
                                        type="radio"
                                        value="smaller"
                                        checked
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                </div>
                                <div className="form-card">
                                    <h4>Większa</h4>
                                    <div className="img-container">
                                        <img src={bigger} alt="box" />
                                    </div>
                                    <h6>max.</h6>
                                    <h6>15x22x17</h6>
                                    <input
                                        id="choose-size-big"
                                        name="package-size"
                                        className="choose-size"
                                        type="radio"
                                        value="bigger"
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                </div>
                                <div className="form-card-inactive">
                                    <h4>Największa</h4>
                                    <div className="img-container">
                                        <img src={big} alt="box" />
                                    </div>
                                    <h6>max.</h6>
                                    <h6>53x34x44</h6>
                                    <h5>Ten rozmiar aktualnie <br/>nie jest dostępny.</h5>
                                </div>
                            </label>
                            <h4>Aby nadać paczkę wypełnij poniższe pola</h4>
                            <label className="sender-field-form">
                                <span className="form-text">Numer telefonu nadawcy: </span>
                                <input
                                    className="input-data"
                                    type="text"
                                    placeholder="np. 123 456 789"
                                    onChange={(e) => setSenderUser(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="reciever-field-form">
                                <span className="form-text">Numer telefonu odbiorcy: </span>
                                <input
                                    className="input-data"
                                    type="text"
                                    placeholder="np. 987 654 321"
                                    onChange={(e) => setReceiverUser(e.target.value)}
                                    required
                                />
                            </label>
                            <h4>Wybierz paczkomat, do którego mamy nadać paczkę.</h4>
                            <label className="choose-locker">
                                <span className="form-text">Paczkomat: </span>
                                <select name="category" id="chooseLockerForm" className="locker"
                                    value={receiverMachine}
                                    onChange={e => setReceiverMachine(e.target.value)}>
                                    <option value="-1">Wybierz paczkomat</option>
                                    <option className="level-1" value="PDKP1">PDKP1</option>
                                </select>
                            </label>
                            <div className="submit-button-placing">
                                <button
                                    className="submit-form"
                                    type="button"
                                    onClick={sendForm}
                                    >
                                    Wyślij
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className="wrapper-list">
                            <div className="package-list-container">
                                <div className="recieve-header">
                                    <div className="image_container">
                                        <img src={sendImg} alt="send label"/>
                                    </div>
                                    <h1 className="list-header-send">Lista nadanych paczek </h1>
                                    <button className="switch" type="primary" onClick={showOpposite}>
                                        Nadaj paczkę
                                    </button>
                                    <select name="category" id="original" className="postform"
                                            onChange={handleCategoryChange}>
                                        <option value="">Sort by</option>
                                        <option className="level-0" value="received">Dostarczono</option>
                                        <option className="level-0" value="picked">Odebrano</option>
                                        <option className="level-0" value="inserted">Nadano</option>
                                        <option className="level-0" value="ordered">Zamówiono</option>
                                    </select>
                                </div>
                                {
                                    JSON.stringify(sendData) === '[]' ? (
                                        <div className="none-to-pick-up-response">
                                            <h2>Nie masz nadanych paczek.</h2>
                                        </div>
                                    ) : (
                                        filteredData.length === 0 ? (
                                            <h1 className="filter-response">Nie ma paczek spełniających kryteria</h1>
                                        ) : (
                                            filteredData.map((data) => {
                                                return (
                                                    <div className="recieve-single-item">
                                                        <h4 className="order-list">{counter()}</h4>
                                                        <SendCard data={data} key={data.id}/>
                                                    </div>
                                                )
                                            })
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )

}
export default SendPanel