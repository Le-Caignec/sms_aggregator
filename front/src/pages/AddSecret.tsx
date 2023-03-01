import './AddSecret.css'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import { IExec } from 'iexec'
import { Contract } from 'ethers'
import { useAccount } from 'wagmi'

export default function AddSecret() {
  const iexec = useSelector((state: any) => state.account.iExec) as IExec
  const contract = useSelector(
    (state: any) => state.account.contract,
  ) as Contract
  const [mySecretKey, setMySecretKey] = useState<string>('')
  const [mySecretValue, setMySecretValue] = useState<string>('') // eslint-disable-next-line
  const [mySecretDescription, setMySecretDescription] = useState<string>('')
  const { address, isConnected } = useAccount() 

  const handleSubmit = async () => {
    console.log(iexec, contract, address )
    const sms = iexec.secrets
    const isSecretSet = await sms.checkRequesterSecretExists(
      address as string,
      mySecretKey,
    )
    let isPushed = false
    if (!isSecretSet) {
      ({isPushed} = await sms.pushRequesterSecret(mySecretKey, mySecretValue))
      console.log(`secret ${mySecretKey} set:`, isPushed)
    } else {
      alert(`secret ${mySecretKey} already set`)
    }
    const date = new Date()
    const timestampInSeconds = Math.floor(date.getTime() / 1000)
    if (isPushed) {
      await contract.addSecret(
        mySecretKey,
        timestampInSeconds,
        mySecretDescription,
      )
      console.log(`secret set in smart contract:`)
    }
  }

  return (
    <div className="add-secret">
      <Row>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>The Public Key</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Enter Public Key"
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
              placeholder="Enter description"
              onChange={(e) => setMySecretDescription(e.target.value)}
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
