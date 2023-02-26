import './AddSecret.css'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { IExec } from 'iexec'

export default function AddSecret() {
  const iexec = useSelector((state: any) => state.account.iExec) as IExec
  const [mySecretKey, setMySecretKey] = useState<string>('')
  const [mySecretValue, setMySecretValue] = useState<string>('') // eslint-disable-next-line
  const [mySecretDescription, setMySecretDescription] = useState<string>('') 

  const handleSubmit = async () => {
    const sms = iexec.secrets
    const { isPushed } = await sms.pushRequesterSecret(
      mySecretKey,
      mySecretValue,
    )
    console.log(`secret ${mySecretKey} set:`, isPushed)
  }

  return (
    <div className="add-secret">
      <Row>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>The Secret Key</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter Secret Key"
                  value={mySecretKey}
                  onChange={(e) => setMySecretKey(e.target.value)}
                />
              </Col>
              <Col md="auto">
                <Button onClick={() => setMySecretKey(uuid())}>
                  Generate Random Key
                </Button>
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>The description of your secret</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              onChange={(e) => setMySecretDescription(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Your secret</Form.Label>
            <Form.Control
              type="password"
              placeholder="Secret"
              onChange={(e) => setMySecretValue(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Col>
          <br />
          <Button onClick={handleSubmit}>Submit</Button>
        </Col>
      </Row>
    </div>
  )
}
