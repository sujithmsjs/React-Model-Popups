import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";



const EditUser2 = ({ id, onClose, onSaveChanges }) => {

 const { register, handleSubmit} = useForm({
    defaultValues : {
        id: 101,
        name : 'Sujith Manchala',
        username: 'sujithms',
        email : 'suji@gmail.com'
    }
 });


  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data) => {
    console.info('Data: ',data);
    onSaveChanges(data);
  }


  return (
    <Modal show={id !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Modal.Body>
          

            <Form.Group controlId="formId">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" {...register('id')} />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register('name')} />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" {...register('username')} />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" {...register('email')} />
            </Form.Group>

          
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button as="input" type="submit" variant="primary" value="Save Changes" />
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditUser2;
