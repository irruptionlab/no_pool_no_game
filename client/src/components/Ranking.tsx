function Ranking({ setModalResult }: { setModalResult: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleResult = () => {
        setModalResult(true)
    }

    return (
        <div className="div-block-27" >
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Contest #</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <li className="list-item-1" onClick={handleResult}># 326</li>
                    <li className="list-item-1"># 325</li>
                    <li className="list-item-1"># 324</li>
                    <li className="list-item-1 win-typo"># 323</li>
                    <li className="list-item-1"># 322</li>
                    <li className="list-item-1 no-participation"># 321</li>
                </ul>
            </div>
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Ranking</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <li className="list-item-1">86</li>
                    <li className="list-item-1">430</li>
                    <li className="list-item-1">86</li>
                    <li className="list-item-1 win-typo">3</li>
                    <li className="list-item-1">430</li>
                    <li className="list-item-1 no-participation">n/a</li>
                </ul>
            </div>
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Participants</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <li className="list-item-1">1246</li>
                    <li className="list-item-1">1229</li>
                    <li className="list-item-1">1012</li>
                    <li className="list-item-1 win-typo">1151</li>
                    <li className="list-item-1">930</li>
                    <li className="list-item-1 no-participation">987</li>
                </ul>
            </div>
            <div className="div-block-28">
                <ul className="column-title">
                    <li className="list-item-8">
                        <div className="text-block-29">Results</div>
                    </li>
                </ul>
                <ul className="column-content">
                    <li className="list-item-1 top10-typo">Top 10%</li>
                    <li className="list-item-1">You can do better...</li>
                    <li className="list-item-1 top10-typo">Top 10%</li>
                    <li className="list-item-1 win-typo">$86.00</li>
                    <li className="list-item-1">You can do better...</li>
                    <li className="list-item-1 no-participation">No participation</li>
                </ul>
            </div>
        </div >

    )
}

export default Ranking;