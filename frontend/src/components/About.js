import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const About = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    return (
        <div>
            <section class="hero is-warning mb-4">
                <div class="hero-body">
                    <div class="container">
                        <p class="title">
                            Acerca de nosotros
                        </p>
                        <p class="subtitle">
                            Informacion de nuestra empresa
                        </p>
                    </div>
                </div>
            </section>
            <div class="container mb-4">

                <div class="content container is-small">
                    <p class="title is-4">
                        Antecedentes de la empresa
                    </p>
                    <p>
                        La señora Daniela Valdovinos Castillo comenzó con la venta de cuadros de punto de cruz cuando estaba cursando el segundo grado de secundaria, actualmente, continua con la venta de estos cuadros realizados a mano, con pedido o algunas veces hace un diseño seleccionado por ella y luego promociona su venta en redes sociales.
                    </p>
                </div>

            </div>
        </div>



    )
}

export default About