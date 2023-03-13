import './AddSecret.css'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Mint } from '../components'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export interface Secret {
  secretName: string
  secretDescription: string
  currentDate: number
  secretValue: string
}

export default function AddSecret() {
  const naviguate = useNavigate()
  let currentDateTime = new Date().getTime()
  const [mySecret, setMySecret] = useState<Secret>({
    secretName: '',
    secretDescription: '',
    currentDate: currentDateTime,
    secretValue: '',
  })

  return (
    <Container className="add-secret">
      <FaArrowLeft
        id="comeBackArrow"
        size={20}
        onClick={() => naviguate('/appli')}
      />
      <Row id="mainRow">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>The Public Key</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter Public Key"
                  onChange={(e) =>
                    setMySecret((prev) => ({
                      ...prev,
                      secretName: e.target.value,
                    }))
                  }
                  value={mySecret?.secretName}
                />
              </Col>
              <Col md="auto">
                <Button
                  onClick={() =>
                    setMySecret((prev) => ({ ...prev, secretName: uuid() }))
                  }
                >
                  Generate Random Key
                </Button>
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>The description of your secret</Form.Label>
            <Form.Control
              placeholder="Enter description"
              onChange={(e) =>
                setMySecret((prev) => ({
                  ...prev,
                  secretDescription: e.target.value,
                }))
              }
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Your secret</Form.Label>
            <Form.Control
              type="password"
              placeholder="Secret"
              onChange={(e) =>
                setMySecret((prev) => ({
                  ...prev,
                  secretValue: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Form>
        <Col>
          <br />
          <Mint secret={mySecret} />
        </Col>
      </Row>
    </Container>
  )
}
