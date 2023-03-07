import './AddSecret.css'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useAppSelector } from '../app/hook'
import {
  selectAccountIexec,
  selectAccountUserAddress,
  usePushSecretMutation,
  useCheckSecretMutation,
} from '../app/accountSlice'

interface Secret {
  secretName: string
  secretDescription: string
  currentDate: string
  secretValue: string
}

interface PushSecret {
  secretName: string
  secretValue: string
}

interface CheckSecret {
  address: string
  secretName: string
}

export default function AddSecret() {
  const userAddress = useAppSelector(selectAccountUserAddress)
  const iexec = useAppSelector(selectAccountIexec)
  let currentDateTime = (new Date().getTime() / 1000).toString()
  const [mySecret, setMySecret] = useState<Secret>({
    secretName: '',
    secretDescription: '',
    currentDate: currentDateTime,
    secretValue: '',
  })

  const [pushSecret, resultPush] = usePushSecretMutation()
  const [checkSecret, resultCheck] = useCheckSecretMutation()

  const pushSecretFunction = async (data: Secret) => {
    if (
      mySecret.secretName !== '' &&
      mySecret.secretDescription !== '' &&
      mySecret.secretValue !== '' &&
      mySecret.currentDate !== '' &&
      userAddress !== ''
    ) {
      const _mypushSecret: PushSecret = {
        secretName: data.secretName,
        secretValue: data.secretValue,
      }
      const _mycheckSecret: CheckSecret = {
        address: userAddress,
        secretName: data.secretName,
      }
      await checkSecret(_mycheckSecret)
      if (!resultCheck?.data) {
        console.log("Secret doesn't already exist")
        await pushSecret(_mypushSecret)
        console.log('push result : ', resultPush.data?.isPushed)
      }
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
          <Button onClick={() => pushSecretFunction(mySecret)}>Submit</Button>
        </Col>
      </Row>
    </div>
  )
}
