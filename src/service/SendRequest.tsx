import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SendRequest(props:any){
    const [show, setShow] = useState(true);
    const history = useNavigate()

    return(
        <Modal show={show} onHide={()=>history('/')}>
            <Modal.Header>
            <Modal.Title>Se envio la peticion correctamente</Modal.Title>
            </Modal.Header>
            <Modal.Body>El Isp esta verificando su solicitud al servicio</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>history('/')}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}