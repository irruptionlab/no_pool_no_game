import { useAccount } from "wagmi";
import { useAddressNetwork } from './utils/useAddressNetwork'
import ABI_Npng from './utils/ABI_Npng.json'
import { ethers } from "ethers";
import { useState } from "react";


function Won({ timerRef, setModalPlay }: { timerRef: React.MutableRefObject<any>, setModalPlay: React.Dispatch<React.SetStateAction<boolean>> }) {
    timerRef.current.stop()
    const { address } = useAccount()

    const addressNetwork = useAddressNetwork()
    const [pk, setPk] = useState('0x000000000000000000000000000000000000dEaD')
    if (process.env.REACT_APP_PK) {
        setPk(process.env.REACT_APP_PK)
        console.log(process.env.REACT_APP_PK)
    }

    const sendScore = async () => {
        const provider = ethers.getDefaultProvider('goerli', {
            alchemy: process.env.REACT_APP_AK
        })
        const signer = new ethers.Wallet(pk, provider);
        const npng = new ethers.Contract(addressNetwork.npngContract, ABI_Npng, signer)
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