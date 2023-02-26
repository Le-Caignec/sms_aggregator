import './ModalSecret.css'
import { Modal } from 'react-bootstrap'

type ModalProps = {
  show: boolean
  handleClose: () => void
}

export default function ModalSecret(props: ModalProps) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>
  )
}
