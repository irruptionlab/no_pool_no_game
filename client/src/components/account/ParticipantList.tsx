import { useAccount, useContractRead } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { useAddressNetwork } from '../utils/useAddressNetwork'

function Participant({ setNbParticipants }: { setNbParticipants: React.Dispatch<React.SetStateAction<number>> }) {
    const { address } = useAccount()
    const addressNetwork = useAddressNetwork()

    const { data } = useContractRead({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'numberOfPlayersPerContest',
        args: [1],
        onSuccess(data) {
            setNbParticipants(parseInt(ethers.utils.formatUnits(data._hex, 0)))
        }
    })

    return (
        <div>
            {data && <li className="list-item-1"> {ethers.utils.formatUnits(data._hex, 0)}</li>}
        </div>
    )
}

export default Participant;