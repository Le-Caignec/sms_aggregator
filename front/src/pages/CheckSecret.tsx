import './CheckSecret.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Secret } from '../components'
import { useLazyGetSecretsQuery } from '../app/accountSlice'
import { useEffect } from 'react'

export default function CheckSecret() {
  let walletAddress = '0x11ec6e62cdeb571f3b8591b8d1c50d7a5e4d626f'
  const [getSecrets, { data, isLoading, isSuccess, error }] = useLazyGetSecretsQuery()

  useEffect(() => {
    getSecrets({ walletAddress })
  }, [getSecrets, walletAddress])
  console.log(error)
  if (isLoading) return <p>Loading...</p>
  if (!isSuccess) return <p style={{ margin: '2%' }}>Error : {error as any}</p>

  return (
    <div className="checkSecret">
      <Container>
        <Row lg={5} md={2} sm={2} xs={1}>
          {data?.person.secrets?.length !== 0 ? (
            data?.person.secrets?.map(({ id, date, description, key }) => (
              <Col key={id}>
                <Secret
                  clef={key}
                  date={date}
                  description={description as string}
                />
              </Col>
            ))
          ) : (
            <h1 style={{ textAlign: 'center' }}>
              You have no secret registered in the SMS
            </h1>
          )}
        </Row>
      </Container>
    </div>
  )
}
