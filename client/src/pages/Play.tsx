import { useEffect, useState } from "react";
import Countdown from "../components/Countdown";
import ModalPlay from "../components/ModalPlay"
import Prize from "../components/Prize";
import { useAccount, useContractRead } from 'wagmi'
import { ethereum } from '../components/utils/contractAddress'
import ABI_Npng from '../components/utils/ABI_Npng.json'
import { ethers } from "ethers"

function Play() {
    const [isStarted, setIsStarted] = useState(false)
    const [modalPlay, setModalPlay] = useState(false)
    const { address } = useAccount();
    const [userDeposit, setUserDeposit] = useState(0)

    const { status } = useContractRead({
        addressOrName: ethereum.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getMyBalance',
        chainId: 5,
        watch: true,
        args: [address],
        onSettled(data) {
            setUserDeposit(parseFloat(ethers.utils.formatUnits(data?._hex, 6)))

        }
    })

    useEffect(() => {
        setUserDeposit(0)
    }, [status]
    );

    return (
        <div>
            <div className="section cc-store-home-wrap">
                <div className="container-1 cont1pageplay w-container">
                    <div className="div-block-9">
                        <div className="div-block-15">
                            <div className="div-block-18">
                                <div className="text-block-17 pos2">Today's <span className="highlight-text">10</span> best scores will split the pot !</div><img src="images/traits.png" loading="lazy" width="79" alt="" className="image-6 position-2" />
                            </div>
                        </div>
                        <Prize />
                        <div className="div-block-21">
                            <div className="div-block-19"><img src="images/next.png" loading="lazy" width="29" alt="" className="image-9" />
                                <div className="text-block-20">Every day each depositor has one single chance to do its best possible score</div>
                            </div>
                            <div className="div-block-20"><img src="images/next.png" loading="lazy" width="29" alt="" className="image-9" />
                                <div className="text-block-20">You can train as much as you want on the demo mode</div>
                            </div>
                        </div>
                        <div className="text-block-14">Contest #327 ends in</div>
                        <Countdown />
                        <div className="div-block-11">
                            <div className="hr-min-sec">HR</div>
                            <div className="hr-min-sec">MIN</div>
                            <div className="hr-min-sec">SEC</div>
                        </div>
                    </div>
                </div>
                <div className="container-2 cont2pageplay w-container">
                    <div className="div-block-13">
                        <div className="card cardpageplay"><img src="images/coin.png" loading="lazy" width="74" height="70" alt="" className="image-3" />
                            <img src="images/Arrow.png" loading="lazy" alt="" className="image position-arrow-2" />
                            <div className="text-block-36">00 : 00 : 000</div>
                            <div className="text-block-22">
                            </div>
                            <div className="div-block-3"></div>
                            <a href="/" className={(address && userDeposit > 0) ? "button-2 w-button" : "button-2 inactivLink"} onClick={(e) => {
                                e.preventDefault()
                                setModalPlay(true)
                                setIsStarted(true)
                            }
                            }>Play</a>
                            <img src="images/pointillés.png" loading="lazy" height="200" alt="" className="image-5 image5pageplay" />
                            <img src="images/coin-2.png" loading="lazy" width="60" alt="" className="image-4" />
                            <a href="/" className="button-2 buton-demo w-button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setModalPlay(true)
                                    setIsStarted(true)
                                }}
                            >Demo</a>
                        </div>
                    </div>
                </div>
            </div>
            {modalPlay && <ModalPlay isStarted={isStarted} setModalPlay={setModalPlay} />}
        </div>
    )
}

export default Play;