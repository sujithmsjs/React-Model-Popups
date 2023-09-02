import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {};
  }
};

const EditUser = ({ id, onClose, onSaveChanges }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.info('Edit User mounted...');
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id !== null) {
      loadUser();
    }
  }, []);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data) => {
    console.info('Data: ',data);
  }


  return (
    <Modal show={id !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <Spinner animation="border" />
        ) : (
          <Form>

            <Form.Group controlId="formId">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" defaultValue={user.id} readOnly />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={user.name} name="name"  />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" defaultValue={user.username} name="uname"  />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" defaultValue={user.email} name="email" />
            </Form.Group>

          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button as="input" type="submit" variant="primary" value="Save Changes" />
      </Modal.Footer>
    </Modal>
  );
};

export default EditUser;
