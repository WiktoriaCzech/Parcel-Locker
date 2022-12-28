import React from "react";
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoginPanel.css';

function RegisterPanel() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] =useState('');
    const [surname, setSurname] =useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    async function register() {
        if (phoneNumber.length === 9) {
            if (password.length >= 5) {
                const result = await fetch(
                    'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/create/user',
                    {
                        method: 'POST',
                        body: JSON.stringify({phoneNumber, name, surname, password}),
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );
                // const result2 = await result.json();
                // console.log(result2);
                if(result.status === 201) {
                    alert("Pomyślnie zarejestrowano")
                    navigate('/login');
                }else {
                    if (result.status === 400) {
                        alert("Proszę sprawdzić poprawność danych!");
                    }else{
                        if( result.status === 409) {
                        alert("Użytkownik o podanym numerze telefonu już istnieje!");
                        }
                    }
                }
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
                <h1 style={{fontSize: "22px",color: "rgba(0,0,0,0.7)",fontWeight: "400", marginBottom: "8px"}}>Rejestracja</h1>
                <form onSubmit={handleSubmit}>
                    <label className="email-wrapper">
                        <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Imie*</span>
                        <input
                            type="text"
                            value={name}
                            placeholder="Jan"
                            onChange={(e) => setName(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                            required
                        />
                    </label>
                    <label className="email-wrapper">
                        <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Nazwisko*</span>
                        <input
                            type="text"
                            value={surname}
                            placeholder="Kowalski"
                            onChange={(e) => setSurname(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                            required
                        />
                    </label>
                    <label className="email-wrapper">
                        <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Numer telefonu*</span>
                        <input
                            type="text"
                            value={phoneNumber}
                            placeholder="123 456 789"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                            required
                        />
                    </label>
                    <label className="password-wrapper">
                        <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Hasło*</span>
                        <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{borderRadius: "3px", border: "1px solid white", height: "30px"}}
                            required
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
                <h1 style={{fontSize: "14px", marginBottom: "8px",color: "rgba(0,0,0,0.6)", fontFamily: "Montserrat", fontWeight: "400"}}>Posiadasz jednak konto ?</h1>
                <Link to="/login" className="register-link">Zaloguj się tutaj</Link>
            </div>
        </div>
    )
}

export default RegisterPanel