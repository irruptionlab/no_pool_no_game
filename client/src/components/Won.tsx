import { useAccount } from "wagmi";
import { useAddressNetwork } from './utils/useAddressNetwork'
import ABI_Npng from './utils/ABI_Npng.json'
import { ethers } from "ethers";
import { useState } from "react";


function Won({ timerRef, realPlay, setModalPlay }: {
    timerRef: React.MutableRefObject<any>,
    realPlay: boolean,
    setModalPlay: React.Dispatch<React.SetStateAction<boolean>>
}) {
    timerRef.current.stop()
    const { address } = useAccount()

    const addressNetwork = useAddressNetwork()
    const [pk, setPk] = useState('0x000000000000000000000000000000000000dEaD')
    if (process.env.REACT_APP_PG) {
        setPk(process.env.REACT_APP_PG)
    }

    const sendScore = async () => {
        const provider = ethers.getDefaultProvider('goerli', {
            alchemy: process.env.REACT_APP_ALCHEMY
        })
        const signer = new ethers.Wallet(pk, provider);
        const npng = new ethers.Contract(addressNetwork.npngContract, ABI_Npng, signer)
        const result = await npng.saveScore(address, timerRef.current.timer.time)


        return (
            <div className="text-block-45">You finished the game<br />
                {/* {realPlay && <div>
                Click on this button to send your score<br />
                <a href="/" className="button-2 w-button" onClick={(e) => {
                    e.preventDefault()
                    sendScore()
                    setModalPlay(false)
                }
                }>Send the score</a>
            </div>} */}
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