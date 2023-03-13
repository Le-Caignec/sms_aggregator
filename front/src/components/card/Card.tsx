import './Card.css'
import { useNavigate } from 'react-router-dom'

type CardProps = {
  message: string
  route: string
  title: string
}


export default function Card(props : CardProps) {
  const navigate = useNavigate()

  return (
    <div className="card" onClick={()=>navigate(`/${props.route}`)}>
      <div className="card-body">
        <h1 className="card-title">{props.title}</h1>
        <p>{props.message}</p>
      </div>
    </div>
  )
}
