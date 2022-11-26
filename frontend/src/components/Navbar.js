import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import logo from "../assets/logo.png"
import 'bulma/css/bulma.css';
import Button from 'react-bootstrap/Button';



const NavbarD = () => {
    const [isActive, setisActive] = React.useState(false);
    const history = useHistory();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a class="navbar-item">
                    <img src={logo} width="112" height="28" />
                </a>
                <a
                    onClick={() => {
                        setisActive(!isActive);
                    }}
                    role="button"
                    className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div
                id="navbarBasicExample"
                className={`navbar-menu ${isActive ? "is-active" : ""}`}
            >
                <div class="navbar-start">
                    <a href='/home' class="navbar-item">
                        Home
                    </a>

                    <a href='/dashboard' class="navbar-item">
                        Dashboard
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Mas
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item" href='/about'>
                                Acerca de nosotros
                            </a>
                            <a class="navbar-item">
                                Equipo
                            </a>
                            <a class="navbar-item" href='/contact'>
                                Contacto
                            </a>
                            <hr class="navbar-divider" />
                            <a class="navbar-item">
                                Reportar un bug
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <Button onClick={Logout} variant="danger">Cerrar sesion</Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarD