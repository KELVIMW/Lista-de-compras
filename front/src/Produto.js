import React, { useState, useEffect } from "react"
import { Col, FormGroup, Row, Form, Label, Input, Button, Alert } from "reactstrap"
import api from './api'

export default function Produto(props) {
    const [nome, setNome] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [produtos, setProdutos] = useState([])
    const [erro, setErro] = useState('')
    useEffect(() => load(), []);

    console.log('props', props.login)

    const load = () => {
        api.post('/selectproduto')
            .then(response => {
                //if (!response.data.erro)
                    //setSupermercados(response.data.result)
                    console.log("sucesso")
                    console.log(response)
            })
            .catch(e => console.log(e.message))
    }

    const insert = () => {
        setErro('')
        setSucesso('')
        if (nome.trim() === '')
            setErro('Forneça o nome do produto.')
        else
            api.post('/insertProduto', { nome })
                .then(response => {
                    console.log(response.data)
                    if (response.data.erro)
                        setErro(response.data.erro)
                    else {
                        setSucesso('Produto registrado com sucesso.')
                        //clear()
                        //load()
                    }
                })
                .catch(e => console.log(e.message))
    }

    const clear = () => {
        setNome('')
        

    }

    return (
        <>
            <Form>
                <Row>
                    <Col sm='12' className='mb-2'>
                        <h6>Cadastro de produto</h6>
                    </Col>
                    {erro !== '' &&
                        <Col sm='12'>
                            <Alert color="danger">{erro}</Alert>
                        </Col>
                    }
                    {sucesso !== '' &&
                        <Col sm='12'>
                            <Alert color="success">{sucesso}</Alert>
                        </Col>
                    }
                    <Col lg='4' md='6' sm='12'>
                        <FormGroup>
                            <Label for='nome'>Nome</Label>
                            <Input bssize="sm" type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} />
                        </FormGroup>
                    </Col>
                    

                    <Col sm='12'>
                        <Button bssize="sm" onClick={insert}>Cadastrar</Button>
                    </Col>
                </Row>
            </Form>
            {produtos.length > 0 &&
                <Row className="justify-content-center mt-4">
                    <Col sm='12' className='mb-2'>
                        <h6>Lista de produtos</h6>
                    </Col>
                    <Col sm='12' className="border overflow-auto" style={{ maxHeight: 200 }}>
                        {produtos.map(item => <div key={item.idproduto} className='pt-2 pb-1'>{item.nome}</div>)}
                    </Col>
                </Row>}
        </>
    )
}