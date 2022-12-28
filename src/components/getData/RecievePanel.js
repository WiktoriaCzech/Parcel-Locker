import recieveImg from "../img/template2.png"
import "./recieveData.css";
import Card from "./Card";
import {useEffect, useState} from "react";



const { getData } = require("./db/db");
const packageList = getData();

function RecievePanel () {

    const [orderData, setOrderData] = useState([]);

    let count =0;

    async function fetchOrderData (){
        const response = await fetch(
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/orders/receiving/' + window.userInfo.phoneNumber);
        const data = await response.json();
        setOrderData(data);
        console.log(data);
        console.log(window.userInfo.phone);
    }

    useEffect(() => {
        fetchOrderData();
    },[]);

    function counter() {
        count=count+1;
        return(
            <>
                <h4 className="order">{count}</h4>
            </>
        )
    }

    return(
        <>
            <div className="wrapper-list">
                <div className="package-list-container">
                    <div className="recieve-header">
                        <div className="image_container">
                            <img src={recieveImg} alt="order label" />
                        </div>
                        <h1 className="list-header">Lista paczek do odbioru</h1>
                        <select name="category" id="original" className="postform">
                            <option value="-1">Sort by</option>
                            <option className="level-0" value="29">A-Z</option>
                            <option className="level-0" value="26">Z-A</option>
                            <option className="level-0" value="23">Date</option>
                        </select>
                    </div>
                        {
                            JSON.stringify(orderData) === '[]' ? (
                                <div className="none-to-pick-up-response">
                                    <h2>Brak paczek do odbioru.</h2>
                                </div>
                            ) : (
                                orderData.map((data) => {
                                    return (
                                        <div className="recieve-single-item">
                                            <h4 className="order-list">{counter()}</h4>
                                            <Card data={data} key={data.id} />
                                        </div>
                                    )
                                })
                            )
                        }
                    <div className="pagination">
                        {/*<a href="#" style={{float: "left", marginLeft: "70px"}}>❮</a>*/}
                        {/*<a href="#" style={{float: "right", marginRight: "42px"}}>❯</a>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
export default RecievePanel