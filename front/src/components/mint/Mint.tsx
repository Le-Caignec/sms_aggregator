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
import { QueryStatus } from '@reduxjs/toolkit/dist/query'

//global variables
const contractAddress_SMS_Aggregator = process.env
  .REACT_APP_CONTRACT_ADDRESS! as any

export default function Mint({ secret }: { secret: Secret }) {
  const userAddress = useAppSelector(selectAccountUserAddress)
  const [
    pushSecret,
    {
      data: pushSecret_data,
      isSuccess: pushSecret_data_sucess,
      error: msg,
      status,
    },
  ] = usePushSecretMutation()

  const { config } = usePrepareContractWrite({
    address: contractAddress_SMS_Aggregator,
    abi: SMS_Aggregator.abi,
    functionName: 'addSecret',
    args: [secret.secretName, secret.currentDate, secret.secretDescription],
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
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
      console.log("Secret doesn't already exist")
      await pushSecret({
        secretName: secret.secretName,
        secretValue: secret.secretValue,
        address: userAddress,
      })
    } else {
      alert('All fields are required')
    }
  }

  return (
    <div>
      <Button onClick={pushSecretFunction}>
        {isLoading || status === QueryStatus.pending
          ? 'Minting...'
          : 'Push Secret'}
      </Button>
      {isSuccess && pushSecret_data_sucess && pushSecret_data?.isPushed && (
        <div>
          <p>Successfully minted</p>
          <div>
            <a
              href={`https://blockscout-bellecour.iex.ec/tx/${data?.hash}`}
              target="_blank"
              rel="noreferrer"
            >
              BlockScout
            </a>
          </div>
        </div>
      )}
      {(!pushSecret_data_sucess || !isSuccess) && <p>{msg as string}</p>}
    </div>
  )
}
