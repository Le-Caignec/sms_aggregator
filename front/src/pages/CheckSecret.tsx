import './CheckSecret.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Secret } from '../components'
import { useLazyGetSecretsQuery } from '../app/accountSlice'
import { useEffect } from 'react'
import { useAppSelector } from '../app/hook'
import { selectAccountUserAddress } from '../app/accountSlice'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function CheckSecret() {
  const naviguate = useNavigate()
  let walletAddress = useAppSelector(selectAccountUserAddress)
  const [
    getSecrets,
    { data, isLoading, isSuccess, error },
  ] = useLazyGetSecretsQuery()

  useEffect(() => {
    getSecrets({ walletAddress })
  }, [getSecrets, walletAddress])
  if (isLoading) return <p>Loading...</p>
  if (!isSuccess) return <p style={{ margin: '2%' }}>Error : {error as any}</p>

  return (
    <Container className="checkSecret">
      <FaArrowLeft
        id="comeBackArrow"
        size={20}
        onClick={() => naviguate('/appli')}
      />
      <Container>
        <Row md={3} style={{ maxWidth: '80%', margin: 'auto' }}>
          {data?.person ? (
            data?.person?.secrets?.map(({ id, date, description, key }) => (
              <Col key={id}>
                <Secret
                  clef={key}
                  date={parseInt(date)}
                  description={description as string}
                />
              </Col>
            ))
          ) : (
            <p style={{ margin: 'auto' }}>
              You have no secret registered in the SMS
            </p>
          )}
        </Row>
      </Container>
    </Container>
  )
}
