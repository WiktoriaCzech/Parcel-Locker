import React from "react";
import { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoginPanel.css';

function RegisterPanel() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/login');
        }
    }, []);

    async function register() {

        const  userData = {phoneNumber, password};
        if (phoneNumber.length === 9) {
            if (password.length >= 5) {
                let result = await fetch(
                    'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/users',
                    {
                        method: 'POST',
                        body: JSON.stringify(userData),
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );
                result = await result.json();
                localStorage.setItem('user-info', JSON.stringify(result));
                navigate('/login');
            }
            else {
                alert('Hasło musi zawierać co najmniej 5 znaków!');
            }
        }
        else {
            alert('Podaj numer telefonu');
        }
    }

    return(
        <div className="login-wrapper">
            <div className="background-wrapper">
                <h1 style={{fontSize: "22px",color: "#fff",fontWeight: "400"}}>Rejestracja</h1>
                <form>
                    <label className="email-wrapper">
                        <span style={{color: "#95a5a9", marginBottom: "3px"}}>Numer telefonu</span>
                        <input
                            type="text"
                            value={phoneNumber}
                            placeholder="ex.123 456 789"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                        />
                    </label>
                    <label className="password-wrapper">
                        <span style={{color: "#95a5a9", marginBottom: "3px"}}>Hasło</span>
                        <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                        />
                    </label>
                    <div>
                        <button
                            className="login-button-wrapper"
                            type="button"
                            onClick={register}
                        >
                            Zarejestruj
                        </button>
                    </div>
                </form>
                <h1 style={{fontSize: "14px", marginBottom: "8px",color: "#95a5a9"}}>Posiadasz jednak konto ?</h1>
                <Link to="/login" className="register-link">Zaloguj się tutaj</Link>
            </div>
        </div>
    )
}

export default RegisterPanel