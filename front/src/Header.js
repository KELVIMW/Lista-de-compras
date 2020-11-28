import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom'

import api from './api';

export default function Header(props) {

    const logout = () => {
        api.get('/logout')
            .then(response => {
                console.log(response.data)
                props.setLogin(response.data)
            })
            .catch(e => console.log(e.message))
    }

    return (
        <Navbar>
            <NavbarBrand><Link to='/lista' className='mr-4'>Lista de Compra</Link></NavbarBrand>
            <div>
                {props.login.nome === '' &&
                    <a href='http://localhost:3101/login'>Login</a>
                }
                {props.login.nome !== '' && (
                    <>
                        <span>{props.login.nome}</span>
                        <Button onClick={() => logout()} className="ml-2" color='link'>Sair</Button>
                    </>
                )}
            </div>
        </Navbar>
    )
}



