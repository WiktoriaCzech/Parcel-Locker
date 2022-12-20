import paczkus from "../img/Paczkus1.png"
import logo from "../img/paczka1.png"
import RecievePanel from "../getData/RecievePanel";
import SendPanel from "../getData/SendPanel";
import {useState} from "react";
import "../User/MainUserPanel.css";

function MainUserPanel () {

    const [sendPanel, setSendPanel] = useState(false);
    const [recievePanel, setRecievePanel] = useState(false);

    const [last, setLast]=useState("");

    //set visibility on Sending button
    const showSendPanel = () => {
        setSendPanel(!sendPanel);
        setLast("a");
    }

    //set visibility on Recieve button
    const showRecievePanel = () => {
        setRecievePanel(!recievePanel);
        setLast("b")
    }

    //prevents from rendering 2 sites at the same time
    if(sendPanel === true && recievePanel === true) {
        if(last === "a"){
            setSendPanel(true);
            setRecievePanel(false);
        }
        if(last === "b"){
            setSendPanel(false);
            setRecievePanel(true);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('user-info');
        return (
            window.location="/login"
        )
    }

    return (
        <div className="site-wrapper">
            <div className="content">
                <div className="left-side-wrapper">
                    <div className="logo-at-left-side" >
                        <img src={logo} alt="Logo firmy" className="logo-img"/>
                        <h1 className="logo-title">Paczkuś sp. z.o.o</h1>
                    </div>
                    <div className="main-content">
                        <img src={paczkus} alt="Firmowy znak rozpoznawczy" className="P" />
                    </div>
                </div>
                <div className="right-main-side-wrapper">
                    <div className="logout-button-wrapper">
                        <button className="logout-button" type="primary" onClick={handleLogout}>Wyloguj się</button>
                        <div className="logo-at-right-side" >
                            <img src={logo} alt="Logo firmy" className="logo-img"/>
                            <h1 className="logo-title">Paczkuś sp. z.o.o</h1>
                        </div>
                    </div>
                    <div className="top-button-content">
                        <button className="Odbior" type="primary" onClick={showRecievePanel}>Odbieram</button>
                        <button className="Nadanie" type="primary" onClick={showSendPanel}>Nadaję</button>
                    </div>
                    <div className="bottom-info-content">
                        <nav className={sendPanel ? "send-panel active" : "send-panel"}>
                            <SendPanel/>
                        </nav>
                        <nav className={recievePanel ? "recieve-panel active" : "recieve-panel"}>
                            <RecievePanel/>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="footer">
                <h1>Paczkomat project ©2022</h1>
            </div>
        </div>
    )
}
export default MainUserPanel