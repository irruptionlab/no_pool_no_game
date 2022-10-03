import { useContractRead } from 'wagmi'
import { goerli } from '../utils/contractAddress'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

///TO COMPLETE
function Participant() {
    const [number, setNumber] = useState([{ contest: 0, number: 0 }])
    const { data } = useContractRead({
        addressOrName: goerli.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'numberOfPlayersPerContest',
        onSuccess(data) {
            console.log(data)

        },
    })

    // useEffect(() => {
    //     setNumber()




    // })
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

export default Participant;