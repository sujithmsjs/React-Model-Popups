import {Button, Spinner} from 'react-bootstrap'

const LoadingButton = ({loading, variant = "success", value, loadingValue, onClick}) => {


  return (
    <Button variant={variant} size="sm" onClick={onClick} disabled={loading}>
      {
        loading && 
        <Spinner
        as="span"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      }
      {loading ?  loadingValue : value}
    </Button>
  );

}

export default LoadingButton;