import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import ABI_ERC20 from './ABI_ERC20.json'
import { ethereum } from './contractAddress'

const Faucet = () => {
    const { config } = usePrepareContractWrite({
        addressOrName: ethereum.usdcContract,
        contractInterface: ABI_ERC20,
        functionName: 'mint',
        args: [ethers.utils.parseUnits('1000', 6)]
    })
    const { write } = useContractWrite(config)

    return (
        <div>
            <button disabled={!write} onClick={() => write?.()}>
                FAUCET 1000 USDC
            </button>
        </div>
    )
}

export default Faucet;