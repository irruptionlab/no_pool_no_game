import { Link } from "react-router-dom";
import { useContractRead } from 'wagmi'
import { goerli } from '../utils/contractAddress'
import ABI_Npng from '../utils/ABI_Npng.json'
import { ethers } from 'ethers'
import { Fragment } from 'react'
function ModalResult({ contest, setModalResult }:
    {
        contest: number,
        setModalResult: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const { data } = useContractRead({
        addressOrName: goerli.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getContestTable',
        args: [contest],
        onSuccess(data) {
            console.log(data)
        }
    })

    return (
        <div className="modal-wrapper modal-wrapper-results">
            <div className="modal-outside-trigger" onClick={(e) => { setModalResult(false) }}></div>
            <div className="modal-inner-wrapper contest-results-modal">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" alt="" className="image-18" onClick={(e) => { setModalResult(false) }} /></div>
                <h2>Contest #{contest} results</h2>
                <p>Prizes are awarded daily! Don't forget to come back to claim any prizes. Unclaimed prizes expire after 60 days, for more info see <Link to="/userguide/faq" target="_blank" className="link-58">here</Link>.</p>
                <div className="div-block-47">
                    <div>Ranking</div>
                    <div>Score</div>
                    <div>Adress</div>
                    <div>Prizes *</div>
                    {data && data.map(filteredElement =>
                        <Fragment key={filteredElement}>
                            <div>{ethers.utils.formatUnits(filteredElement[0]._hex, 0)}</div>
                            <div>{ethers.utils.formatUnits(filteredElement[1]._hex, 0).substring(0, ethers.utils.formatUnits(filteredElement[1]._hex, 0).length - 3)}.{ethers.utils.formatUnits(filteredElement[1]._hex, 0).substring(ethers.utils.formatUnits(filteredElement[1]._hex, 0).length - 3, ethers.utils.formatUnits(filteredElement[1]._hex, 0).length - 1)}s</div>
                            <div> {filteredElement[2].substring(0, 15)}</div>
                            <div>$ {ethers.utils.formatUnits(filteredElement[3]._hex, 6)}</div>
                        </Fragment>
                    )}
                </div>
                <p className="paragraph-2">* Everyone has the same chance to win the contest, but the reward you will get is also correlated to the amount you have deposited into the pool. That&#x27;s why the first one doesn&#x27;t necessarily win the highest reward <Link to="/userguide/faq" className="link-59">Read more</Link>
                </p>
            </div>
        </div >
    )
}

export default ModalResult