import { useContractRead } from 'wagmi'
import { goerli } from './utils/contractAddress'
import ABI_NPNG from './utils/ABI_Npng.json'
import { ethers } from "ethers"
import { useState } from 'react'

function Prize() {
    const [dailyPrize, setDailyPrize] = useState(0)
    useContractRead({
        addressOrName: goerli.npngContract,
        contractInterface: ABI_NPNG,
        functionName: 'interestEarned',
        chainId: 5,
        onSettled(data) {
            setDailyPrize(parseFloat(ethers.utils.formatUnits(data?._hex, 6)))
        }
    })




    return (
        <div className="text-block-16">
            $ {dailyPrize.toFixed(2)}
        </div>
    )
}

export default Prize;