import { useRef, useState } from "react";
import Timer from "react-compound-timer"
import Memory from "./Memory"
import Won from "./Won";


function ModalPlay({ setModalPlay }: { setModalPlay: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [solved, setSolved] = useState(false)
    const timerRef = useRef<any>(null)

    return (
        <div className="modal-wrapper">
            <div className="modal-outside-trigger" onClick={(e) => { setModalPlay(false) }}></div>
            <Timer
                formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
                initialTime={0}
                timeToUpdate={10}
                startImmediately={false}
                ref={timerRef}
            >
                <div className="modal-inner-wrapper play-modal">
                    <div className="div-block-41" onClick={(e) => { setModalPlay(false) }}><img src="images/close.png" loading="lazy" width="20" height="20" alt="" className="image-18" /></div>
                    <div className="div-block-40">
                        <div className="text-block-45">
                            <Timer.Minutes /> : <Timer.Seconds /> : <Timer.Milliseconds />
                        </div>
                    </div>
                    {!solved && <Memory timerRef={timerRef} setSolved={setSolved} />}
                    {solved && <Won timerRef={timerRef} setModalPlay={setModalPlay} />}
                </div>
            </Timer >
        </div >
    )
}

export default ModalPlay;