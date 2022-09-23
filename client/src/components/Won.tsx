import { useAccount } from "wagmi";
import { ethereum } from './utils/contractAddress'
import ABI_Npng from './utils/ABI_Npng.json'
import { ethers } from "ethers";


function Won({ timerRef, setModalPlay }: { timerRef: React.MutableRefObject<any>, setModalPlay: React.Dispatch<React.SetStateAction<boolean>> }) {
    timerRef.current.stop()
    const { address } = useAccount()

    const sendScore = async () => {
        const provider = ethers.getDefaultProvider('goerli', {
            alchemy: 'ALCHEMY_KEY'
        })
        const signer = new ethers.Wallet('PRIVATE_KEY', provider);
        const npng = new ethers.Contract(ethereum.npngContract, ABI_Npng, signer)
        const result = await npng.saveScore(address, timerRef.current.timer.time)
        console.log(result)
    }

    return (
        <div className="text-block-45">You finished the game<br />
            Click on this button to send your score<br />
            <a href="/" className="button-2 w-button" onClick={(e) => {
                e.preventDefault()
                sendScore()
                setModalPlay(false)
            }
            }>Send the score</a>
        </div>

    )
}

export default Won;