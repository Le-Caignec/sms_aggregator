import './ModalSecret.css'
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { SecretProps } from '../secret/Secret'
import { Col, Row } from 'react-bootstrap'
import { timestampToDateString } from '../../utils/utils'
import { MdOutlineContentCopy } from 'react-icons/md'

type ModalProps = {
  show: boolean
  handleClose: () => void
  secret: SecretProps
}

export default function ModalSecret(props: ModalProps) {
  const copyToClickBoard = () => {
    navigator.clipboard.writeText(props.secret.clef)
  }
  const renderTooltip = () => (
    <Tooltip id="button-tooltip">Simple tooltip</Tooltip>
  )
  return (
    <div className="modalSecret">
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header>
          <Row>
            <Col>
              <h2>{props.secret.clef}</h2>
            </Col>
            <Col
              md="auto"
              style={{
                margin: 'auto',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => copyToClickBoard()}
            >
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 4000000 }}
                overlay={
                  <Tooltip style={{ position: 'absolute' }}>
                    Tooltip test
                  </Tooltip>
                }
              >
                <MdOutlineContentCopy size={20} />
              </OverlayTrigger>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="auto">
              <p>Owner : </p>
            </Col>
            <Col>
              <p style={{ color: '#6c757d' }}>
                {'0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6'}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md="auto">
              <p>Date : </p>
            </Col>
            <Col>
              <p style={{ color: '#6c757d' }}>
                {timestampToDateString(props.secret.date)}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md="auto">
              <p>Description : </p>
            </Col>
            <Col>
              <p style={{ color: '#6c757d' }}>{props.secret.description}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}
