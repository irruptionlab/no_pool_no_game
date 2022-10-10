import { useAccount, useContractRead } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { useAddressNetwork } from '../utils/useAddressNetwork'

function RankingHistory({ setModalResult, setContest }:
    {
        setModalResult: React.Dispatch<React.SetStateAction<boolean>>,
        setContest: React.Dispatch<React.SetStateAction<number>>
    }) {

    const { address } = useAccount()
    const addressNetwork = useAddressNetwork()

    const { data } = useContractRead({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getAccountTable',
        args: [address]
    })

    const displayResult = (rank: number, nbParticpants: number) => {
        if (rank === 0) {
            return (<li className="list-item-1 no-participation" > No participation</li>)
        }
        else {
            if (rank < 11) {
                return (<li className="list-item-1 win-typo">You won</li>)
            }
            else {
                const result = parseInt(ethers.utils.formatUnits(rank, 0)) / parseInt(ethers.utils.formatUnits(nbParticpants, 0));
                if (result * 100 < 10) {
                    return (<li className="list-item-1 top10-typo">Top 10%</li>)
                }
                else {
                    return (<li className="list-item-1 ">You can do better...</li>)
                }
            }
        }
    }

    return (
        <div>
            <div className="div-block-27" >
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Contest #</div>
                    </li>
                </ul>
                <ul className="column-title">
                    <li key="0" className="list-item-8">
                        <div className="text-block-29">Ranking</div>
                    </li>
                </ul>
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Participants</div>
                    </li>
                </ul>
                <ul className="column-title">
                    <li key="0" className="list-item-8">
                        <div className="text-block-29">Results</div>
                    </li>
                </ul>

            </div>
            {data && data.filter(element => parseInt(ethers.utils.formatUnits(element[0]._hex, 0)) > 0).map(filteredElement =>
                <div key={filteredElement} className="div-block-27">
                    <ul className="column-content">
                        <li className="list-item-1"
                            onClick={() => {
                                setContest(parseInt(ethers.utils.formatUnits(filteredElement[0]._hex, 0)))
                                setModalResult(true)
                            }}
                        ># {ethers.utils.formatUnits(filteredElement[0]._hex, 0)}
                        </li>
                    </ul>
                    <ul className="column-content">
                        <li className="list-item-1"> {ethers.utils.formatUnits(filteredElement[1]._hex, 0)}</li>
                    </ul>
                    <ul className="column-content">
                        <li className="list-item-1"> {ethers.utils.formatUnits(filteredElement[2]._hex, 0)}</li>
                    </ul>
                    <ul className="column-content">
                        {displayResult(parseInt(ethers.utils.formatUnits(filteredElement[1]._hex, 0)), parseInt(ethers.utils.formatUnits(filteredElement[2]._hex, 0)))}
                    </ul>
                </div>)
            }
        </div >

    )
}

export default RankingHistory;