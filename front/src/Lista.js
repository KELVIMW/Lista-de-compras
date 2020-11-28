import React, { useState, useEffect } from "react"
import { Col, Row, Input, Button } from "reactstrap"
import api from './api'

export default function Lista(props) {
    
    const [listaCompras, setLista] = useState([])
    const [listaProdutos, setProdutos] = useState([])
    
    const [product, setProduct] = useState([])
    const [val, setVal] = useState([])

    useEffect(() => load(), []);

    const pushList = (lista, item, idItem) => {
        if(lista == 'Produto'){
            const aux = product
            aux[idItem] = item
            setProduct(aux)
        }
        if(lista == 'Valor'){
            const aux = val
            aux[idItem] = item
            setVal(aux)
        }
    }

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
        let nome = product[idlista]
        console.log(nome)
        api.post('/selectProduto', {nome})
            .then(response => {
                if (!response.data.erro)
                    if (response.data.result.length == 0 ) {
                        console.log("erro melhorar essa msg dps")
                    }  else{

                        let idproduto = response.data.result[0].idproduto
                        let valor = val[idlista]
                        api.post('/insertprodutoporlista', {idlista, idproduto, valor})
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

    const showLista = ( idlista ) => { 
        setProdutos([])
        api.post('/selectprodutoporlista', {idlista})
            .then(response => {
                if (!response.data.erro)
                
                    console.log(response.data.result)
                    setProdutos(response.data.result)
                })
            .catch(e => console.log(e.message))
    }

    const removeLista = ( idlista ) => { 
        setProdutos([])
        let idusuario =  props.login.id
        api.post('/deletelista', {idlista})
            .then(response => {
                if (!response.data.erro)
                
                
                api.post('/selectlista', {idusuario})
                .then(response => {
                    setLista([])
                    if (!response.data.erro)
                    
                        console.log(response.data.result)
                        setLista(response.data.result)
                    })
                .catch(e => console.log(e.message))
                    
                })
            .catch(e => console.log(e.message))
    }


    const removeProduto = ( idlista, idproduto ) => { 
        
        api.post('/deleteprodutoporlista', {idlista, idproduto})
        .then(response => {
            if (!response.data.erro)
                showLista(idlista)
            })
        .catch(e => console.log(e.message))
        console.log(idproduto)
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
                                <Col sm='1'> <span class="mr-5">Id Lista: {item.idlista}</span> </Col>
                                <Col sm='2'> <span class="mr-5">Id Mercado: {item.idsupermercado}</span> </Col>
                                <Col sm='2'> <span class="mr-5">Horário: {item.datahorario}</span></Col>
                                <Col sm='2'> 
                                    <Input 
                                        placeholder="Produto" 
                                        value={product[item.idlista]} onChange={e => pushList('Produto', e.target.value, item.idlista)}
                                    /> 
                                </Col>
                                <Col sm='2'> 
                                    <Input 
                                        placeholder="Valor" 
                                        value={val[item.idlista]} onChange={e => pushList('Valor', e.target.value, item.idlista)}
                                    /> 
                                </Col>
                                <Col sm='3'> 
                                    <Button onClick={() => addProduct(item.idlista)} class="mr-5"> Add </Button> 
                                    <Button onClick={() => showLista(item.idlista)}> Visualizar </Button> 
                                    <Button onClick={() => removeLista(item.idlista)}> Excluir </Button> 
                                </Col>
                            </Row>
                        </div>)}
                    </Col>
                </Row>}


                {listaProdutos.length > 0 &&
                <Row className="justify-content-center mt-4">
                    <Col sm='12' className='mb-2'>
                <h6>Produtos da Lista com o ID {listaProdutos[0].listaid}</h6>
                    </Col>
                    <Col sm='12' className="border overflow-auto" style={{ maxHeight: 200 }}>
                        {listaProdutos.map(item =>  <div key={item.idlista} className='pt-2 pb-1'>
                            <Row> 
                                <span class="mr-5"> Produto: {item.nome} </span> 
                                <span class="mr-5"> Valor: {item.valor != null ? item.valor : ''} </span>        
                                <Button onClick={() => removeProduto(item.idlista, item.idproduto)}> Remover </Button> 
                            </Row>
                        </div>)}
                    </Col>
                </Row>}
        </>
    )
}