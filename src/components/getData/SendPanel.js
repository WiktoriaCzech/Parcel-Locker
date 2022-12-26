import sendImg from "../img/template1.png"
import "./sendData.css";
import "./recieveData.css";
import {useState, useEffect} from "react";
import Card from "./Card";
import boxImg from"../img/paczka.png";

const { getData } = require("./db/db");
const packageList = getData();

function SendPanel () {

    const [switchPanel,setSwitchPanel] = useState(true); //switch button state
    const [sendData, setSendData] = useState([]); //get req to display list

    let count = 0;

    //POST form request
    const [senderUser, setSenderUser] = useState('');
    const [receiverUser, setReceiverUser] = useState('');
    const [receiverMachine, setReceiverMachine] = useState('');

    async function sendForm() {
        selectElement('chooseLockerForm', 'PDKP1');
        const result = await fetch (
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/create/order',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({senderUser, receiverUser, receiverMachine}),
            }
        );
        const result2 = await result.json();
        console.log(result2);
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
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/orders/sending/' + window.userInfo.phone);
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
    function selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
        setReceiverMachine (element.value);
    }
    function counter() {
        count=count+1;
        return(
            <>
                <h4 className="order">{count}</h4>
            </>
        )
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
                            {/*<h4>Wybierz rozmiar przesyłki</h4>*/}
                            {/*<label className="choose-size-package-wrapper">*/}
                            {/*    <div className="form-card">*/}
                            {/*        <div className="img-container">*/}
                            {/*            <img src={boxImg} alt="box" />*/}
                            {/*        </div>*/}
                            {/*        <h6>13x23x20</h6>*/}
                            {/*        <input className="choose-size" type="checkbox"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="form-card">*/}
                            {/*        <div className="img-container">*/}
                            {/*            <img src={boxImg} alt="box" />*/}
                            {/*        </div>*/}
                            {/*        <h6>33x23x44</h6>*/}
                            {/*        <input className="choose-size" type="checkbox"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="form-card">*/}
                            {/*        <div className="img-container">*/}
                            {/*            <img src={boxImg} alt="box" />*/}
                            {/*        </div>*/}
                            {/*        <h6>5x13x7</h6>*/}
                            {/*        <input className="choose-size" type="checkbox"/>*/}
                            {/*    </div>*/}
                            {/*</label>*/}
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
                                <select name="category" id="chooseLockerForm" className="locker">
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
                                    <select name="category" id="original" className="postform">
                                        <option value="-1">Sort by</option>
                                        <option className="level-0" value="29">A-Z</option>
                                        <option className="level-0" value="26">Z-A</option>
                                        <option className="level-0" value="23">Date</option>
                                    </select>
                                </div>
                                {
                                    JSON.stringify(packageList) === '[]' ? (
                                        <div className="none-to-pick-up-response">
                                            <h2>Nie masz nadanych paczek.</h2>
                                        </div>
                                    ) : (
                                        packageList.map((data) => {
                                            return (
                                                <div className="recieve-single-item">
                                                    <h4 className="order-list">{counter()}</h4>
                                                    <Card data={data} key={data.id}/>
                                                </div>
                                            )
                                        })
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