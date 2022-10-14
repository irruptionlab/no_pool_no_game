import ABI_ERC20 from "./ABI_ERC20.json"
import { useContractRead, useAccount } from 'wagmi'
import { ethers } from "ethers"
import { useState } from "react"
interface Network {
    name: string,
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
        address: network.npngContract,
        abi: ABI_ERC20,
        functionName: 'getUserBalance',
        args: [address],
        enabled: false,
        onSettled(data) {
            setDeposit(parseFloat(ethers.utils.formatUnits(data?._hex, 6)))
        },
    })

    return (
        <div className="text-block-31">$ {deposit}</div>
    )
}

export default ReadingDeposit;
