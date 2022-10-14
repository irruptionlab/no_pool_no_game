import { useContractRead } from 'wagmi'
import ABI_NPNG from './utils/ABI_Npng.json'
import { ethers } from "ethers"
import { useState } from 'react'
import { useAddressNetwork } from "../components/utils/useAddressNetwork";

function Prize() {
    const [dailyPrize, setDailyPrize] = useState(0)
    const addressNetwork = useAddressNetwork()
    useContractRead({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_NPNG,
        functionName: 'getGlobalPrizePool',
        onSuccess(data) {
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