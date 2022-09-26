import { useAccount, useContractRead } from 'wagmi'
import { useAddressNetwork } from './utils/useAddressNetwork'
import ABI_Npng from './utils/ABI_Npng.json'
import { ethers } from "ethers"
import { useEffect, useState } from 'react'

function UserDeposit() {
    const { address, status } = useAccount();
    const [userDeposit, setUserDeposit] = useState(0)

    useEffect(() => {
        setUserDeposit(0)
    }, [status]
    );

    const addressNetwork = useAddressNetwork()

    useContractRead({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getMyBalance',
        chainId: 5,
        watch: true,
        args: [address],
        onSettled(data) {
            setUserDeposit(parseFloat(ethers.utils.formatUnits(data?._hex, 6)))
        }
    })

    return (
        <div className="text-block-33">
            $ {userDeposit.toFixed(2)} USDC
        </div>
    )
}

export default UserDeposit;