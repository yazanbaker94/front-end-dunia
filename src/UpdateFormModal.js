import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './UpdateFormModal.css';
import { Form, Button, Modal } from 'react-bootstrap';

export class UpdateFormModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            showModal:false
        }
    };

    showModal = () => {
        this.setState({
            showModal: true
        })
    
    };
    handleclose = () => {
        this.setState(
            { showModal: false }
        )
    };



    render() {
        return (
            <div>
            <Button type="submit" onClick={this.showModal}>Update</Button>
            {this.state.showModal && (

                <Modal show={this.state.showModal} onHide={this.handleclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.Updatebook}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Update Book name</Form.Label>
                                <Form.Control type="text"  value={this.props.name} onChange={this.props.addbookname} />
                           
                                <Form.Label >update book descreption</Form.Label>
                                <Form.Control type="text" value={this.props.description}  onChange={this.props.addbookdes}/>
                                <Form.Label>update book scr</Form.Label>
                                <Form.Control type="text" value={this.props.status} onChange={this.props.addstatus} />
                      <Button type='submit'>update MY BOOK</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                       
                <Button variant="primary" onClick={this.handleclose}>
                close
                </Button> 
                    </Modal.Footer>
                </Modal>
            )
            }
        </div>

    )
}
}

export default UpdateFormModal
