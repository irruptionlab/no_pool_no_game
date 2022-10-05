import ContestList from './ContestList'
import RankingList from './RankingList'
import ParticipantList from './ParticipantList'
import { useState } from 'react'

function RankingHistory({ setModalResult, setContest }:
    {
        setModalResult: React.Dispatch<React.SetStateAction<boolean>>,
        setContest: React.Dispatch<React.SetStateAction<number>>
    }) {
    const [rank, setRank] = useState(0)
    const [nbParticipants, setNbParticipants] = useState(0)

    return (
        <div className="div-block-27" >
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Contest #</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <ContestList setModalResult={setModalResult} setContest={setContest} />
                </ul>

            </div>
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Ranking</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <RankingList setRank={setRank} />
                </ul>
            </div>
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Participants</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <ParticipantList setNbParticipants={setNbParticipants} />
                </ul>
            </div>
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Results</div>
                    </li>
                </ul>
                <ul className="column-content">
                    {(rank < 11) && <li className="list-item-1 win-typo">You won</li>}
                    {(rank > 11) && (rank / nbParticipants * 100 < 10) && <li className="list-item-1 top10-typo">Top 10%</li>}
                    {(rank > 11) && (rank / nbParticipants * 100 > 10) && <li className="list-item-1 ">You can do better...</li>}
                    {(rank === 0) && <li className="list-item-1 no-participation">No participation</li>}
                </ul>
            </div>
        </div >

    )
}

export default RankingHistory;