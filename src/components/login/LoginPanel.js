import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import LoadingSpinner from "../Spinner/SpinnerAnimation";
import './LoginPanel.css';
import axios from 'axios';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //update the loading state
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const setAuthToken = token => {
        if(token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else
            delete axios.defaults.headers.common["Authorization"];
    }

    async function login() {
        if (phoneNumber.length === 9) {
            if (password.length >= 5) {
                setIsLoading(true);
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
                //get token from response
                const token = result2.token;
                //set JWT token to local
                localStorage.setItem("token", token);
                //set authorization token
                setAuthToken(token);

                const loginInfo = result2.phoneNumber;
                const account = result2.accountType;
                localStorage.setItem("phoneNumber", loginInfo);
                localStorage.setItem("accountType", account);

               //  window.userInfo = result2;

                if(result.status === 200) {
                    setIsLoading(false);
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
                    setIsLoading(false);
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
            {isLoading ? <LoadingSpinner /> :
            <div className="background-wrapper">
                <h1 style={{fontSize: "22px",color: "rgba(0,0,0,0.7)",fontWeight: "400", marginBottom: "8px"}}>Zaloguj się :)</h1>
                <form onSubmit={handleSubmit}>
                    <label className="required-items">
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
                            disabled={isLoading}
                        >
                            Zaloguj
                        </button>
                    </div>
                </form>
                <h1 style={{fontSize: "14px", marginBottom: "8px",color: "rgba(0,0,0,0.6)", fontFamily: "Montserrat", fontWeight: "400"}}>Brak konta ?</h1>
                <Link to="/register" className="register-link">Zarejestruj się tutaj</Link>
            </div>
            }
        </div>
    )
}
export default Login;