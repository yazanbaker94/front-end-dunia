import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal} from 'react-bootstrap';
export class BookFormModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookData:[]
        }
    };




    showModal = () => {
        this.setState({
            showModal: true
        })};


        handleclose = () => {
            this.setState(
                { showModal: false }
            )
        };

    render() {
        return (
            <div>
            
                <Button type="submit" onClick={this.showModal}>Add Book </Button>  

                {this.state.showModal && (

<Modal show={this.state.showModal} onHide={this.handleclose}>
    <Modal.Header closeButton>
        <Modal.Title>New BOOK </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={this.props.getAdd}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Book name</Form.Label>
                <Form.Control type="text" name='name'onChange={this.props.addbookname} />
           
                <Form.Label >add book descreption</Form.Label>
                <Form.Control type="text" name='des' onChange={this.props.addbookdes}/>
                <Form.Label>add book status</Form.Label>
                <Form.Control type="text"  name='img'onChange={this.props.addstatus} />
      <Button type='submit'>ADD MY BOOK</Button>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
       
<Button variant="primary" onClick={this.handleclose}>
close
</Button> 
    </Modal.Footer>
</Modal>
)}


            </div>
        )
    }};


export default BookFormModal
