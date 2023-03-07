import './Home.css'
import { Card } from '../components'
import { Row, Col } from 'react-bootstrap'

export default function Home() {
  return (
    <div>
      <Row>
        <Col>
          <Card
            message="Add a new secret in the SMS"
            route="appli/add_secret"
            title="Add Secret"
          />
        </Col>
        <Col>
          <Card
            message="Check all your secret key safely"
            route="appli/check_secret"
            title="Check Secret"
          />
        </Col>
      </Row>
    </div>
  )
}
