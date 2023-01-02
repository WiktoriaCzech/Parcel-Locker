import recieveImg from "../img/template2.png"
import "./recieveData.css";
import Card from "./Card";
import {useEffect, useMemo, useState} from "react";



const { getData } = require("./db/db");
const packageList = getData();

function RecievePanel () {

    const [orderData, setOrderData] = useState([]);
    const [sortOption, setSortOption] = useState(); //status category selected

    let count =0;

    async function fetchOrderData (){
        const response = await fetch(
            'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/orders/receiving/' + window.userInfo.phoneNumber);
        const data = await response.json();
        setOrderData(data);
        console.log(data);
        console.log(window.userInfo.phoneNumber);
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
    function getFilteredData() {
        if(!sortOption){
            return orderData;
        }
        return orderData.filter((data) => data.status === sortOption);
    }

    //prevent repetive multiple function calls
    var filteredData = useMemo(getFilteredData, [sortOption, orderData]);

    function handleCategoryChange(event) {
        setSortOption(event.target.value);
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
                            JSON.stringify(orderData) === '[]' ? (
                                <div className="none-to-pick-up-response">
                                    <h2>Brak paczek do odbioru.</h2>
                                </div>
                            ) : (
                                filteredData.map((data) => {
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