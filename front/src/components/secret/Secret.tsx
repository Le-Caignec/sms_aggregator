import './Secret.css'
import { Card } from 'react-bootstrap'
import { useState } from 'react'
import {ModalSecret} from '../../components'

export default function Secret() {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);

  return (
    <div className='secret'>
    <Card onClick={()=>setShow(true)} id="secret">
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    <ModalSecret show={show} handleClose={handleClose} />
    </div>
  )
}
