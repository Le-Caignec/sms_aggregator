import './Secret.css'
import { Card } from 'react-bootstrap'
import { useState } from 'react'
import { ModalSecret } from '../../components'

type SecretProps = {
  clef: string
  date: number
  description: string
}

export default function Secret(props: SecretProps) {
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false)

  function timestampToDateString(timestamp: number) {
    const date = new Date(timestamp * 1000) // convert to milliseconds
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // add 1 because getMonth() returns 0-indexed months
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }

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
      <ModalSecret show={show} handleClose={handleClose} />
    </div>
  )
}
