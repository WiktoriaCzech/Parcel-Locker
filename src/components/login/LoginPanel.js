import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoginPanel.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/');
        }
    }, []);

    async function login() {
        if (email.length >= 5 && email.includes('@')) {
            if (password.length >= 5) {
                const item = { email, password };
                const result = await fetch(
                    '',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(item),
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
            alert(
                'Email musi zawierać co najmniej 5 znaków, musi ponadto zawierać znak @.'
            );
        }
    }
    return(
        <div className="login-wrapper">
            <div className="background-wrapper">
                <h1 style={{fontSize: "22px",color: "#fff",fontWeight: "400"}}>Zaloguj się :)</h1>
                <form>
                    <label className="email-wrapper">
                        <span style={{color: "#95a5a9"}}>Email</span>
                        <input
                            type="text"
                            placeholder="example.username@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                        />
                    </label>
                    <label className="password-wrapper">
                        <span style={{color: "#95a5a9"}}>Hasło</span>
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
                <h1 style={{fontSize: "14px", marginBottom: "8px",color: "#95a5a9"}}>Brak konta?</h1>
                <Link to="/register" className="register-link">Zarejestruj się tutaj</Link>
            </div>
        </div>
    )
}
export default Login;