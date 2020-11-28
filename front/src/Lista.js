import React, { useState, useEffect } from "react"
import { Col, Row, Input, Button } from "reactstrap"
import api from './api'

export default function Lista(props) {
    
    const [listaCompras, setLista] = useState([])
    const [product, setProduct] = useState('')

    useEffect(() => load(), []);


    const load = () => {
        console.log( props.login.id )
        let idusuario =  props.login.id
        api.post('/selectlista', {idusuario})
            .then(response => {
                if (!response.data.erro)
                
                    console.log(response.data.result)
                    setLista(response.data.result)
                })
            .catch(e => console.log(e.message))
    }

    const addProduct = ( idlista ) => {
        let nome = product

        api.post('/selectProduto', {nome})
            .then(response => {
                if (!response.data.erro)
                    if (response.data.result.length == 0 ) {
                        console.log("erro melhorar essa msg dps")
                    }  else{

                        let idproduto = response.data.result[0].idproduto

                        api.post('/insertprodutoporlista', {idlista, idproduto})
                            .then(response => {
                                if (!response.data.erro)
                                console.log( 'teste')
                                    console.log( response )
                                    console.log( response.data )
                                })
                            .catch(e => console.log(e.message))
                    }
                    
                })
            .catch(e => console.log(e.message))


    }

    return (
        <>
            {listaCompras.length > 0 &&
                <Row className="justify-content-center mt-4">
                    <Col sm='12' className='mb-2'>
                        <h6>Lista de compras</h6>
                    </Col>
                    <Col sm='12' className="border overflow-auto" style={{ maxHeight: 200 }}>
                        {listaCompras.map(item =>  <div key={item.idlista} className='pt-2 pb-1'>
                            <Row>
                                <Col sm='2'> <span class="mr-5">Id Lista: {item.idlista}</span> </Col>
                                <Col sm='2'> <span class="mr-5">Id Mercado: {item.idsupermercado}</span> </Col>
                                <Col sm='2'> <span class="mr-5">Horário: {item.datahorario}</span></Col>
                                <Col sm='2'> 
                                    <Input 
                                        placeholder="Produto" 
                                        value={product} onChange={e => setProduct(e.target.value)}
                                    /> 
                                </Col>
                                <Col sm='2'> <Button onClick={() => addProduct(item.idlista)}> Add </Button> </Col>
                            </Row>
                        </div>)}
                    </Col>
                </Row>}
        </>
    )
}