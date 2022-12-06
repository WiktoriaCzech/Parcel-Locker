import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoginPanel.css';
const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/home-user');
        }
    }, []);

    async function login() {
        if (phoneNumber.length === 9) {
            if (password.length >= 5) {
                const userData = { phoneNumber, password };
                const result = await fetch(
                    'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/users',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(userData),
                    }
                );
                const result2 = await result.json();
                localStorage.setItem('user-info', JSON.stringify(result2));
                localStorage.setItem(
                    'access-token',
                    result.headers.get('Access-Token') || ''
                );
                localStorage.setItem('expiry', result.headers.get('Expiry') || '');
                localStorage.setItem('client', result.headers.get('Client') || '');
                localStorage.setItem('uid', result.headers.get('Uid') || '');

                navigate('/home-user');
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
                <h1 style={{fontSize: "22px",color: "#fff",fontWeight: "400"}}>Zaloguj się :)</h1>
                <form>
                    <label className="email-wrapper">
                        <span style={{color: "#95a5a9", marginBottom: "3px"}}>Numer telefonu</span>
                        <input
                            type="text"
                            placeholder="123 456 789"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                        />
                    </label>
                    <label className="password-wrapper">
                        <span style={{color: "#95a5a9", marginBottom: "3px"}}>Hasło</span>
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
                <h1 style={{fontSize: "14px", marginBottom: "8px",color: "#95a5a9"}}>Brak konta ?</h1>
                <Link to="/register" className="register-link">Zarejestruj się tutaj</Link>
            </div>
        </div>
    )
}
export default Login;