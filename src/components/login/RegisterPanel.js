import React from "react";
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoginPanel.css';

function RegisterPanel() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] =useState('');
    const [surname, setSurname] =useState('');
    const [email, setEmail] =useState('');

    const [country, setCountry] =useState('');
    const [province, setProvince] =useState('');
    const [town, setTown] =useState('');
    const [postalCode, setPostalCode] =useState('');
    const [street, setStreet] =useState('');
    const [addressNumber, setAddressNumber] =useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    async function register() {
        if (phoneNumber.length === 9) {
            if (password.length >= 5) {
                if(email.length >= 5 && email.includes('@')) {
                    const result = await fetch(
                        'https://paczkomatdatabaseapi.azurewebsites.net/api/paczkomat/create/user',
                        {
                            method: 'POST',
                            body: JSON.stringify({phoneNumber, name, surname, password, email,
                                                        country, province, town, postalCode, street, addressNumber}),
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
                    alert('Email musi zawierać co najmniej 5 znaków, musi ponadto zawierać znak @');
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
        <div className="register-wrapper">
            <div className="background-wrapper">
                <h1 style={{fontSize: "24px",color: "rgba(0,0,0,0.7)",fontWeight: "400", marginBottom: "8px" }}>Rejestracja</h1>
                <form onSubmit={handleSubmit}>
                    <div className="register-layout-wrapper">
                        <div className="required-items-wrapper">
                            <label className="required-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Imie</span>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Jan"
                                    onChange={(e) => setName(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                    required
                                />
                            </label>
                            <label className="required-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Nazwisko</span>
                                <input
                                    type="text"
                                    value={surname}
                                    placeholder="Kowalski"
                                    onChange={(e) => setSurname(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                    required
                                />
                            </label>
                            <label className="required-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Email</span>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="JanKowalski@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                    required
                                />
                            </label>
                            <label className="required-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Numer telefonu</span>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    placeholder="123 456 789"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                    required
                                />
                            </label>
                            <label className="password-wrapper">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Hasło</span>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                    required
                                />
                            </label>
                            <h1 style={{fontSize: "12px", marginTop: "45px",color: "rgba(0,0,0,0.6)", fontFamily: "Montserrat", fontWeight: "400"}}>
                                Pola oznaczone * są wymagane</h1>

                        </div>
                        <div className="adress-info">
                            <label className="adress-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Kraj</span>
                                <input
                                    type="text"
                                    value={country}
                                    placeholder="Polska"
                                    onChange={(e) => setCountry(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                />
                            </label>
                            <label className="adress-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Województwo</span>
                                <input
                                    type="text"
                                    value={province}
                                    placeholder="Podkarpackie"
                                    onChange={(e) => setProvince(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                />
                            </label>
                            <label className="adress-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Miasto</span>
                                <input
                                    type="text"
                                    value={town}
                                    placeholder="Rzeszów"
                                    onChange={(e) => setTown(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                />
                            </label>
                            <label className="adress-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Kod pocztowy</span>
                                <input
                                    type="text"
                                    value={postalCode}
                                    placeholder="35-082"
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                />
                            </label>
                            <label className="adress-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Ulica</span>
                                <input
                                    type="text"
                                    value={street}
                                    placeholder="Grzybek"
                                    onChange={(e) => setStreet(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                />
                            </label>
                            <label className="adress-items">
                                <span style={{color: "rgba(0,0,0,0.6)", marginBottom: "3px"}}>Numer</span>
                                <input
                                    type="text"
                                    value={addressNumber}
                                    placeholder="2"
                                    onChange={(e) => setAddressNumber(e.target.value)}
                                    style={{borderRadius: "3px", border: "1px solid white", height: "30px", width:'200px'}}
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            className="register-button-wrapper"
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