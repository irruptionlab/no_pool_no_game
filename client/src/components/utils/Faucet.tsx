import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import ABI_ERC20 from './ABI_ERC20.json'
import { ethereum } from './contractAddress'
import { useState } from 'react';

const Faucet = () => {

    const { config } = usePrepareContractWrite({
        addressOrName: ethereum.usdcContract,
        contractInterface: ABI_ERC20,
        functionName: 'mint',
        args: [ethers.utils.parseUnits('1000', 6)]
    })

    const { write, isLoading, isSuccess, isError } = useContractWrite(config)

    return (
        <div>
            <a className="button-2 w-button" href="/" onClick={(e) => {
                e.preventDefault()
                write?.()
            }
            }>
                FAUCET 1000 USDC
            </a>
        </div>
    )
}

export default Faucet;