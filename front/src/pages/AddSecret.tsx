import './AddSecret.css'
import { Button, Form, Row } from 'react-bootstrap'
import { IExecSecretsModule } from 'iexec'
import IExecConfig from 'iexec/IExecConfig'
import { useProvider } from 'wagmi'
import { bellecour } from '../utils/wallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

export default function AddSecret() {
  const connector = new MetaMaskConnector({
    chains: [bellecour],
  })

  const handleSubmit = async () => {
    let prodiver = await connector.getProvider()!
    const config = new IExecConfig({ ethProvider: prodiver! })
    const sms = IExecSecretsModule.fromConfig(config)
    const { isPushed } = await sms.pushRequesterSecret(
      'my-password',
      'passw0rd',
    )
    console.log('pushed secret "my-password":', isPushed)
  }

  return (
    <div className="add-secret">
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>The description of your secret</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Your secret</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
      </Row>
    </div>
  )
}
