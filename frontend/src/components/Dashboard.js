import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import angel from "../assets/angel.png";
import jesus from "../assets/jesus.png";
import nangel from "../assets/nangel.png";
import 'bootstrap/dist/css/bootstrap.min.css';



const Dashboard = () => {
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
        <div className="container mt-5">
            <Alert variant="success">
                <Alert.Heading>Bienvenido de nuevo</Alert.Heading>
                <p>
                    Usuario: {name}
                </p>
            </Alert>
            <h1 class="title">Productos</h1>
            <h2 class="subtitle">Seleccione para calcular costo</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Imagen</th>
                        <th>Caracteristicas</th>
                        <th>Calcular costo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Native Angel</strong></td>
                        <td>
                            <figure class="image is-3by4">
                                <img src={nangel} />
                            </figure>
                        </td>
                        <td>
                            <ol type="1">
                                <li>Dimensiones: 177 * 213 cuadros</li>
                                <li>Tela: Tela de algodón con cuadrile chico americano</li>
                                <li>Cuadricula: 10x10</li>
                            </ol>
                        </td>
                        <td>
                            <Button href="/product" variant="warning">Calcular</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Jesus Cristo a los 33</strong></td>
                        <td>
                            <figure class="image is-3by4">
                                <img src={jesus} />
                            </figure>
                        </td>
                        <td>
                            <ol type="1">
                                <li>Dimensiones: </li>
                                <li>Tela: </li>
                                <li>Cuadricula: </li>
                            </ol>
                        </td>
                        <td>
                            <Button variant="warning" >Calcular</Button>{' '}
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Angel de la guarda</strong></td>
                        <td>
                            <figure class="image is-3by4">
                                <img src={angel} />
                            </figure>
                        </td>
                        <td>
                            <ol type="1">
                                <li>Dimensiones: </li>
                                <li>Tela: </li>
                                <li>Cuadricula: </li>
                            </ol>
                        </td>
                        <td>
                            <Button variant="warning">Calcular</Button>{' '}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Dashboard