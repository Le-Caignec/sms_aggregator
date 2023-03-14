import './Mint.css'
import { Button } from 'react-bootstrap'
import { useAppSelector } from '../../app/hook'
import SMS_Aggregator from '../../utils/abiSmsAggragator.json'
import { Secret } from '../../pages/AddSecret'
import {
  selectAccountUserAddress,
  usePushSecretMutation,
} from '../../app/accountSlice'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useEffect, useState } from 'react'

//global variables
const contractAddress_SMS_Aggregator = process.env
  .REACT_APP_CONTRACT_ADDRESS! as any

export default function Mint({ secret }: { secret: Secret }) {
  const userAddress = useAppSelector(selectAccountUserAddress)
  const [
    pushSecret,
    { data: pushSecret_data, isSuccess: pushSecret_data_sucess, error: msg },
  ] = usePushSecretMutation()
  const [secretReady, setSecretReady] = useState(false)

  const { config } = usePrepareContractWrite({
    address: contractAddress_SMS_Aggregator,
    abi: SMS_Aggregator.abi,
    functionName: 'addSecret',
    args: [secret.secretName, secret.currentDate, secret.secretDescription],
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pushSecretFunction = async () => {
    if (
      secret.secretName !== '' &&
      secret.secretDescription !== '' &&
      secret.secretValue !== '' &&
      secret.currentDate !== 0 &&
      userAddress !== ''
    ) {
      await pushSecret({
        secretName: secret.secretName,
        secretValue: secret.secretValue,
        address: userAddress,
      })
    } else {
      alert('All fields are required')
    }
  }

  useEffect(() => {
    if (
      secret.secretName !== '' &&
      secret.secretDescription !== '' &&
      secret.secretValue !== '' &&
      secret.currentDate !== 0
    ) {
      setSecretReady(true)
    } else {
      setSecretReady(false)
    }
  }, [secret])

  return (
    <div>
      <Button
        disabled={write && !isLoading && !secretReady}
        onClick={() => {
          pushSecretFunction()
          write?.()
        }}
      >
        {isLoading ? 'Minting...' : 'Push Secret'}
      </Button>
      {isSuccess && pushSecret_data_sucess && pushSecret_data?.isPushed ? (
        <div>
          <p>Successfully minted</p>
          <div>
            <a
              href={`https://blockscout-bellecour.iex.ec/tx/${data?.hash}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#ff8700' }}
            >
              BlockScout
            </a>
          </div>
        </div>
      ) : (
        <>
          <p>{msg as string}</p>
          <p>{error?.toString()}</p>
        </>
      )}
    </div>
  )
}
