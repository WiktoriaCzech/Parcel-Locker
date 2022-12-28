import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoginPanel.css';

window.userInfo = {
    phoneNumber: "",
    accountType: "",
}

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    async function login() {
        if (phoneNumber.length === 9) {
            if (password.length >= 5) {
                const result = await fetch(
                    'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({phoneNumber, password}),
                    });
                const result2 = await result.json();
                // console.log(result2);
                window.userInfo = result2;
                //console.log(window.userInfo); // TEST CZY PRZEKAZYWANE DANE MOZNA GLOBALNIE PRZENIESC DO INNEGO PLIKU
                if(result.status === 200) {
                    if(result2.accountType === "user")
                        navigate('/home-user');
                    else{
                        if(result2.accountType === "admin")
                            navigate('/home-admin');
                        else{
                            navigate('/home-delivery');
                        }
                    }
                }else {

                    navigate('/login');
                    alert("Niepoprawne dane logowania :(")
                }
            } else {
                alert('Hasło musi zawierać co najmniej 5 znaków!');
            }
        } else {
            alert('Podaj numer telefonu');
        }
    }

    return(
        <div className="login-wrapper">
            <div className="background-wrapper">
                <h1 style={{fontSize: "22px",color: "rgba(0,0,0,0.7)",fontWeight: "400", marginBottom: "8px"}}>Zaloguj się :)</h1>
                <form onSubmit={handleSubmit}>
                    <label className="email-wrapper">
                        <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Numer telefonu</span>
                        <input
                            type="text"
                            placeholder="123 456 789"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                        />
                    </label>
                    <label className="password-wrapper">
                        <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Hasło</span>
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                        />
                    </label>
                    <div>
                        <button
                            className="login-button-wrapper"
                            type="button"
                            onClick={login}
                        >
                            Zaloguj
                        </button>
                    </div>
                </form>
                <h1 style={{fontSize: "14px", marginBottom: "8px",color: "rgba(0,0,0,0.6)", fontFamily: "Montserrat", fontWeight: "400"}}>Brak konta ?</h1>
                <Link to="/register" className="register-link">Zarejestruj się tutaj</Link>
            </div>
        </div>
    )
    // ): (
    //     <div className="login-wrapper">
    //
    //     </div>
    // )
}
export default Login;