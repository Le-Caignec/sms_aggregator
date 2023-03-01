import './Secret.css'
import { Card } from 'react-bootstrap'
import { useState } from 'react'
import { ModalSecret } from '../../components'
import { timestampToDateString } from '../../utils/utils'

export type SecretProps = {
  clef: string
  date: number
  description: string
}



export default function Secret(props: SecretProps) {
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false)

  return (
    <div className="secret">
      <Card onClick={() => setShow(true)} id="secret">
        <Card.Body>
          <Card.Title>{props.clef}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {timestampToDateString(props.date)}
          </Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
      </Card>
      <ModalSecret show={show} handleClose={handleClose} secret={props} />
    </div>
  )
}
