import { Link } from "react-router-dom";
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { useState } from 'react'

interface Network {
    name: string,
    usdcContract: string,
    aavePoolContract: string,
    npngContract: string,
    aUsdcContract: string,
    npngToken: string
}


function ModalWithdraw({ network, setModalWithdraw }: { network: Network, setModalWithdraw: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [amount, setAmount] = useState(0.00)

    const { config } = usePrepareContractWrite({
        addressOrName: network.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'withdraw',
        args: [amount * 10 ** 6]
    })
    const { write } = useContractWrite(config)

    return (
        <div className="modal-wrapper modal-wrapper-ethereum">
            <div className="modal-outside-trigger" onClick={(e) => { setModalWithdraw(false) }}></div>
            <div className="modal-inner-wrapper ethereum-details-modal">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20"
                    alt="" className="image-18" onClick={(e) => { setModalWithdraw(false) }} /></div>
                <div className="div-block-40">
                    {network.name === "Goerli" && <img src="images/ethereum-eth-logo.png" loading="lazy" width="135" alt="" className="image-15" />}
                    {network.name === "Mumbai" && <img src="images/polygon-matic-logo.png" loading="lazy" width="135" alt="" className="image-15" />}
                    {network.name === "Optimism" && <img src="images/optimism.png" loading="lazy" width="135" alt="" className="image-15" />}
                </div>

                <h2>Withdraw from {network.name}</h2>
                <div className="div-block-44">
                    <div className="div-block-43"><img src="images/NPaUSDC.png" loading="lazy" width="40" height="40" alt="" />
                        <div className="text-block-46">NPaUSDC</div>
                    </div>
                    <div>
                        {/* <div className="text-block-47">0.00</div> */}
                        <input id="field_amount" type="text" placeholder="0.00" className="text-block-9"
                            onChange={(e) => { e.target.value !== '' ? setAmount(parseFloat(e.target.value)) : setAmount(0.00) }}></input>
                    </div>
                </div>
                <p className="paragraph">Everyone has the same chance to win the contest, but the reward you will get is also
                    correlated to the amount you have deposited into the pool. <span className="text-span-4">Higher your deposit,
                        higher your reward.</span></p>
                <div className="div-block-45">
                    <Link to="/" className="button-4 w-button">Deposit more</Link>
                    <a href="/" className="button-4 button-4-withdraw w-button" onClick={(e) => {
                        e.preventDefault()
                        write?.()
                        setModalWithdraw(false)
                    }}
                    >Withdraw</a>
                </div>
            </div>
        </div>
    )
}

export default ModalWithdraw;