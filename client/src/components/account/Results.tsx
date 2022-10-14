import { useContractRead } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { useAddressNetwork } from '../utils/useAddressNetwork'

/// TO COMPLETE
function Results() {
    const addressNetwork = useAddressNetwork()
    const { data } = useContractRead({
        address: addressNetwork.npngContract,
        abi: ABI_Npng,
        functionName: 'getListScores',
        onSuccess(data) {
            console.log(ethers.utils.formatUnits(data[0][0]._hex, 0))
            console.log(data[0][1])
            console.log(ethers.utils.formatUnits(data[0][2]._hex, 0))
            console.log(data.length)
            console.log(data.map(element => ethers.utils.formatUnits(element[0]._hex, 0)))

        },
    })
    return (
        <div>
            {data && data.map(element =>
                <li className="list-item-1"> {ethers.utils.formatUnits(element[0]._hex, 0)}</li>
                // <li className="list-item-1 win-typo"># 323</li>
                // <li className="list-item-1 no-participation"># 321</li>
            )}
        </div>
    )
}

export default Results;