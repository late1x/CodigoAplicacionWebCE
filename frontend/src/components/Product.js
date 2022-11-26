import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { HyperFormula } from 'hyperformula';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'handsontable/dist/handsontable.full.min.css';

registerAllModules();

const Product = () => {
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


    //Cambiar valores
    const hotRef = useRef(null);
    const [namedExpressionValue, setNamedExpressionValue] = useState('');

    const inputChangeCallback = (event) => {
        setNamedExpressionValue(event.target.value);
    };

    let buttonClickCallback;

    useEffect(() => {
        const hotC = hotRef.current.hotInstance;

        buttonClickCallback = (event) => {
            hotC.setDataAtCell(1, 5, namedExpressionValue);
            hotC.setDataAtCell(2, 5, namedExpressionValue);
            hotC.setDataAtCell(3, 5, namedExpressionValue);
            hotC.setDataAtCell(1, 5, namedExpressionValue);
            hotC.setDataAtCell(6, 5, namedExpressionValue);
            hotC.setDataAtCell(7, 5, namedExpressionValue);
            hotC.setDataAtCell(8, 5, namedExpressionValue);
            hotC.setDataAtCell(9, 5, namedExpressionValue);
            hotC.setDataAtCell(10, 5, namedExpressionValue);
            hotC.setDataAtCell(11, 5, namedExpressionValue);
            hotC.setDataAtCell(12, 5, namedExpressionValue);
            hotC.setDataAtCell(15, 5, namedExpressionValue);
            hotC.setDataAtCell(18, 5, namedExpressionValue);
            hotC.setDataAtCell(19, 5, namedExpressionValue);
            hotC.setDataAtCell(22, 5, namedExpressionValue);
            hotC.setDataAtCell(23, 5, namedExpressionValue);
            hotC.setDataAtCell(26, 5, namedExpressionValue);
            hotC.setDataAtCell(29, 5, namedExpressionValue);

            hotRef.render();
        };
    });

    return (
        <Container>
            <h1 className="title">Calculadora de costos</h1>
            
            <Row>
                <Col>
                    <HotTable
                        ref={hotRef}
                        data={[
                            {
                                "Concepto": "MPD (materia prima directa)",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "Hilos de algodón",
                                "Material utilizado": "42",
                                "Unidad": "piezas",
                                " Precio ": "14.00 ",
                                " Total de costo ": "=B2*D2",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E2/F2"
                            },
                            {
                                "Concepto": "Hilos metálicos",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "70.00 ",
                                " Total de costo ": "=B3*D3",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E3/F3"
                            },
                            {
                                "Concepto": "Tela",
                                "Material utilizado": "0.50",
                                "Unidad": "metros",
                                " Precio ": "40.00 ",
                                " Total de costo ": "=B4*D4",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E4/F4"
                            },
                            {
                                "Concepto": "TOTAL MP DIRECTA",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E2:E4)",
                                "Unidades producidas": "MPD",
                                "Costo unitario": "=SUM(G2:G4)"
                            },
                            {
                                "Concepto": "MPI (materia prima indirecta)",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "Agujas",
                                "Material utilizado": "2",
                                "Unidad": "piezas",
                                " Precio ": "4.00 ",
                                " Total de costo ": "=B7*D7",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E7/F7"
                            },
                            {
                                "Concepto": "Lápiz",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "3.00 ",
                                " Total de costo ": "=B8*D8",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E8/F8"
                            },
                            {
                                "Concepto": "Zacapuntas",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "5.00 ",
                                " Total de costo ": "=B9*D9",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E9/F9"
                            },
                            {
                                "Concepto": "Tijeras",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "30.00 ",
                                " Total de costo ": "=B10*D10",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E10/F10"
                            },
                            {
                                "Concepto": "Cinta de papel",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "30.00 ",
                                " Total de costo ": "=B11*D11",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E11/F11"
                            },
                            {
                                "Concepto": "Jabón en barra blanco",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "15.00 ",
                                " Total de costo ": "=B12*D12",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E12/F12"
                            },
                            {
                                "Concepto": "Gráfico",
                                "Material utilizado": "1",
                                "Unidad": "piezas",
                                " Precio ": "350.00 ",
                                " Total de costo ": "=B13*D13",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E13/F13"
                            },
                            {
                                "Concepto": "TOTAL MPI INDIRECTA ",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E7:E13)",
                                "Unidades producidas": "MPD",
                                "Costo unitario": "=SUM(G7:G13)"
                            },
                            {
                                "Concepto": "MO (mano de obra)",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "MO (mano de obra directa)",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "3700",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E16/F16"
                            },
                            {
                                "Concepto": "TOTAL MANO DE OBRA",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E16:E16)",
                                "Unidades producidas": "MO",
                                "Costo unitario": "=SUM(G16:G16)"
                            },
                            {
                                "Concepto": "GIF (gastos indirectos de fabricación)",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "Luz",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "1.37",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E19/F19"
                            },
                            {
                                "Concepto": "Agua",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "0.70",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E20/F20"
                            },
                            {
                                "Concepto": "TOTAL GIF ",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E19:E20)",
                                "Unidades producidas": "GIF",
                                "Costo unitario": "=SUM(G19:G20)"
                            },
                            {
                                "Concepto": "Gastos de distribución",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "Gasolina",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "16",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E23/F23"
                            },
                            {
                                "Concepto": "Sueldo de chofer",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "150",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E24/F24"
                            },
                            {
                                "Concepto": "TOTAL DISTRIBUCIÓN",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E23:E24)",
                                "Unidades producidas": "TD",
                                "Costo unitario": "=SUM(G23:G24)"
                            },
                            {
                                "Concepto": "Gastos administrativos, venta, generales",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "Papelería",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "100",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E27/F27"
                            },
                            {
                                "Concepto": "TOTAL GASTOS",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E27:E27)",
                                "Unidades producidas": "TG",
                                "Costo unitario": "=SUM(G27:G27)"
                            },
                            {
                                "Concepto": "Gastos financieros",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "",
                                "Costo unitario": ""
                            },
                            {
                                "Concepto": "Comisiones e intereses",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "20",
                                "Unidades producidas": "1",
                                "Costo unitario": "=E30/F30"
                            },
                            {
                                "Concepto": "TOTAL FINANCIEROS",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E30:E30)",
                                "Unidades producidas": "TF",
                                "Costo unitario": "=SUM(G30:G30)"
                            },
                            {
                                "Concepto": "COSTO TOTAL",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "=SUM(E5,E14,E17,E21,E25,E28,E31)",
                                "Unidades producidas": "COSTO TOTAL",
                                "Costo unitario": "=SUM(G5,G14,G17,G21,G25,G28,G31)"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "Rentabilidad",
                                "Costo unitario": "20%"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "Utilidad",
                                "Costo unitario": "=G32*G33"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "PRECIO DE VENTA SIN IVA",
                                "Costo unitario": "=SUM(G32,G34)"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "IVA%",
                                "Costo unitario": "16%"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "IVA EN $",
                                "Costo unitario": "=G35*G36"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": " PRECIO DE VENTA + IVA ",
                                "Costo unitario": "=G35+G37"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "COSTO PRIMO ",
                                "Costo unitario": "=SUM(G5,G14,G17)"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "COSTO DE TRANSFORMACIÓN ",
                                "Costo unitario": "=SUM(G17,G21)"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "COSTO DE PRODUCCIÓN ",
                                "Costo unitario": "=SUM(G39,G21)"
                            },
                            {
                                "Concepto": "",
                                "Material utilizado": "",
                                "Unidad": "",
                                " Precio ": "",
                                " Total de costo ": "",
                                "Unidades producidas": "GASTO DE OPERACIÓN ",
                                "Costo unitario": "=SUM(G25,G27,G31)"
                            }
                        ]}
                        width="auto"
                        rowHeaders={true}
                        colHeaders={['Concepto', 'Material utilizado', 'Unidad', 'Precio', 'Total de costo', 'Unidades producidas', 'Costo unitario']}
                        outsideClickDeselects={false}
                        readOnly={true}
                        formulas={{
                            engine: HyperFormula,
                        }}
                        licenseKey="non-commercial-and-evaluation"
                    />
                </Col>
                <Col>
                    <div className="mb-2">
                        <h2>Calcular costo para: </h2>
                        <input
                            id="named-expressions-input"
                            type="text"
                            placeholder="unidades"
                            defaultValue={namedExpressionValue}
                            onChange={(...args) => inputChangeCallback(...args)} />
                    </div>
                    <div className="mb-2">
                        <Button variant="success" id="set-data-action" onClick={(...args) => buttonClickCallback(...args)}>Cambiar</Button>{' '}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Product