import Timer from "react-compound-timer"
import Memory from "./Memory"

function ModalPlay({ isStarted, setModalPlay }: { isStarted: boolean, setModalPlay: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <div className="modal-wrapper">
            <div className="modal-outside-trigger" onClick={(e) => { setModalPlay(false) }}></div>
            <div className="modal-inner-wrapper play-modal">
                <div className="div-block-41" onClick={(e) => { setModalPlay(false) }}><img src="images/close.png" loading="lazy" width="20" height="20" alt="" className="image-18" /></div>
                <div className="div-block-40">
                    <div className="text-block-45">
                        <Timer
                            formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
                            timeToUpdate={10}
                        >
                            <Timer.Minutes /> : <Timer.Seconds /> : <Timer.Milliseconds />
                        </Timer>

                    </div>
                </div>
                <Memory />
            </div>
        </div>
    )
}

export default ModalPlay;