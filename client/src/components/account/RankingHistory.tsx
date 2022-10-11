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
            return (<div className="grid-content-typo text-block-49" > No participation</div>)
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

    return (

        <div className="div-block-46">
            <div className="column-names">Contest #</div>
            <div className="column-names">Ranking</div>
            <div className="column-names">Participants</div>
            <div className="column-names">Results</div>
            {data && data.filter(element => parseInt(ethers.utils.formatUnits(element[0]._hex, 0)) > 0).map(filteredElement =>
                <Fragment key={filteredElement}>
                    <div className="grid-content-typo" onClick={() => {
                        setContest(parseInt(ethers.utils.formatUnits(filteredElement[0]._hex, 0)))
                        setModalResult(true)
                    }}
                    ># {ethers.utils.formatUnits(filteredElement[0]._hex, 0)}</div>
                    <div className="grid-content-typo">
                        {(ethers.utils.formatUnits(filteredElement[1]._hex, 0) === "0") ? "n/a" : ethers.utils.formatUnits(filteredElement[1]._hex, 0)}
                    </div>

                    <div className="grid-content-typo">{ethers.utils.formatUnits(filteredElement[2]._hex, 0)}</div>
                    {displayResult(parseInt(ethers.utils.formatUnits(filteredElement[1]._hex, 0)), parseInt(ethers.utils.formatUnits(filteredElement[2]._hex, 0)))}
                </Fragment>)}
        </div>
    )
}

export default RankingHistory;

/*
                <div className="grid-content-typo">#2</div>
                <div className="grid-content-typo">80</div>
                <div className="grid-content-typo">219</div>
                <div>You can do better...</div>
                <div className="grid-content-typo win-typo">#1</div>
                <div className="grid-content-typo win-typo">3</div>
                <div className="grid-content-typo win-typo">90</div>
                <div className="grid-content-typo win-typo">$86.00</div>
                <div className="grid-content-typo no-particpation-grey-color">#0</div>
                <div className="grid-content-typo no-particpation-grey-color">n/a</div>
                <div className="grid-content-typo no-particpation-grey-color">122</div>
                <div className="text-block-49">No participation</div>
            </Fragment >)
}
    </div > */

                // <div>
                //     <div className="div-block-27" >
                //         <ul className="column-title">
                //             <li className="list-item-8">
                //                 <div className="text-block-29">Contest #</div>
                //             </li>
                //         </ul>
                //         <ul className="column-title">
                //             <li key="0" className="list-item-8">
                //                 <div className="text-block-29">Ranking</div>
                //             </li>
                //         </ul>
                //         <ul className="column-title">
                //             <li className="list-item-8">
                //                 <div className="text-block-29">Participants</div>
                //             </li>
                //         </ul>
                //         <ul className="column-title">
                //             <li key="0" className="list-item-8">
                //                 <div className="text-block-29">Results</div>
                //             </li>
                //         </ul>

                //     </div>
                //     {data && data.filter(element => parseInt(ethers.utils.formatUnits(element[0]._hex, 0)) > 0).map(filteredElement =>
                //         <div key={filteredElement} className="div-block-27">
                //             <ul className="column-content">
                //                 <li className="list-item-1"
                //                     onClick={() => {
                //                         setContest(parseInt(ethers.utils.formatUnits(filteredElement[0]._hex, 0)))
                //                         setModalResult(true)
                //                     }}
                //                 ># {ethers.utils.formatUnits(filteredElement[0]._hex, 0)}
                //                 </li>
                //             </ul>
                //             <ul className="column-content">
                //                 <li className="list-item-1"> {ethers.utils.formatUnits(filteredElement[1]._hex, 0)}</li>
                //             </ul>
                //             <ul className="column-content">
                //                 <li className="list-item-1"> {ethers.utils.formatUnits(filteredElement[2]._hex, 0)}</li>
                //             </ul>
                //             <ul className="column-content">
                //                 {displayResult(parseInt(ethers.utils.formatUnits(filteredElement[1]._hex, 0)), parseInt(ethers.utils.formatUnits(filteredElement[2]._hex, 0)))}
                //             </ul>
                //         </div>)
                //     }
                // </div >


