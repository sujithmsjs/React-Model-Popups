import {Button, Spinner, Modal} from 'react-bootstrap'

const LoadingModel = (props) => {
  const text = props.text;
  delete props.text;
  return (
    <Modal
    show={true}
    size="lg"
    centered
    backdrop="static" // Prevents closing when clicking on the overlay
    keyboard={false} // Prevents closing with the Esc key
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {text}
      </Modal.Title>
    </Modal.Header>
    {/* Add modal content here */}
  </Modal>
  );
}

export default LoadingModel;