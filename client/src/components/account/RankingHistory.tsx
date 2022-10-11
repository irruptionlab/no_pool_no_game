import { useAccount, useContractRead } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { Fragment } from 'react'

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
            return (<div className="grid-content-typo no-particpation-grey-color" > No participation</div>)

        }
        else {
            if (rank < 11) {
                return (<div className="grid-content-typo win-typo">You won</div>)
            }
            else {
                const result = parseInt(ethers.utils.formatUnits(rank, 0)) / parseInt(ethers.utils.formatUnits(nbParticpants, 0));
                if (result * 100 < 10) {
                    return (<div className="grid-content-typo top10-typo">Top 10%</div>)
                }
                else {
                    return (<div>You can do better...</div>)
                }
            }
        }
    }

    const colorText = (rank: number, nbParticpants: number) => {
        rank = parseInt(ethers.utils.formatUnits(rank, 0));
        nbParticpants = parseInt(ethers.utils.formatUnits(nbParticpants, 0));
        if (rank === 0) {
            return ("grid-content-typo no-particpation-grey-color")

        }
        else {
            if (rank < 11) {
                return ("grid-content-typo win-typo")
            }
            else {
                const result = parseInt(ethers.utils.formatUnits(rank, 0)) / parseInt(ethers.utils.formatUnits(nbParticpants, 0));
                if (result * 100 < 10) {
                    return ("grid-content-typo top10-typo")
                }
                else {
                    return ("")
                }
            }
        }
    }

    return (
        <div className="div-block-46">
            <div className="column-names">Contest #</div>
            <div className="column-names">Ranking</div>
            <div className="column-names">Participants</div>
            <div className="column-names">Results</div>
            {data && data.filter(element => parseInt(ethers.utils.formatUnits(element[0]._hex, 0)) > 0).map(filteredElement =>
                <Fragment key={filteredElement}>

                    <div className={colorText(filteredElement[1]._hex, filteredElement[2]._hex) + " pourquoi"}
                        onClick={() => {
                            setContest(parseInt(ethers.utils.formatUnits(filteredElement[0]._hex, 0)))
                            setModalResult(true)
                        }}
                    >#{ethers.utils.formatUnits(filteredElement[0]._hex, 0)}</div>
                    <div className={colorText(filteredElement[1]._hex, filteredElement[2]._hex)}>
                        {(ethers.utils.formatUnits(filteredElement[1]._hex, 0) === "0") ? "n/a" : ethers.utils.formatUnits(filteredElement[1]._hex, 0)}
                    </div>

                    <div className={colorText(filteredElement[1]._hex, filteredElement[2]._hex)}>{ethers.utils.formatUnits(filteredElement[2]._hex, 0)}</div>
                    {displayResult(parseInt(ethers.utils.formatUnits(filteredElement[1]._hex, 0)), parseInt(ethers.utils.formatUnits(filteredElement[2]._hex, 0)))}
                </Fragment>)}
        </div>
    )
}

export default RankingHistory;
