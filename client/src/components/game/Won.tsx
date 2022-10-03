import Siwe from '../utils/Siwe'

function Won({ score, realPlay, setModalPlay }: {
    score: number,
    realPlay: boolean,
    setModalPlay: React.Dispatch<React.SetStateAction<boolean>>
}) {

    return (
        <div className="text-block-45">You finished the game<br />
            {realPlay && <div>
                Click on this button to send your score<br />
                <Siwe score={score} setModalPlay={setModalPlay} />
            </div>}
            {!realPlay && <div><br />
                If you want to participate in the contest, please deposit some USDC and click on Play button<br /><br />
                <a href="/" className="button-2 w-button" onClick={(e) => {
                    e.preventDefault()
                    setModalPlay(false)
                }
                }>Close</a>
            </div>}
        </div >

    )
}

export default Won;