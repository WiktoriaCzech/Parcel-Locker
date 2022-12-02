import paczkus from "./img/Paczkus.png"
import logo from "./img/paczka.png"
import RecievePanel from "./RecievePanel";
import SendPanel from "./SendPanel";
import {useState} from "react";

function MainPagePanel () {

    const [panel, setPanel] = useState();

    const onPanelChange = (e) => {
        setPanel(e)
    }

    return (
        <div className="site-wrapper">
            <div className="left-side-wrapper">
                <div className="logo" >
                    <img src={logo} alt="Logo firmy" className="logo-img"/>
                    <h1 className="logo-title">Paczkuś sp. z.o.o</h1>
                </div>
                <div className="main-content">
                    <img src={paczkus} alt="Firmowy znak rozpoznawczy" className="P" />
                </div>
            </div>
            <div className="right-main-side-wrapper">
                <div className="top-button-content">
                    <button className="Odbior" type="primary">Odbieram</button>
                    <button className="Odbior" type="primary">Nadaję</button>
                </div>
                <div className="bottom-info-content">
                    <RecievePanel/>
                    <SendPanel/>
                </div>
            </div>
            <div className="footer">
                <h1>Paczkomat project ©2022</h1>
            </div>
        </div>

    )
}
export default MainPagePanel