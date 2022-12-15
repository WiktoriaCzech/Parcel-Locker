import recieveImg from "../img/template2.png"
import "./recieveData.css";
import Card from "./Card";

const { getData } = require("./db/db");

const packageList = getData();
function RecievePanel () {
    return(
        <>
            <div className="wrapper-list">
                <div className="package-list-container">
                    <div className="recieve-header">
                        <div className="image_container">
                            <img src={recieveImg} alt="order label" />
                        </div>
                        <h1 className="list-header">Lista paczek do odbioru</h1>
                        <button>Sortowanie</button>
                    </div>
                    {
                    packageList.map((data) => {
                        return (
                            <div className="recieve-single-item">
                                <h4 className="order">{data.id}</h4>
                                <Card data={data} key={data.id} />
                            </div>
                        )
                    })}
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