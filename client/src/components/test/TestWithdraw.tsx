import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethereum } from '../utils/contractAddress'
import ABI_Npng from '../utils/ABI_Npng.json'

function TestWithdraw({ amount }: { amount: number }) {
  const { config } = usePrepareContractWrite({
    addressOrName: ethereum.npngContract,
    contractInterface: ABI_Npng,
    functionName: 'withdraw',
    args: [amount * 10 ** 6],
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Withdraw
      </button>
    </div>
  )
}

export default TestWithdraw;