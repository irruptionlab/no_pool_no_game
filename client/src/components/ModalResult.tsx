import { Link } from "react-router-dom";

function ModalResult({ setModalResult }: { setModalResult: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="modal-wrapper modal-wrapper-results">
            <div className="modal-outside-trigger" onClick={(e) => { setModalResult(false) }}></div>
            <div className="modal-inner-wrapper contest-results-modal">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" alt="" className="image-18" onClick={(e) => { setModalResult(false) }} /></div>
                <h2>Contest #326 results</h2>
                <p>Prizes are awarded daily! Don&#x27;t forget to come back to claim any prizes. Unclaimed prizes expire after 60 days, for more info see <Link to="/userguide/faq" target="_blank" className="link-58">here</Link>.</p>
                <div className="div-block-46">
                    <div>Ranking</div>
                    <div>Adress</div>
                    <div>Prizes *</div>
                    <div>1</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                    <div>2</div>
                    <div>0xU78906Ff56879</div>
                    <div>12.57 NPaUSDC</div>
                    <div>3</div>
                    <div>0xU78756Ff56678</div>
                    <div>11.36 NPaUSDC</div>
                    <div>4</div>
                    <div>0xGH8756Ff56879</div>
                    <div>10.25 NPaUSDC</div>
                    <div>5</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                    <div>6</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                    <div>7</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                    <div>8</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                    <div>9</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                    <div>10</div>
                    <div>0xU78756Ff56879</div>
                    <div>13.90 NPaUSDC</div>
                </div>
                <p className="paragraph-2">* Everyone has the same chance to win the contest, but the reward you will get is also correlated to the amount you have deposited into the pool. That&#x27;s why the first one doesn&#x27;t necessarily win the highest reward <Link to="/userguide/faq" className="link-59">Read more</Link>
                </p>
            </div>
        </div >
    )
}

export default ModalResult