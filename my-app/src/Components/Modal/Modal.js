import { React, memo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

    const Modals = (props) => {
    const { handleShow, handleClose, show ,className,bodyMassages} = props
    return (
        <>
            <Modal show={show} onHide={handleShow}>
                <Modal.Header >
                    <Modal.Title className={className} ></Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center" >{bodyMassages}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default memo(Modals);