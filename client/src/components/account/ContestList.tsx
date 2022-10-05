import { useAccount, useContractRead } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { useAddressNetwork } from '../utils/useAddressNetwork'

function ContestList({ setModalResult, setContest }:
    {
        setModalResult: React.Dispatch<React.SetStateAction<boolean>>,
        setContest: React.Dispatch<React.SetStateAction<number>>
    }) {

    const { address } = useAccount()
    const addressNetwork = useAddressNetwork()
    const npngContract = {
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
    }

    const { data } = useContractRead({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getListScores',
    })

    return (
        <div>
            {data && data.filter(element => element[1] === address).map(filteredElement =>
                <li key={filteredElement} id={filteredElement} className="list-item-1"
                    onClick={() => {
                        setContest(parseInt(ethers.utils.formatUnits(filteredElement[0]._hex, 0)))
                        setModalResult(true)
                    }}
                ># {ethers.utils.formatUnits(filteredElement[0]._hex, 0)}
                </li>
            )
            }
            {/* <li className="list-item-1 win-typo"># 3</li>
            <li className="list-item-1 no-participation"># 4</li> */}
        </div >
    )
}

export default ContestList;