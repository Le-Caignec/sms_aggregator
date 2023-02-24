import './CheckSecret.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Secret } from '../components'

export default function CheckSecret() {
  const tokens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="checkSecret">
      <Container>
        <Row lg={5} md={2} sm={2} xs={1}>
          {tokens.length !== 0 ? (
            tokens.map((id) => (
              <Col key={id}>
                <Secret />
              </Col>
            ))
          ) : (
            <h1 style={{ textAlign: 'center' }}>
              You no secret registered in the SMS
            </h1>
          )}
        </Row>
      </Container>
    </div>
  )
}
