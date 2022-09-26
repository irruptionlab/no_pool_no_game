import { useAccount, useContractRead } from 'wagmi'
import ABI_ERC20 from './utils/ABI_ERC20.json'
import { ethers } from "ethers"
import { useEffect, useState } from 'react'
import { useAddressNetwork } from './utils/useAddressNetwork'

function UserBalance({ setAmount }: { setAmount: React.Dispatch<React.SetStateAction<number>> }) {
    const addressNetwork = useAddressNetwork()
    const { address, status } = useAccount();
    const [userBalance, setUserBalance] = useState(0)

    useEffect(() => {
        setUserBalance(0)
    }, [status]
    );

    const handleMax = () => {
        setAmount(userBalance);

    }

    useContractRead({
        addressOrName: addressNetwork.usdcContract,
        contractInterface: ABI_ERC20,
        functionName: 'balanceOf',
        watch: true,
        chainId: 5,
        args: [address],
        onSettled(data) {
            setUserBalance(parseFloat(ethers.utils.formatUnits(data?._hex, 6)))
        }
    })

    return (
        <div className="text-block-5" onClick={handleMax}>
            {userBalance.toFixed(2)} USDC
        </div>
    )
}



export default UserBalance