import './CheckSecret.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Secret } from '../components'
import { useQuery, gql } from '@apollo/client'

export default function CheckSecret() {
  let walletAddress = '0x11ec6e62cdeb571f3b8591b8d1c50d7a5e4d626f'

  const GET_SECRETS = gql`
    query MySecret($walletAddress: String!) {
      person(id: $walletAddress) {
        secrets(orderDirection: asc, orderBy: date) {
          description
          id
          key
          date
        }
      }
    }
  `

  let { loading, error, data } = useQuery(GET_SECRETS, {
    variables: { walletAddress },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ margin: '2%' }}>Error : {error.message}.</p>
  let secrets = [...data?.person?.secrets]

  return (
    <div className="checkSecret">
      <Container>
        <Row lg={5} md={2} sm={2} xs={1}>
          {secrets.length !== 0 ? (
            secrets.map(({ id, key, date, description }) => (
              <Col key={id}>
                <Secret clef={key} date={date} description={description}/>
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
