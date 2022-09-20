import { useAccount, useContractRead } from 'wagmi'
import { ethereum } from '../utils/contractAddress'
import ABI_ERC20 from '../utils/ABI_ERC20.json'
import { ethers } from 'ethers'

function Test() {
    const { address } = useAccount();
    const { data, isError, isLoading } = useContractRead({
        addressOrName: ethereum.usdcContract,
        contractInterface: ABI_ERC20,
        functionName: 'allowance',
        args: [address, ethereum.npngContract],
        onSettled(data, error) {
            console.log('Settled', { data, error })
        },
    })

    return (
        <div>
            Rien
        </div>
    )
}
export default Test