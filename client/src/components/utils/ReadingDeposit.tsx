import ABI_ERC20 from "./ABI_ERC20.json"
import { useContractRead, useAccount } from 'wagmi'
import { ethers } from "ethers"
import { useState } from "react"

interface Network {
    usdcContract: string,
    aavePoolContract: string,
    npngContract: string,
    aUsdcContract: string,
    npngToken: string
}

const ReadingDeposit = ({ network, setModalWithdraw }: { network: Network, setModalWithdraw: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [deposit, setDeposit] = useState(0)
    const { address } = useAccount()

    useContractRead({
        addressOrName: network.npngContract,
        contractInterface: ABI_ERC20,
        functionName: 'getMyBalance',
        args: [address],
        enabled: false,
        onSettled(data) {
            setDeposit(parseFloat(ethers.utils.formatUnits(data?._hex, 6)))
        },
    })


    return (
        <div className="div-block-32">
            <div className="text-block-31">$ {deposit}</div>
            <img src="images/next.png" className="pourquoi" loading="lazy" width="25" height="25" alt=""
                onClick={(e) => { setModalWithdraw(true) }}
            />
        </div>
    )
}

export default ReadingDeposit;
