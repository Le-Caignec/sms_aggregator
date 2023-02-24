import './AddSecret.css'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { IExecSecretsModule } from 'iexec'
import IExecConfig from 'iexec/IExecConfig'
import { useProvider } from 'wagmi'
import { bellecour } from '../utils/wallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function AddSecret() {
  const [mySecretKey, setMySecretKey] = useState<string>('')
  const [mySecretValue, setMySecretValue] = useState<string>('')
  const [mySecretDescription, setMySecretDescription] = useState<string>('')

  const connector = new MetaMaskConnector({
    chains: [bellecour],
  })

  const handleSubmit = async () => {
    let prodiver = (await connector.getProvider()) as any
    const config = new IExecConfig({ ethProvider: prodiver })
    const sms = IExecSecretsModule.fromConfig(config)
    const { isPushed } = await sms.pushRequesterSecret(
      mySecretKey,
      mySecretValue,
    )
    console.log(`secret ${mySecretKey} set:`, isPushed)
  }

  const checkSecretExist = async () => {
    const config = new IExecConfig({ ethProvider: window.ethereum })
    const sms = IExecSecretsModule.fromConfig(config)
    const isSecretSet = await sms.checkRequesterSecretExists(
      '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6',
      mySecretKey,
    )
    console.log(`secret ${mySecretKey} set:`, isSecretSet)
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
              type="email"
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
