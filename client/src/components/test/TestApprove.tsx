import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { ethereum } from '../utils/contractAddress'
import ABI_ERC20 from '../utils/ABI_ERC20.json'
import { ethers } from 'ethers'


function TestApprove({ amount }: { amount: number }) {

    const { config } = usePrepareContractWrite({
        addressOrName: ethereum.usdcContract,
        contractInterface: ABI_ERC20,
        functionName: 'approve',
        // enabled: false,
        args: [ethereum.npngContract, amount * 10 ** 6]
    })
    const { write } = useContractWrite(config)

    return (
        <div>
            <button disabled={!write} onClick={() => write?.()}>
                Approuver
            </button>
        </div >
    )
}

export default TestApprove;