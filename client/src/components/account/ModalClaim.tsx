import { usePrepareContractWrite, useContractWrite, useNetwork } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { useState } from 'react'
import { useAddressNetwork } from "../utils/useAddressNetwork";

function ModalClaim({ setModalClaim }: { setModalClaim: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [amount, setAmount] = useState(0.00)
    const addressNetwork = useAddressNetwork()
    const { chain } = useNetwork();

    const { config } = usePrepareContractWrite({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'withdraw',
        args: [amount * 10 ** 6]
    })
    const { write } = useContractWrite(config)

    return (
        <div className="modal-wrapper modal-wrapper-claim-winnings" onClick={(e) => { setModalClaim(false) }}>
            <div data-w-id="f44f9440-e55b-49f6-ba7d-b57691902e6b" className="modal-outside-trigger"></div>
            <div className="modal-inner-wrapper ethereum-details-modal">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20"
                    alt="" className="image-18" onClick={(e) => { setModalClaim(false) }} /></div>
                <div className="div-block-40"><img src="images/trophy.png" loading="lazy" width="135" srcSet="images/trophy-p-500.png 500w, images/trophy.png 512w" sizes="(max-width: 479px) 0px, 100vw" alt="" className="image-15" /></div>
                <h2>Total claimable reward</h2>
                <div className="div-block-44">
                    <div className="div-block-43"><img src="images/NPaUSDC.png" loading="lazy" width="40" height="40" alt="" />
                        <div className="text-block-46">NPaUSDC</div>
                    </div>
                    <div>
                        <div className="text-block-47">0.00</div>
                    </div>
                </div>
                <p className="paragraph">This amount represents the overall amount claimable on {chain?.name} you have deposited on.<span className="text-span-4"></span></p>
                <div className="div-block-45">
                    <a href="/" className="button-4 button-4-claim w-button">Claim</a>
                </div>
            </div>
        </div>
    )
}

export default ModalClaim;