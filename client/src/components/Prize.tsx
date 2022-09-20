import { useContractRead } from 'wagmi'
import { ethereum } from './utils/contractAddress'
import ABI_ERC20 from './utils/ABI_ERC20.json'
import { ethers } from "ethers"
import { useState } from 'react'

function Prize() {
    const [dailyPrize, setDailyPrize] = useState(0)
    useContractRead({
        addressOrName: ethereum.aUsdcContract,
        contractInterface: ABI_ERC20,
        functionName: 'balanceOf',
        chainId: 5,
        args: ['0xcf79815039917A4DD65d39b42331319AB4FF61c0'],
        overrides: { from: ethereum.npngContract },
        onSettled(data) {
            setDailyPrize(parseFloat(ethers.utils.formatUnits(data?._hex, 6)) * 100 * 0.05 / 365)
        }
    })




    return (
        <div className="text-block-16">
            $ {dailyPrize.toFixed(2)}
        </div>
    )
}

export default Prize;